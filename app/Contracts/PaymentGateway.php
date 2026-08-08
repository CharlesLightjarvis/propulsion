<?php

namespace App\Contracts;

use App\Billing\Data\CheckoutRequest;
use App\Billing\Data\CheckoutResult;
use App\Models\MembershipPlan;
use App\Models\MembershipPlanPrice;

interface PaymentGateway
{
    public function syncPlan(MembershipPlan $plan): string;

    public function syncPrice(MembershipPlanPrice $price): string;

    public function createCheckout(CheckoutRequest $request): CheckoutResult;
}
