<?php

namespace App\Models;

use App\Enums\Gateway;
use App\Enums\PaymentAttemptStatus;
use Database\Factories\PaymentAttemptFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable(['billing_order_id', 'gateway', 'idempotency_key', 'external_id', 'checkout_url', 'status', 'failure_message', 'gateway_payload'])]
class PaymentAttempt extends Model
{
    /** @use HasFactory<PaymentAttemptFactory> */
    use HasFactory, HasUuids;

    protected static function booted(): void
    {
        static::creating(function (PaymentAttempt $attempt): void {
            if (! $attempt->idempotency_key) {
                $attempt->idempotency_key = $attempt->id;
            }
        });
    }

    protected function casts(): array
    {
        return [
            'gateway' => Gateway::class,
            'status' => PaymentAttemptStatus::class,
            'gateway_payload' => 'array',
        ];
    }

    public function order(): BelongsTo
    {
        return $this->belongsTo(BillingOrder::class, 'billing_order_id');
    }
}
