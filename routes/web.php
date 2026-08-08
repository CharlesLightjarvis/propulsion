<?php

use App\Http\Controllers\Public\HomeController;
use Illuminate\Support\Facades\Route;

Route::get('/', HomeController::class)->name('home');

require __DIR__.'/settings.php';
require __DIR__.'/member.php';
require __DIR__.'/admin.php';
require __DIR__.'/billing.php';
