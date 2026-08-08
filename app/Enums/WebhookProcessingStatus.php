<?php

namespace App\Enums;

enum WebhookProcessingStatus: string
{
    case Pending = 'pending';
    case Processing = 'processing';
    case Processed = 'processed';
    case Failed = 'failed';

    public function label(): string
    {
        return match ($this) {
            self::Pending => 'En attente',
            self::Processing => 'En cours de traitement',
            self::Processed => 'Traité',
            self::Failed => 'Échoué',
        };
    }
}
