<?php

namespace App\Enums;

enum PaymentAttemptStatus: string
{
    case Pending = 'pending';
    case RequiresAction = 'requires_action';
    case Processing = 'processing';
    case Succeeded = 'succeeded';
    case Failed = 'failed';
    case Cancelled = 'cancelled';

    public function label(): string
    {
        return match ($this) {
            self::Pending => 'En attente',
            self::RequiresAction => 'Action requise',
            self::Processing => 'En cours de traitement',
            self::Succeeded => 'Réussie',
            self::Failed => 'Échouée',
            self::Cancelled => 'Annulée',
        };
    }
}
