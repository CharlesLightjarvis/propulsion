<?php

use App\Http\Controllers\Member\DashboardController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified', 'role:member', 'active.membership'])->prefix('member')->name('member.')->group(function (): void {
    Route::get('dashboard', DashboardController::class)->name('dashboard');
});
