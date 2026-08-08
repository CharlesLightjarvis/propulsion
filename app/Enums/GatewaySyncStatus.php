<?php

namespace App\Enums;

enum GatewaySyncStatus: string
{
    case Pending = 'pending';
    case Synced = 'synced';
    case Failed = 'failed';

    public function label(): string
    {
        return match ($this) {
            self::Pending => 'En attente',
            self::Synced => 'Synchronisé',
            self::Failed => 'Échec',
        };
    }
}
