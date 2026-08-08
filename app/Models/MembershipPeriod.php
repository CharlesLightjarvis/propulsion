<?php

namespace App\Models;

use App\Enums\MembershipPeriodStatus;
use Database\Factories\MembershipPeriodFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable(['user_id', 'membership_plan_id', 'source_payment_id', 'plan_code', 'plan_name', 'status', 'starts_at', 'ends_at', 'revoked_at', 'revocation_reason'])]
class MembershipPeriod extends Model
{
    /** @use HasFactory<MembershipPeriodFactory> */
    use HasFactory, HasUuids;

    protected function casts(): array
    {
        return [
            'status' => MembershipPeriodStatus::class,
            'starts_at' => 'datetime',
            'ends_at' => 'datetime',
            'revoked_at' => 'datetime',
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

    public function sourcePayment(): BelongsTo
    {
        return $this->belongsTo(Payment::class, 'source_payment_id');
    }
}
