<?php

namespace App\Http\Controllers\Admin;

use App\Actions\Billing\PublishPlanPrice;
use App\Enums\BillingRegion;
use App\Enums\Gateway;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\PublishMembershipPlanPriceRequest;
use App\Models\MembershipPlan;
use App\Support\Currency;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;

class MembershipPlanPriceController extends Controller
{
    public function store(PublishMembershipPlanPriceRequest $request, MembershipPlan $plan, PublishPlanPrice $publishPlanPrice): RedirectResponse
    {
        $data = $request->validated();
        $region = BillingRegion::from($data['region']);
        $amountMinor = Currency::toMinorUnits((float) $data['amount'], $region->currency());

        $publishPlanPrice->handle($plan, $amountMinor, $region, $data['interval'], Gateway::Stripe);

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Nouveau prix publié et synchronisation Stripe planifiée.']);

        return back();
    }
}
