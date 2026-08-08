<?php

namespace App\Billing\Data;

use App\Models\User;

final readonly class CheckoutRequest
{
    public function __construct(
        public User $user,
        public string $orderId,
        public string $attemptId,
        public string $externalPriceId,
        public string $successUrl,
        public string $cancelUrl,
    ) {}
}
