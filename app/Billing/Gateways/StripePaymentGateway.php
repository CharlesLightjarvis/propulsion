<?php

namespace App\Billing\Gateways;

use App\Billing\Data\CheckoutRequest;
use App\Billing\Data\CheckoutResult;
use App\Contracts\PaymentGateway;
use App\Enums\Gateway;
use App\Models\MembershipPlan;
use App\Models\MembershipPlanPrice;
use Laravel\Cashier\Cashier;
use LogicException;

class StripePaymentGateway implements PaymentGateway
{
    public function syncPlan(MembershipPlan $plan): string
    {
        $mapping = $plan->gatewayResources()->where('gateway', Gateway::Stripe)->first();
        $parameters = [
            'name' => $plan->name,
            'description' => $plan->description,
            'active' => $plan->is_active,
            'metadata' => ['membership_plan_id' => $plan->id, 'membership_plan_code' => $plan->code],
        ];

        if ($mapping) {
            return Cashier::stripe()->products->update($mapping->external_id, $parameters)->id;
        }

        return Cashier::stripe()->products->create(
            $parameters,
            ['idempotency_key' => "plan:{$plan->id}"],
        )->id;
    }

    public function syncPrice(MembershipPlanPrice $price): string
    {
        $productId = $price->plan->gatewayResources()
            ->where('gateway', Gateway::Stripe)
            ->value('external_id')
            ?? throw new LogicException('Le plan doit être synchronisé avant son prix.');

        return Cashier::stripe()->prices->create([
            'product' => $productId,
            'unit_amount' => $price->amount_minor,
            'currency' => mb_strtolower($price->currency),
            'recurring' => ['interval' => $price->interval],
            'metadata' => ['membership_price_id' => $price->id, 'billing_region' => $price->region->value],
        ], ['idempotency_key' => "price:{$price->id}"])->id;
    }

    public function createCheckout(CheckoutRequest $request): CheckoutResult
    {
        $customer = $request->user->createOrGetStripeCustomer();
        $metadata = [
            'billing_order_id' => $request->orderId,
            'payment_attempt_id' => $request->attemptId,
        ];

        $session = Cashier::stripe()->checkout->sessions->create([
            'mode' => 'subscription',
            'customer' => $customer->id,
            'line_items' => [['price' => $request->externalPriceId, 'quantity' => 1]],
            'success_url' => $request->successUrl,
            'cancel_url' => $request->cancelUrl,
            'client_reference_id' => $request->orderId,
            'metadata' => $metadata,
            'subscription_data' => ['metadata' => $metadata + ['name' => 'membership', 'type' => 'membership']],
        ], ['idempotency_key' => $request->attemptId]);

        return new CheckoutResult($request->orderId, $session->id, $session->url);
    }
}
