<?php

namespace App\Enums;

enum Gateway: string
{
    case Stripe = 'stripe';
    case Manual = 'manual';

    public function label(): string
    {
        return match ($this) {
            self::Stripe => 'Stripe',
            self::Manual => 'Paiement manuel',
        };
    }

    /**
     * Regions this gateway is allowed to process payments for.
     * Stripe only ever handles Europe/EUR — African regions go through
     * a dedicated aggregator (Gateway::Manual for now, later a real one).
     *
     * @return array<int, BillingRegion>
     */
    public function supportedRegions(): array
    {
        return match ($this) {
            self::Stripe => [BillingRegion::Europe],
            self::Manual => [BillingRegion::Africa],
        };
    }
}
