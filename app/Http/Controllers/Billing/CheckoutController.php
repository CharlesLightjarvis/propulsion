<?php

namespace App\Http\Controllers\Billing;

use App\Actions\Billing\StartCheckout;
use App\Enums\BillingOrderPurpose;
use App\Enums\Gateway;
use App\Http\Controllers\Controller;
use App\Http\Requests\Billing\StartCheckoutRequest;
use App\Models\BillingOrder;
use App\Models\MembershipPlanPrice;
use Illuminate\Http\JsonResponse;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Response as HttpResponse;

class CheckoutController extends Controller
{
    public function store(StartCheckoutRequest $request, StartCheckout $startCheckout): JsonResponse|HttpResponse
    {
        $result = $startCheckout->handle(
            $request->user(),
            MembershipPlanPrice::query()->findOrFail($request->string('price_id')->toString()),
            $request->user()->hasActiveMembership()
                ? BillingOrderPurpose::Renewal
                : BillingOrderPurpose::InitialMembership,
            Gateway::from($request->string('gateway')->toString()),
        );

        if ($request->expectsJson()) {
            return response()->json(['order_id' => $result->orderId, 'checkout_url' => $result->checkoutUrl], Response::HTTP_CREATED);
        }

        return Inertia::location($result->checkoutUrl);
    }

    public function show(BillingOrder $order): JsonResponse
    {
        abort_unless($order->user_id === request()->user()?->id, Response::HTTP_FORBIDDEN);

        return response()->json(['order_id' => $order->id, 'status' => $order->getRawOriginal('status')]);
    }

    /**
     * Plain link entry point for "choose this plan" buttons (e.g. the pricing page).
     * Guests are bounced to registration and resumed here via Laravel's intended-URL redirect.
     */
    public function redirect(StartCheckout $startCheckout, MembershipPlanPrice $price): Response
    {
        abort_unless($price->isActive(), Response::HTTP_NOT_FOUND);

        $user = request()->user();

        $result = $startCheckout->handle(
            $user,
            $price,
            $user->hasActiveMembership()
                ? BillingOrderPurpose::Renewal
                : BillingOrderPurpose::InitialMembership,
            Gateway::Stripe,
        );

        return Inertia::location($result->checkoutUrl);
    }
}
