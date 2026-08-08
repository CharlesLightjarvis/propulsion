<?php

namespace App\Providers;

use App\Billing\Gateways\StripePaymentGateway;
use App\Billing\PaymentGatewayManager;
use App\Enums\Gateway;
use Illuminate\Support\ServiceProvider;

class BillingServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->singleton(StripePaymentGateway::class);
        $this->app->singleton(
            PaymentGatewayManager::class,
            fn ($app): PaymentGatewayManager => new PaymentGatewayManager([
                Gateway::Stripe->value => $app->make(StripePaymentGateway::class),
            ]),
        );
    }
}
