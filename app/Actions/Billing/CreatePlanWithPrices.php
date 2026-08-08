<?php

namespace App\Actions\Billing;

use App\Enums\BillingRegion;
use App\Enums\Gateway;
use App\Models\MembershipPlan;
use Illuminate\Support\Facades\DB;

class CreatePlanWithPrices
{
    public function __construct(
        private readonly CreatePlan $createPlan,
        private readonly PublishPlanPrice $publishPlanPrice,
    ) {}

    /**
     * @param  list<string>  $benefits
     * @param  list<array{amount_minor: int, region: string, interval: string}>  $prices
     */
    public function handle(string $code, string $name, ?string $description, array $benefits, array $prices, Gateway $gateway): MembershipPlan
    {
        return DB::transaction(function () use ($code, $name, $description, $benefits, $prices, $gateway): MembershipPlan {
            $plan = $this->createPlan->handle($code, $name, $description, $benefits);

            foreach ($prices as $price) {
                $this->publishPlanPrice->handle($plan, $price['amount_minor'], BillingRegion::from($price['region']), $price['interval'], $gateway);
            }

            return $plan;
        });
    }
}
