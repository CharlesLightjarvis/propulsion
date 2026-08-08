<?php

namespace App\Enums;

enum BillingRegion: string
{
    case Africa = 'africa';
    case Europe = 'europe';

    public function label(): string
    {
        return match ($this) {
            self::Africa => 'Afrique',
            self::Europe => 'Europe',
        };
    }

    public function currency(): string
    {
        return match ($this) {
            self::Africa => 'XAF',
            self::Europe => 'EUR',
        };
    }
}
