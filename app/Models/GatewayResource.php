<?php

namespace App\Models;

use App\Enums\Gateway;
use App\Enums\GatewaySyncStatus;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;

#[Fillable(['gateway', 'resourceable_type', 'resourceable_id', 'external_id', 'sync_status', 'synced_at', 'last_error'])]
class GatewayResource extends Model
{
    use HasUuids;

    protected function casts(): array
    {
        return [
            'gateway' => Gateway::class,
            'sync_status' => GatewaySyncStatus::class,
            'synced_at' => 'datetime',
        ];
    }

    public function resourceable(): MorphTo
    {
        return $this->morphTo();
    }
}
