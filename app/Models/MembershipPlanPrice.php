<?php

namespace App\Models;

use App\Enums\BillingRegion;
use App\Enums\PriceStatus;
use App\Support\Currency;
use Database\Factories\MembershipPlanPriceFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use LogicException;

#[Fillable(['membership_plan_id', 'replaces_price_id', 'amount_minor', 'currency', 'region', 'interval', 'status', 'published_at', 'archived_at'])]
class MembershipPlanPrice extends Model
{
    /** @use HasFactory<MembershipPlanPriceFactory> */
    use HasFactory, HasUuids;

    protected $appends = ['formatted'];

    protected static function booted(): void
    {
        static::updating(function (MembershipPlanPrice $price): void {
            if ($price->getRawOriginal('status') !== PriceStatus::Active->value) {
                return;
            }

            if ($price->isDirty(['membership_plan_id', 'amount_minor', 'currency', 'region', 'interval', 'published_at'])) {
                throw new LogicException('Un prix publié est immuable. Publiez une nouvelle version.');
            }
        });
    }

    protected function casts(): array
    {
        return [
            'status' => PriceStatus::class,
            'region' => BillingRegion::class,
            'published_at' => 'datetime',
            'archived_at' => 'datetime',
        ];
    }

    public function plan(): BelongsTo
    {
        return $this->belongsTo(MembershipPlan::class, 'membership_plan_id');
    }

    public function replacedPrice(): BelongsTo
    {
        return $this->belongsTo(self::class, 'replaces_price_id');
    }

    public function gatewayResources(): MorphMany
    {
        return $this->morphMany(GatewayResource::class, 'resourceable');
    }

    protected function formatted(): Attribute
    {
        return Attribute::get(fn (): string => Currency::format($this->amount_minor, $this->currency));
    }

    public function isActive(): bool
    {
        return $this->status === PriceStatus::Active;
    }

    public function isArchived(): bool
    {
        return $this->status === PriceStatus::Archived;
    }

    public function archive(): void
    {
        $this->update(['status' => PriceStatus::Archived, 'archived_at' => now()]);
    }
}
