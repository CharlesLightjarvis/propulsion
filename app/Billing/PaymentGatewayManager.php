<?php

namespace App\Billing;

use App\Contracts\PaymentGateway;
use App\Enums\Gateway;
use InvalidArgumentException;

class PaymentGatewayManager
{
    /** @param array<string, PaymentGateway> $drivers */
    public function __construct(private readonly array $drivers) {}

    public function driver(Gateway $gateway): PaymentGateway
    {
        return $this->drivers[$gateway->value]
            ?? throw new InvalidArgumentException("Gateway [{$gateway->value}] non configuré.");
    }
}
