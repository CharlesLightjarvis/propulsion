<?php

namespace App\Http\Controllers\Admin;

use App\Actions\Billing\CreatePlanWithPrices;
use App\Enums\BillingRegion;
use App\Enums\Gateway;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreMembershipPlanRequest;
use App\Http\Requests\Admin\UpdateMembershipPlanRequest;
use App\Jobs\Billing\SyncPlanToGateway;
use App\Models\MembershipPlan;
use App\Support\Currency;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class MembershipPlanController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('admin/membership-plans/index', [
            'plans' => MembershipPlan::query()
                ->with(['activePrices.gatewayResources'])
                ->withCount('prices')
                ->orderBy('display_order')
                ->paginate(50)
                ->withQueryString(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/membership-plans/create');
    }

    public function store(StoreMembershipPlanRequest $request, CreatePlanWithPrices $createPlanWithPrices): RedirectResponse
    {
        $data = $request->validated();

        $prices = array_map(
            fn (array $price): array => [
                'amount_minor' => Currency::toMinorUnits((float) $price['amount'], BillingRegion::from($price['region'])->currency()),
                'region' => $price['region'],
                'interval' => $price['interval'],
            ],
            $data['prices'],
        );

        $plan = $createPlanWithPrices->handle(
            $data['code'],
            $data['name'],
            $data['description'] ?? null,
            array_values(array_filter($data['benefits'] ?? [])),
            $prices,
            Gateway::Stripe,
        );

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Formule créée et synchronisation Stripe planifiée.']);

        return redirect()->route('admin.membership-plans.edit', $plan);
    }

    public function edit(MembershipPlan $plan): Response
    {
        return Inertia::render('admin/membership-plans/edit', ['plan' => $plan->load(['prices.gatewayResources'])]);
    }

    public function update(UpdateMembershipPlanRequest $request, MembershipPlan $plan): RedirectResponse
    {
        $data = $request->validated();
        $data['benefits'] = array_values(array_filter($data['benefits'] ?? []));
        $plan->update($data);
        SyncPlanToGateway::dispatch($plan->id, Gateway::Stripe, true);

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Formule mise à jour.']);

        return back();
    }

    public function synchronize(MembershipPlan $plan): RedirectResponse
    {
        SyncPlanToGateway::dispatch($plan->id, Gateway::Stripe, true);

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Synchronisation Stripe placée dans la file de traitement.']);

        return back();
    }

    public function toggleActive(MembershipPlan $plan): RedirectResponse
    {
        $plan->update(['is_active' => ! $plan->is_active]);
        SyncPlanToGateway::dispatch($plan->id, Gateway::Stripe, true);

        Inertia::flash('toast', [
            'type' => 'success',
            'message' => $plan->is_active
                ? 'Formule réactivée et synchronisée avec Stripe.'
                : 'Formule archivée sur Stripe.',
        ]);

        return back();
    }
}
