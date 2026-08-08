<?php

namespace App\Models;

use App\Enums\Gateway;
use App\Enums\PaymentStatus;
use Database\Factories\PaymentFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable(['user_id', 'billing_order_id', 'gateway', 'external_payment_id', 'status', 'amount_minor', 'currency', 'paid_at', 'refunded_at', 'gateway_payload'])]
class Payment extends Model
{
    /** @use HasFactory<PaymentFactory> */
    use HasFactory, HasUuids;

    protected function casts(): array
    {
        return [
            'gateway' => Gateway::class,
            'status' => PaymentStatus::class,
            'paid_at' => 'datetime',
            'refunded_at' => 'datetime',
            'gateway_payload' => 'array',
        ];
    }

    public function order(): BelongsTo
    {
        return $this->belongsTo(BillingOrder::class, 'billing_order_id');
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
