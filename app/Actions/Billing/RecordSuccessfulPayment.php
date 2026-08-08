<?php

namespace App\Actions\Billing;

use App\Enums\BillingOrderStatus;
use App\Enums\Gateway;
use App\Enums\PaymentStatus;
use App\Models\BillingOrder;
use App\Models\Payment;
use Carbon\CarbonImmutable;
use Illuminate\Support\Facades\DB;
use LogicException;

class RecordSuccessfulPayment
{
    public function handle(BillingOrder $order, Gateway $gateway, string $externalPaymentId, int $amountMinor, string $currency, CarbonImmutable $paidAt): Payment
    {
        return DB::transaction(function () use ($order, $gateway, $externalPaymentId, $amountMinor, $currency, $paidAt): Payment {
            $order = BillingOrder::query()->whereKey($order)->lockForUpdate()->firstOrFail();
            $existing = Payment::query()->where('gateway', $gateway)->where('external_payment_id', $externalPaymentId)->first();

            if ($existing) {
                if ($existing->billing_order_id !== $order->id || $existing->amount_minor !== $amountMinor || $existing->currency !== $currency) {
                    throw new LogicException('Le paiement externe existe avec des données incompatibles.');
                }

                return $existing;
            }

            if ($order->amount_minor !== $amountMinor || $order->currency !== $currency) {
                throw new LogicException('Le montant payé ne correspond pas à la commande.');
            }

            $payment = Payment::query()->create([
                'user_id' => $order->user_id,
                'billing_order_id' => $order->id,
                'gateway' => $gateway,
                'external_payment_id' => $externalPaymentId,
                'status' => PaymentStatus::Paid,
                'amount_minor' => $amountMinor,
                'currency' => $currency,
                'paid_at' => $paidAt,
            ]);
            $order->update(['status' => BillingOrderStatus::Paid, 'paid_at' => $paidAt, 'open_key' => null]);

            return $payment;
        });
    }
}
