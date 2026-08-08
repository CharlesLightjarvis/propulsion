<?php

namespace App\Actions\Memberships;

use App\Enums\MembershipPeriodStatus;
use App\Models\MembershipPeriod;
use App\Models\Payment;
use Carbon\CarbonImmutable;
use Illuminate\Support\Facades\DB;

class GrantPaidPeriod
{
    public function handle(Payment $payment, CarbonImmutable $startsAt, CarbonImmutable $endsAt): MembershipPeriod
    {
        return DB::transaction(function () use ($payment, $startsAt, $endsAt): MembershipPeriod {
            $payment = Payment::query()->with('order')->whereKey($payment)->lockForUpdate()->firstOrFail();
            $existing = MembershipPeriod::query()->where('source_payment_id', $payment->id)->first();

            if ($existing) {
                return $existing;
            }

            return MembershipPeriod::query()->create([
                'user_id' => $payment->user_id,
                'membership_plan_id' => $payment->order->membership_plan_id,
                'source_payment_id' => $payment->id,
                'plan_code' => $payment->order->plan_code,
                'plan_name' => $payment->order->plan_name,
                'status' => $startsAt->isFuture() ? MembershipPeriodStatus::Scheduled : MembershipPeriodStatus::Active,
                'starts_at' => $startsAt,
                'ends_at' => $endsAt,
            ]);
        });
    }
}
