<?php

namespace App\Models;

use App\Enums\Gateway;
use App\Enums\WebhookProcessingStatus;
use Database\Factories\ProviderWebhookEventFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

#[Fillable(['gateway', 'external_event_id', 'event_type', 'payload', 'status', 'attempt_count', 'received_at', 'dispatched_at', 'processed_at', 'last_error'])]
class ProviderWebhookEvent extends Model
{
    /** @use HasFactory<ProviderWebhookEventFactory> */
    use HasFactory, HasUuids;

    protected function casts(): array
    {
        return [
            'gateway' => Gateway::class,
            'status' => WebhookProcessingStatus::class,
            'payload' => 'array',
            'received_at' => 'datetime',
            'dispatched_at' => 'datetime',
            'processed_at' => 'datetime',
        ];
    }
}
