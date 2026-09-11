<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\SecurityActivity;
use App\Models\User;
use Illuminate\Support\Carbon;
use Inertia\Inertia;
use Inertia\Response;

class SecurityDashboardController extends Controller
{
    /**
     * Display security analytics.
     */
    public function index(): Response
    {
        $today = Carbon::today();

        $totalUsers = User::count();

        $activeUsers = User::where('is_active', true)->count();

        $inactiveUsers = User::where('is_active', false)->count();

        $verifiedUsers = User::whereNotNull(
            'email_verified_at'
        )->count();

        $unverifiedUsers = User::whereNull(
            'email_verified_at'
        )->count();

        $totalLogins = SecurityActivity::where(
            'action',
            'login'
        )->where(
            'status',
            'success'
        )->count();

        $todayLogins = SecurityActivity::where(
            'action',
            'login'
        )->where(
            'status',
            'success'
        )->whereDate(
            'created_at',
            $today
        )->count();

        $failedLogins = SecurityActivity::where(
            'action',
            'login'
        )->where(
            'status',
            'failed'
        )->count();

        $todayFailedLogins = SecurityActivity::where(
            'action',
            'login'
        )->where(
            'status',
            'failed'
        )->whereDate(
            'created_at',
            $today
        )->count();

        $recentActivities = SecurityActivity::with('user:id,name,email')
            ->latest()
            ->limit(10)
            ->get()
            ->map(function ($activity) {
                return [
                    'id' => $activity->id,
                    'action' => $activity->action,
                    'email' => $activity->email,
                    'ip_address' => $activity->ip_address,
                    'status' => $activity->status,
                    'user_agent' => $activity->user_agent,
                    'user_name' => $activity->user?->name,
                    'created_at' => $activity->created_at
                        ->timezone(config('app.timezone'))
                        ->format('d M Y, h:i A'),
                ];
            });

        return Inertia::render('admin/security-dashboard', [
            'statistics' => [
                'totalUsers' => $totalUsers,
                'activeUsers' => $activeUsers,
                'inactiveUsers' => $inactiveUsers,
                'verifiedUsers' => $verifiedUsers,
                'unverifiedUsers' => $unverifiedUsers,
                'totalLogins' => $totalLogins,
                'todayLogins' => $todayLogins,
                'failedLogins' => $failedLogins,
                'todayFailedLogins' => $todayFailedLogins,
            ],
            'recentActivities' => $recentActivities,
        ]);
    }
}