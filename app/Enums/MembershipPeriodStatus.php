<?php

namespace App\Enums;

enum MembershipPeriodStatus: string
{
    case Scheduled = 'scheduled';
    case Active = 'active';
    case Grace = 'grace';
    case Suspended = 'suspended';
    case Expired = 'expired';
    case Revoked = 'revoked';

    public function label(): string
    {
        return match ($this) {
            self::Scheduled => 'Programmée',
            self::Active => 'Active',
            self::Grace => 'Période de grâce',
            self::Suspended => 'Suspendue',
            self::Expired => 'Expirée',
            self::Revoked => 'Révoquée',
        };
    }
}
