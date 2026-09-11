import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';

interface Statistics {
    totalUsers: number;
    activeUsers: number;
    inactiveUsers: number;
    verifiedUsers: number;
    unverifiedUsers: number;
    totalLogins: number;
    todayLogins: number;
    failedLogins: number;
    todayFailedLogins: number;
}

interface Activity {
    id: number;
    action: string;
    email: string | null;
    ip_address: string | null;
    status: string;
    user_agent: string | null;
    user_name: string | null;
    created_at: string;
}

interface Props {
    statistics: Statistics;
    recentActivities: Activity[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Security Dashboard',
        href: '/admin/security-dashboard',
    },
];

export default function SecurityDashboard({
    statistics,
    recentActivities,
}: Props) {
    const cards = [
        {
            title: 'Total Users',
            value: statistics.totalUsers,
            description: 'Registered accounts',
        },
        {
            title: 'Active Users',
            value: statistics.activeUsers,
            description: 'Currently active',
        },
        {
            title: 'Verified Users',
            value: statistics.verifiedUsers,
            description: 'Email verified',
        },
        {
            title: 'Total Logins',
            value: statistics.totalLogins,
            description: `${statistics.todayLogins} today`,
        },
        {
            title: 'Failed Logins',
            value: statistics.failedLogins,
            description: `${statistics.todayFailedLogins} today`,
        },
        {
            title: 'Inactive Users',
            value: statistics.inactiveUsers,
            description: 'Disabled accounts',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Security Dashboard" />

            <div className="space-y-6 p-6">
                <div>
                    <h1 className="text-2xl font-bold">
                        Security & Authentication Analytics
                    </h1>

                    <p className="mt-1 text-sm text-muted-foreground">
                        Monitor users, authentication activity and security
                        events.
                    </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {cards.map((card) => (
                        <div
                            key={card.title}
                            className="rounded-xl border bg-card p-5 shadow-sm"
                        >
                            <p className="text-sm text-muted-foreground">
                                {card.title}
                            </p>

                            <p className="mt-2 text-3xl font-bold">
                                {card.value}
                            </p>

                            <p className="mt-1 text-xs text-muted-foreground">
                                {card.description}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="flex flex-wrap gap-3">
                    <Link
                        href="/admin/users"
                        className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
                    >
                        Manage Users
                    </Link>

                    <Link
                        href="/admin/security-activities"
                        className="rounded-lg border px-4 py-2 text-sm font-medium"
                    >
                        View Security Activities
                    </Link>
                </div>

                <div className="rounded-xl border bg-card shadow-sm">
                    <div className="border-b p-5">
                        <h2 className="font-semibold">
                            Recent Security Activity
                        </h2>

                        <p className="mt-1 text-sm text-muted-foreground">
                            Latest authentication and account events.
                        </p>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="border-b bg-muted/40">
                                <tr>
                                    <th className="px-5 py-3">User</th>
                                    <th className="px-5 py-3">Action</th>
                                    <th className="px-5 py-3">IP Address</th>
                                    <th className="px-5 py-3">Status</th>
                                    <th className="px-5 py-3">Time</th>
                                </tr>
                            </thead>

                            <tbody>
                                {recentActivities.map((activity) => (
                                    <tr
                                        key={activity.id}
                                        className="border-b last:border-0"
                                    >
                                        <td className="px-5 py-3">
                                            <div className="font-medium">
                                                {activity.user_name ??
                                                    'Unknown'}
                                            </div>

                                            <div className="text-xs text-muted-foreground">
                                                {activity.email ?? '-'}
                                            </div>
                                        </td>

                                        <td className="px-5 py-3 capitalize">
                                            {activity.action.replaceAll(
                                                '_',
                                                ' ',
                                            )}
                                        </td>

                                        <td className="px-5 py-3">
                                            {activity.ip_address ?? '-'}
                                        </td>

                                        <td className="px-5 py-3">
                                            <span
                                                className={
                                                    activity.status ===
                                                    'success'
                                                        ? 'rounded-full bg-green-100 px-2 py-1 text-xs text-green-700 dark:bg-green-900/30 dark:text-green-400'
                                                        : 'rounded-full bg-red-100 px-2 py-1 text-xs text-red-700 dark:bg-red-900/30 dark:text-red-400'
                                                }
                                            >
                                                {activity.status}
                                            </span>
                                        </td>

                                        <td className="px-5 py-3 text-muted-foreground">
                                            {activity.created_at}
                                        </td>
                                    </tr>
                                ))}

                                {recentActivities.length === 0 && (
                                    <tr>
                                        <td
                                            colSpan={5}
                                            className="px-5 py-8 text-center text-muted-foreground"
                                        >
                                            No security activity found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}