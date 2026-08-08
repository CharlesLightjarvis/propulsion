<?php

namespace App\Actions\Billing;

use App\Enums\BillingRegion;
use App\Enums\Gateway;
use App\Enums\PriceStatus;
use App\Jobs\Billing\SyncPlanToGateway;
use App\Models\MembershipPlan;
use App\Models\MembershipPlanPrice;
use Illuminate\Support\Facades\DB;

class PublishPlanPrice
{
    public function handle(
        MembershipPlan $plan,
        int $amountMinor,
        BillingRegion $region,
        string $interval,
        Gateway $gateway,
    ): MembershipPlanPrice {
        $price = DB::transaction(function () use ($plan, $amountMinor, $region, $interval): MembershipPlanPrice {
            // Lock (without using the result) to serialize concurrent publishes for this plan.
            MembershipPlan::query()->whereKey($plan)->lockForUpdate()->firstOrFail();

            $currency = $region->currency();

            $previous = $plan->prices()
                ->where('region', $region)
                ->where('interval', $interval)
                ->where('status', PriceStatus::Active)
                ->first();

            if ($previous?->amount_minor === $amountMinor) {
                return $previous;
            }

            $previous?->archive();

            return $plan->prices()->create([
                'amount_minor' => $amountMinor,
                'currency' => $currency,
                'region' => $region,
                'interval' => $interval,
                'status' => PriceStatus::Active,
                'published_at' => now(),
                'replaces_price_id' => $previous?->id,
            ]);
        });

        SyncPlanToGateway::dispatch($plan->id, $gateway);

        return $price;
    }
}
