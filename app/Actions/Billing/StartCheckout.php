<?php

namespace App\Actions\Billing;

use App\Billing\Data\CheckoutRequest;
use App\Billing\Data\CheckoutResult;
use App\Billing\PaymentGatewayManager;
use App\Enums\BillingOrderPurpose;
use App\Enums\BillingOrderStatus;
use App\Enums\Gateway;
use App\Enums\PaymentAttemptStatus;
use App\Models\BillingOrder;
use App\Models\MembershipPlanPrice;
use App\Models\PaymentAttempt;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use LogicException;

class StartCheckout
{
    public function __construct(private readonly PaymentGatewayManager $gateways) {}

    public function handle(User $user, MembershipPlanPrice $price, BillingOrderPurpose $purpose, Gateway $gateway): CheckoutResult
    {
        [$order, $attempt] = DB::transaction(function () use ($user, $price, $purpose, $gateway): array {
            User::query()->whereKey($user)->lockForUpdate()->firstOrFail();

            $openKey = "{$user->id}:{$purpose->value}:{$price->id}";
            $order = BillingOrder::query()->where('open_key', $openKey)->first();

            if (! $order) {
                $price->loadMissing('plan');
                $order = BillingOrder::query()->create([
                    'user_id' => $user->id,
                    'membership_plan_id' => $price->membership_plan_id,
                    'membership_plan_price_id' => $price->id,
                    'purpose' => $purpose,
                    'status' => BillingOrderStatus::Pending,
                    'gateway' => $gateway,
                    'open_key' => $openKey,
                    'plan_code' => $price->plan->code,
                    'plan_name' => $price->plan->name,
                    'amount_minor' => $price->amount_minor,
                    'currency' => $price->currency,
                ]);
            }

            $attempt = $order->attempts()->latest()->first()
                ?? $order->attempts()->create(['gateway' => $gateway, 'status' => PaymentAttemptStatus::Pending]);

            return [$order, $attempt];
        });

        if ($attempt->checkout_url && $attempt->external_id) {
            return new CheckoutResult($order->id, $attempt->external_id, $attempt->checkout_url);
        }

        $externalPriceId = $price->gatewayResources()->where('gateway', $gateway)->value('external_id')
            ?? throw new LogicException('Ce prix n’est pas encore synchronisé avec le moyen de paiement.');

        $result = $this->gateways->driver($gateway)->createCheckout(new CheckoutRequest(
            user: $user,
            orderId: $order->id,
            attemptId: $attempt->id,
            externalPriceId: $externalPriceId,
            successUrl: route('member.dashboard'),
            cancelUrl: url('/'),
        ));

        DB::transaction(function () use ($order, $attempt, $result): void {
            PaymentAttempt::query()->whereKey($attempt)->lockForUpdate()->update([
                'external_id' => $result->externalId,
                'checkout_url' => $result->checkoutUrl,
            ]);
            $order->update(['status' => BillingOrderStatus::AwaitingPayment]);
        });

        return $result;
    }
}
