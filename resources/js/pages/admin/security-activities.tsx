import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';

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

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface Activities {
    data: Activity[];
    links: PaginationLink[];
}

interface Filters {
    search: string;
    action: string;
    status: string;
}

interface Props {
    activities: Activities;
    filters: Filters;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Security Activities',
        href: '/admin/security-activities',
    },
];

export default function SecurityActivities({
    activities,
    filters,
}: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Security Activities" />

            <div className="space-y-6 p-6">
                <div>
                    <h1 className="text-2xl font-bold">
                        Security Activity History
                    </h1>

                    <p className="mt-1 text-sm text-muted-foreground">
                        Review authentication and account security events.
                    </p>
                </div>

                <form
                    method="get"
                    action="/admin/security-activities"
                    className="grid gap-3 rounded-xl border p-4 md:grid-cols-4"
                >
                    <input
                        type="text"
                        name="search"
                        defaultValue={filters.search}
                        placeholder="Email, IP or action..."
                        className="rounded-lg border bg-background px-3 py-2 text-sm"
                    />

                    <select
                        name="action"
                        defaultValue={filters.action}
                        className="rounded-lg border bg-background px-3 py-2 text-sm"
                    >
                        <option value="">All actions</option>
                        <option value="login">Login</option>
                        <option value="logout">Logout</option>
                        <option value="user_activated">
                            User Activated
                        </option>
                        <option value="user_deactivated">
                            User Deactivated
                        </option>
                        <option value="role_changed">
                            Role Changed
                        </option>
                    </select>

                    <select
                        name="status"
                        defaultValue={filters.status}
                        className="rounded-lg border bg-background px-3 py-2 text-sm"
                    >
                        <option value="">All statuses</option>
                        <option value="success">Success</option>
                        <option value="failed">Failed</option>
                    </select>

                    <button
                        type="submit"
                        className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
                    >
                        Filter
                    </button>
                </form>

                <div className="overflow-hidden rounded-xl border">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="border-b bg-muted/40">
                                <tr>
                                    <th className="px-5 py-3">User</th>
                                    <th className="px-5 py-3">Action</th>
                                    <th className="px-5 py-3">IP Address</th>
                                    <th className="px-5 py-3">Status</th>
                                    <th className="px-5 py-3">User Agent</th>
                                    <th className="px-5 py-3">Date</th>
                                </tr>
                            </thead>

                            <tbody>
                                {activities.data.map((activity) => (
                                    <tr
                                        key={activity.id}
                                        className="border-b last:border-0"
                                    >
                                        <td className="px-5 py-4">
                                            <div className="font-medium">
                                                {activity.user_name ??
                                                    'Unknown'}
                                            </div>

                                            <div className="text-xs text-muted-foreground">
                                                {activity.email ?? '-'}
                                            </div>
                                        </td>

                                        <td className="px-5 py-4 capitalize">
                                            {activity.action.replaceAll(
                                                '_',
                                                ' ',
                                            )}
                                        </td>

                                        <td className="px-5 py-4">
                                            {activity.ip_address ?? '-'}
                                        </td>

                                        <td className="px-5 py-4">
                                            <span
                                                className={
                                                    activity.status ===
                                                    'success'
                                                        ? 'rounded-full bg-green-100 px-2 py-1 text-xs text-green-700'
                                                        : 'rounded-full bg-red-100 px-2 py-1 text-xs text-red-700'
                                                }
                                            >
                                                {activity.status}
                                            </span>
                                        </td>

                                        <td className="max-w-xs truncate px-5 py-4 text-xs text-muted-foreground">
                                            {activity.user_agent ?? '-'}
                                        </td>

                                        <td className="whitespace-nowrap px-5 py-4">
                                            {activity.created_at}
                                        </td>
                                    </tr>
                                ))}

                                {activities.data.length === 0 && (
                                    <tr>
                                        <td
                                            colSpan={6}
                                            className="px-5 py-8 text-center text-muted-foreground"
                                        >
                                            No activity found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div className="flex flex-wrap gap-2 border-t p-4">
                        {activities.links.map((link, index) => (
                            <Link
                                key={index}
                                href={link.url ?? '#'}
                                className={
                                    link.active
                                        ? 'rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground'
                                        : 'rounded-md border px-3 py-1.5 text-xs'
                                }
                                dangerouslySetInnerHTML={{
                                    __html: link.label,
                                }}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}