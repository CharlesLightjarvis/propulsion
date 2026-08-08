<?php

namespace App\Enums;

enum BillingOrderStatus: string
{
    case Pending = 'pending';
    case AwaitingPayment = 'awaiting_payment';
    case Processing = 'processing';
    case Paid = 'paid';
    case Failed = 'failed';
    case Cancelled = 'cancelled';
    case Refunded = 'refunded';

    public function label(): string
    {
        return match ($this) {
            self::Pending => 'En attente',
            self::AwaitingPayment => 'En attente de paiement',
            self::Processing => 'En cours de traitement',
            self::Paid => 'Payée',
            self::Failed => 'Échouée',
            self::Cancelled => 'Annulée',
            self::Refunded => 'Remboursée',
        };
    }
}
