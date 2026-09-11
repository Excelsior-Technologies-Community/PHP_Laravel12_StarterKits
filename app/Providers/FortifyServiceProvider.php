<?php

namespace App\Providers;

use App\Actions\Fortify\CreateNewUser;
use App\Actions\Fortify\ResetUserPassword;
use App\Models\User;
use Illuminate\Auth\Events\Failed;
use Illuminate\Auth\Events\Login;
use Illuminate\Auth\Events\Logout;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Str;
use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use Laravel\Fortify\Fortify;

class FortifyServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        $this->configureActions();
        $this->configureViews();
        $this->configureRateLimiting();
        $this->configureAuthentication();
        $this->configureSecurityActivityLogging();
    }

    /**
     * Configure Fortify actions.
     */
    private function configureActions(): void
    {
        Fortify::resetUserPasswordsUsing(
            ResetUserPassword::class
        );

        Fortify::createUsersUsing(
            CreateNewUser::class
        );
    }

    /**
     * Configure authentication.
     */
    private function configureAuthentication(): void
    {
        Fortify::authenticateUsing(function (Request $request) {
            $user = User::where(
                'email',
                $request->input('email')
            )->first();

            if (
                $user &&
                Hash::check(
                    $request->input('password'),
                    $user->password
                )
            ) {
                if (! $user->is_active) {
                    return null;
                }

                return $user;
            }

            return null;
        });
    }

    /**
     * Configure security activity logging.
     */
    private function configureSecurityActivityLogging(): void
    {
        Event::listen(Login::class, function (Login $event) {
            $request = request();

            $event->user->securityActivities()->create([
                'action' => 'login',
                'email' => $event->user->email,
                'ip_address' => $request->ip(),
                'user_agent' => $request->userAgent(),
                'status' => 'success',
            ]);
        });

        Event::listen(Logout::class, function (Logout $event) {
            $request = request();

            if ($event->user) {
                $event->user->securityActivities()->create([
                    'action' => 'logout',
                    'email' => $event->user->email,
                    'ip_address' => $request->ip(),
                    'user_agent' => $request->userAgent(),
                    'status' => 'success',
                ]);
            }
        });

        Event::listen(Failed::class, function (Failed $event) {
            $request = request();

            $user = $event->user;

            \App\Models\SecurityActivity::create([
                'user_id' => $user?->id,
                'action' => 'login',
                'email' => $request->input('email'),
                'ip_address' => $request->ip(),
                'user_agent' => $request->userAgent(),
                'status' => 'failed',
            ]);
        });
    }

    /**
     * Configure Fortify views.
     */
    private function configureViews(): void
    {
        Fortify::loginView(fn (Request $request) => Inertia::render('auth/login', [
            'canResetPassword' => Features::enabled(
                Features::resetPasswords()
            ),
            'canRegister' => Features::enabled(
                Features::registration()
            ),
            'status' => $request->session()->get('status'),
        ]));

        Fortify::resetPasswordView(
            fn (Request $request) => Inertia::render(
                'auth/reset-password',
                [
                    'email' => $request->email,
                    'token' => $request->route('token'),
                ]
            )
        );

        Fortify::requestPasswordResetLinkView(
            fn (Request $request) => Inertia::render(
                'auth/forgot-password',
                [
                    'status' => $request->session()->get('status'),
                ]
            )
        );

        Fortify::verifyEmailView(
            fn (Request $request) => Inertia::render(
                'auth/verify-email',
                [
                    'status' => $request->session()->get('status'),
                ]
            )
        );

        Fortify::registerView(
            fn () => Inertia::render('auth/register')
        );

        Fortify::twoFactorChallengeView(
            fn () => Inertia::render('auth/two-factor-challenge')
        );

        Fortify::confirmPasswordView(
            fn () => Inertia::render('auth/confirm-password')
        );
    }

    /**
     * Configure rate limiting.
     */
    private function configureRateLimiting(): void
    {
        RateLimiter::for('two-factor', function (Request $request) {
            return Limit::perMinute(5)
                ->by($request->session()->get('login.id'));
        });

        RateLimiter::for('login', function (Request $request) {
            $throttleKey = Str::transliterate(
                Str::lower(
                    $request->input(Fortify::username())
                ).'|'.$request->ip()
            );

            return Limit::perMinute(5)->by($throttleKey);
        });
    }
}