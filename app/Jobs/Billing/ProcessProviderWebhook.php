<?php

namespace App\Jobs\Billing;

use App\Actions\Billing\RecordSuccessfulPayment;
use App\Actions\Memberships\GrantPaidPeriod;
use App\Enums\Gateway;
use App\Enums\WebhookProcessingStatus;
use App\Models\BillingOrder;
use App\Models\ProviderWebhookEvent;
use Carbon\CarbonImmutable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Queue\Middleware\WithoutOverlapping;
use Illuminate\Support\Facades\DB;
use Throwable;

class ProcessProviderWebhook implements ShouldQueue
{
    use Queueable;

    public int $tries = 6;

    /** @var list<int> */
    public array $backoff = [10, 30, 120, 300, 900];

    public function __construct(public readonly string $webhookEventId) {}

    public function handle(RecordSuccessfulPayment $recordPayment, GrantPaidPeriod $grantPeriod): void
    {
        $event = DB::transaction(function (): ?ProviderWebhookEvent {
            $event = ProviderWebhookEvent::query()->whereKey($this->webhookEventId)->lockForUpdate()->firstOrFail();

            if ($event->getRawOriginal('status') === WebhookProcessingStatus::Processed->value) {
                return null;
            }

            $event->update(['status' => WebhookProcessingStatus::Processing, 'attempt_count' => $event->attempt_count + 1, 'last_error' => null]);

            return $event;
        });

        if (! $event) {
            return;
        }

        if (in_array($event->event_type, ['invoice.payment_succeeded', 'invoice.paid'], true)) {
            /** @var array{data: array{object: array<string, mixed>}} $payload */
            $payload = json_decode((string) $event->getRawOriginal('payload'), true, flags: JSON_THROW_ON_ERROR);
            $invoice = $payload['data']['object'];
            $metadata = $invoice['parent']['subscription_details']['metadata']
                ?? $invoice['subscription_details']['metadata']
                ?? [];
            $order = BillingOrder::query()->where('id', $metadata['billing_order_id'] ?? null)->firstOrFail();
            $period = $invoice['lines']['data'][0]['period'];
            $payment = $recordPayment->handle(
                $order,
                Gateway::Stripe,
                $invoice['id'],
                (int) $invoice['amount_paid'],
                mb_strtoupper($invoice['currency']),
                CarbonImmutable::createFromTimestamp((int) ($invoice['status_transitions']['paid_at'] ?? now()->timestamp)),
            );
            $grantPeriod->handle(
                $payment,
                CarbonImmutable::createFromTimestamp((int) $period['start']),
                CarbonImmutable::createFromTimestamp((int) $period['end']),
            );
        }

        $event->update(['status' => WebhookProcessingStatus::Processed, 'processed_at' => now()]);
    }

    /** @return list<object> */
    public function middleware(): array
    {
        return [(new WithoutOverlapping("provider-webhook:{$this->webhookEventId}"))->expireAfter(300)];
    }

    public function failed(?Throwable $exception): void
    {
        ProviderWebhookEvent::query()->whereKey($this->webhookEventId)->update([
            'status' => WebhookProcessingStatus::Failed,
            'last_error' => $exception?->getMessage(),
        ]);
    }
}
