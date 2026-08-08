<?php

namespace App\Enums;

enum BillingOrderPurpose: string
{
    case InitialMembership = 'initial_membership';
    case Renewal = 'renewal';
    case PlanChange = 'plan_change';
    case AdministrativeGrant = 'administrative_grant';

    public function label(): string
    {
        return match ($this) {
            self::InitialMembership => 'Nouvelle adhésion',
            self::Renewal => 'Renouvellement',
            self::PlanChange => 'Changement de formule',
            self::AdministrativeGrant => 'Attribution administrative',
        };
    }
}
