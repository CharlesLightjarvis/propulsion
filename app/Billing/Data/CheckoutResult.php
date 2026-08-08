<?php

namespace App\Billing\Data;

final readonly class CheckoutResult
{
    public function __construct(public string $orderId, public string $externalId, public string $checkoutUrl) {}
}
