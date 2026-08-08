<?php

namespace App\Enums;

enum PaymentStatus: string
{
    case Pending = 'pending';
    case Paid = 'paid';
    case Failed = 'failed';
    case Refunded = 'refunded';
    case Disputed = 'disputed';

    public function label(): string
    {
        return match ($this) {
            self::Pending => 'En attente',
            self::Paid => 'Payé',
            self::Failed => 'Échoué',
            self::Refunded => 'Remboursé',
            self::Disputed => 'Contesté',
        };
    }
}
