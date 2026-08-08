<?php

namespace App\Listeners;

use App\Enums\Gateway;
use App\Jobs\Billing\ProcessProviderWebhook;
use App\Models\ProviderWebhookEvent;
use Laravel\Cashier\Events\WebhookHandled;

class QueueStripeWebhookHandled
{
    public function handle(WebhookHandled $event): void
    {
        $webhook = ProviderWebhookEvent::query()
            ->where('gateway', Gateway::Stripe)
            ->where('external_event_id', $event->payload['id'])
            ->firstOrFail();

        $claimed = ProviderWebhookEvent::query()
            ->whereKey($webhook)
            ->whereNull('dispatched_at')
            ->update(['dispatched_at' => now()]);

        if ($claimed === 1) {
            ProcessProviderWebhook::dispatch($webhook->id);
        }
    }
}
