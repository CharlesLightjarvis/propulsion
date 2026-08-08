<?php

namespace App\Support;

final class Currency
{
    public static function format(int $amountMinor, string $currency): string
    {
        return match ($currency) {
            'XAF' => number_format($amountMinor, 0, ',', ' ').' FCFA',
            'EUR' => number_format($amountMinor / 100, 0, ',', ' ').' €',
            default => number_format($amountMinor / 100, 2).' '.$currency,
        };
    }

    /**
     * Convert an amount typed by an admin in the currency's major unit
     * (e.g. euros, FCFA) into the minor unit Stripe and the database expect.
     */
    public static function toMinorUnits(float $amount, string $currency): int
    {
        return match ($currency) {
            'XAF' => (int) round($amount),
            default => (int) round($amount * 100),
        };
    }
}
