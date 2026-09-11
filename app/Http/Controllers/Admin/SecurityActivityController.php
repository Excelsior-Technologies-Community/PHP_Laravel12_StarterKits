<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\SecurityActivity;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SecurityActivityController extends Controller
{
    /**
     * Display security activity history.
     */
    public function index(Request $request): Response
    {
        $query = SecurityActivity::query()
            ->with('user');

        /*
        |--------------------------------------------------------------------------
        | Search
        |--------------------------------------------------------------------------
        */
        if ($request->filled('search')) {
            $search = $request->input('search');

            $query->where(function ($q) use ($search) {
                $q->where('email', 'like', "%{$search}%")
                    ->orWhere('ip_address', 'like', "%{$search}%")
                    ->orWhere('action', 'like', "%{$search}%")
                    ->orWhereHas('user', function ($userQuery) use ($search) {
                        $userQuery
                            ->where('name', 'like', "%{$search}%")
                            ->orWhere('email', 'like', "%{$search}%");
                    });
            });
        }

        /*
        |--------------------------------------------------------------------------
        | Action Filter
        |--------------------------------------------------------------------------
        */
        if ($request->filled('action')) {
            $query->where('action', $request->input('action'));
        }

        /*
        |--------------------------------------------------------------------------
        | Status Filter
        |--------------------------------------------------------------------------
        */
        if ($request->filled('status')) {
            $query->where('status', $request->input('status'));
        }

        /*
        |--------------------------------------------------------------------------
        | Pagination
        |--------------------------------------------------------------------------
        */
        $activities = $query
            ->latest()
            ->paginate(15)
            ->withQueryString();

        /*
        |--------------------------------------------------------------------------
        | Add User Name
        |--------------------------------------------------------------------------
        |
        | Your React page expects:
        |
        | activity.user_name
        |
        */
        $activities->getCollection()->transform(function ($activity) {
            return [
                'id' => $activity->id,
                'action' => $activity->action,
                'email' => $activity->email,
                'ip_address' => $activity->ip_address,
                'status' => $activity->status,
                'user_agent' => $activity->user_agent,

                // This fixes "Unknown"
                'user_name' => $activity->user?->name,

                'created_at' => $activity->created_at,
            ];
        });

        return Inertia::render('admin/security-activities', [
            'activities' => $activities,

            'filters' => [
                'search' => $request->input('search', ''),
                'action' => $request->input('action', ''),
                'status' => $request->input('status', ''),
            ],
        ]);
    }
}