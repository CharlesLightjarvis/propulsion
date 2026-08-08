<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\MembershipPlan;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function __invoke(): Response
    {
        $plans = MembershipPlan::query()
            ->where('is_active', true)
            ->orderBy('display_order', 'asc')
            ->with(['activePrices' => fn ($query) => $query->orderBy('region')])
            ->get()
            ->map(fn (MembershipPlan $plan) => [
                'code' => $plan->code,
                'name' => $plan->name,
                'description' => $plan->description,
                'benefits' => $plan->benefits,
                'prices' => $plan->activePrices->mapWithKeys(fn ($price) => [
                    $price->region->value => [
                        'id' => $price->id,
                        'formatted' => $price->formatted,
                    ],
                ]),
            ]);

        return Inertia::render('home/index', ['plans' => $plans]);
    }
}
