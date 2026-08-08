<?php

use App\Http\Controllers\Billing\CheckoutController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified', 'role:member'])->prefix('billing')->name('billing.')->group(function (): void {
    Route::post('checkout', [CheckoutController::class, 'store'])->middleware('idempotent')->name('checkout.store');
    Route::get('checkout/{price}', [CheckoutController::class, 'redirect'])->name('checkout.redirect');
    Route::get('orders/{order}', [CheckoutController::class, 'show'])->name('orders.show');
});
