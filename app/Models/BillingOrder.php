<?php

namespace App\Models;

use App\Enums\BillingOrderPurpose;
use App\Enums\BillingOrderStatus;
use App\Enums\Gateway;
use Database\Factories\BillingOrderFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

#[Fillable(['user_id', 'membership_plan_id', 'membership_plan_price_id', 'purpose', 'status', 'gateway', 'open_key', 'plan_code', 'plan_name', 'amount_minor', 'currency', 'paid_at'])]
class BillingOrder extends Model
{
    /** @use HasFactory<BillingOrderFactory> */
    use HasFactory, HasUuids;

    protected function casts(): array
    {
        return [
            'purpose' => BillingOrderPurpose::class,
            'status' => BillingOrderStatus::class,
            'gateway' => Gateway::class,
            'paid_at' => 'datetime',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function plan(): BelongsTo
    {
        return $this->belongsTo(MembershipPlan::class, 'membership_plan_id');
    }

    public function price(): BelongsTo
    {
        return $this->belongsTo(MembershipPlanPrice::class, 'membership_plan_price_id');
    }

    public function attempts(): HasMany
    {
        return $this->hasMany(PaymentAttempt::class);
    }

    public function payment(): HasOne
    {
        return $this->hasOne(Payment::class);
    }
}
