<?php

namespace App\Models;

use App\Enums\PriceStatus;
use Database\Factories\MembershipPlanFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;

#[Fillable(['code', 'name', 'description', 'benefits', 'display_order', 'is_active'])]
class MembershipPlan extends Model
{
    /** @use HasFactory<MembershipPlanFactory> */
    use HasFactory, HasSlug, HasUuids;

    public function getSlugOptions(): SlugOptions
    {
        return SlugOptions::create()
            ->generateSlugsFrom('name')
            ->saveSlugsTo('slug');
    }

    protected function casts(): array
    {
        return [
            'benefits' => 'array',
            'display_order' => 'integer',
            'is_active' => 'boolean',
        ];
    }

    public function prices(): HasMany
    {
        return $this->hasMany(MembershipPlanPrice::class);
    }

    public function activePrices(): HasMany
    {
        return $this->prices()->where('status', PriceStatus::Active);
    }

    public function gatewayResources(): MorphMany
    {
        return $this->morphMany(GatewayResource::class, 'resourceable');
    }
}
