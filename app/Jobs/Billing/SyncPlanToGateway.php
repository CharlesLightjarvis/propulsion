<?php

namespace App\Jobs\Billing;

use App\Billing\PaymentGatewayManager;
use App\Enums\Gateway;
use App\Enums\GatewaySyncStatus;
use App\Models\GatewayResource;
use App\Models\MembershipPlan;
use App\Models\MembershipPlanPrice;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueueAfterCommit;
use Illuminate\Foundation\Queue\Queueable;
use Throwable;

class SyncPlanToGateway implements ShouldBeUnique, ShouldQueueAfterCommit
{
    use Queueable;

    public int $tries = 4;

    /** @var list<int> */
    public array $backoff = [10, 60, 300];

    public function __construct(public readonly string $planId, public readonly Gateway $gateway, public readonly bool $force = false) {}

    public function uniqueId(): string
    {
        return "{$this->gateway->value}:plan:{$this->planId}";
    }

    public function handle(PaymentGatewayManager $gateways): void
    {
        $plan = MembershipPlan::query()->with('activePrices')->findOrFail($this->planId);
        $gateway = $gateways->driver($this->gateway);

        $this->syncResource($plan, fn (): string => $gateway->syncPlan($plan));

        $supportedRegions = $this->gateway->supportedRegions();

        foreach ($plan->activePrices as $price) {
            if (! \in_array($price->region, $supportedRegions, true)) {
                continue;
            }

            $this->syncResource($price, fn (): string => $gateway->syncPrice($price));
        }
    }

    public function failed(?Throwable $exception): void
    {
        GatewayResource::query()
            ->where('gateway', $this->gateway)
            ->where('resourceable_type', MembershipPlan::class)
            ->where('resourceable_id', $this->planId)
            ->update(['sync_status' => GatewaySyncStatus::Failed, 'last_error' => $exception?->getMessage()]);
    }

    private function syncResource(MembershipPlan|MembershipPlanPrice $resource, callable $sync): void
    {
        $mapping = $resource->gatewayResources()->where('gateway', $this->gateway)->first();

        if ($mapping && ($resource instanceof MembershipPlanPrice || ! $this->force)) {
            return;
        }

        $externalId = $sync();

        $resource->gatewayResources()->updateOrCreate(
            ['gateway' => $this->gateway],
            ['external_id' => $externalId, 'sync_status' => GatewaySyncStatus::Synced, 'synced_at' => now(), 'last_error' => null],
        );
    }
}
