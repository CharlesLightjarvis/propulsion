<?php

namespace App\Listeners;

use App\Enums\Gateway;
use App\Enums\WebhookProcessingStatus;
use App\Models\ProviderWebhookEvent;
use Laravel\Cashier\Events\WebhookReceived;

class StoreStripeWebhookReceived
{
    public function handle(WebhookReceived $event): void
    {
        ProviderWebhookEvent::query()->firstOrCreate(
            ['gateway' => Gateway::Stripe, 'external_event_id' => $event->payload['id']],
            ['event_type' => $event->payload['type'], 'payload' => $event->payload, 'status' => WebhookProcessingStatus::Pending, 'received_at' => now()],
        );
    }
}
