<?php

use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\MembershipPlanController;
use App\Http\Controllers\Admin\MembershipPlanPriceController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified', 'role:admin|super_admin'])->prefix('admin')->name('admin.')->group(function (): void {
    Route::get('dashboard', DashboardController::class)->name('dashboard');

    Route::get('membership-plans', [MembershipPlanController::class, 'index'])->name('membership-plans.index');
    Route::get('membership-plans/create', [MembershipPlanController::class, 'create'])->name('membership-plans.create');
    Route::post('membership-plans', [MembershipPlanController::class, 'store'])->name('membership-plans.store');
    Route::get('membership-plans/{plan:slug}/edit', [MembershipPlanController::class, 'edit'])->name('membership-plans.edit');
    Route::patch('membership-plans/{plan}', [MembershipPlanController::class, 'update'])->name('membership-plans.update');
    Route::post('membership-plans/{plan}/synchronize', [MembershipPlanController::class, 'synchronize'])->name('membership-plans.synchronize');
    Route::patch('membership-plans/{plan}/toggle-active', [MembershipPlanController::class, 'toggleActive'])->name('membership-plans.toggle-active');
    Route::post('membership-plans/{plan}/prices', [MembershipPlanPriceController::class, 'store'])->name('membership-plans.prices.store');
});
