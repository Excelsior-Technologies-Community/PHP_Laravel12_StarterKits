import { Head, Link, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type SharedData } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard() {
    const { auth } = usePage<SharedData>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />

            <div className="space-y-6 p-6">
                <div>
                    <h1 className="text-2xl font-bold">
                        Welcome, {auth.user.name}
                    </h1>

                    <p className="mt-1 text-sm text-muted-foreground">
                        Laravel 12 Starter Kit Dashboard
                    </p>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                    <div className="rounded-xl border p-6">
                        <p className="text-sm text-muted-foreground">
                            Authentication
                        </p>

                        <h2 className="mt-2 text-xl font-semibold">
                            Fortify
                        </h2>

                        <p className="mt-2 text-sm text-muted-foreground">
                            Secure Laravel authentication is enabled.
                        </p>
                    </div>

                    <div className="rounded-xl border p-6">
                        <p className="text-sm text-muted-foreground">
                            Two-Factor Authentication
                        </p>

                        <h2 className="mt-2 text-xl font-semibold">
                            Enabled
                        </h2>

                        <p className="mt-2 text-sm text-muted-foreground">
                            Manage 2FA from your account settings.
                        </p>
                    </div>

                    <div className="rounded-xl border p-6">
                        <p className="text-sm text-muted-foreground">
                            Account Role
                        </p>

                        <h2 className="mt-2 text-xl font-semibold capitalize">
                            {auth.user.role}
                        </h2>

                        <p className="mt-2 text-sm text-muted-foreground">
                            Current account access level.
                        </p>
                    </div>
                </div>

                {auth.user.role === 'admin' && (
                    <div className="rounded-xl border p-6">
                        <h2 className="text-lg font-semibold">
                            Administration
                        </h2>

                        <p className="mt-1 text-sm text-muted-foreground">
                            Manage users and monitor authentication security.
                        </p>

                        <div className="mt-4 flex flex-wrap gap-3">
                            <Link
                                href="/admin/security-dashboard"
                                className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
                            >
                                Security Dashboard
                            </Link>

                            <Link
                                href="/admin/users"
                                className="rounded-lg border px-4 py-2 text-sm font-medium"
                            >
                                Manage Users
                            </Link>

                            <Link
                                href="/admin/security-activities"
                                className="rounded-lg border px-4 py-2 text-sm font-medium"
                            >
                                Activity History
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}