<?php

use App\Http\Controllers\Admin\SecurityActivityController;
use App\Http\Controllers\Admin\SecurityDashboardController;
use App\Http\Controllers\Admin\UserManagementController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(
            Features::registration()
        ),
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    /**
     * Admin routes.
     */
    Route::middleware('admin')
        ->prefix('admin')
        ->name('admin.')
        ->group(function () {
            Route::get(
                'security-dashboard',
                [SecurityDashboardController::class, 'index']
            )->name('security-dashboard');

            Route::get(
                'users',
                [UserManagementController::class, 'index']
            )->name('users');

            Route::patch(
                'users/{user}/toggle-status',
                [UserManagementController::class, 'toggleStatus']
            )->name('users.toggle-status');

            Route::patch(
                'users/{user}/role',
                [UserManagementController::class, 'changeRole']
            )->name('users.role');

            Route::get(
                'security-activities',
                [SecurityActivityController::class, 'index']
            )->name('security-activities');
        });
});

require __DIR__.'/settings.php';