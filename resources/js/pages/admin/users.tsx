import { Form, Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';

interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    is_active: boolean;
    email_verified_at: string | null;
    created_at: string;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface Users {
    data: User[];
    links: PaginationLink[];
    current_page: number;
    last_page: number;
}

interface Filters {
    search: string;
    status: string;
    role: string;
}

interface Statistics {
    total: number;
    active: number;
    inactive: number;
    admins: number;
}

interface Props {
    users: Users;
    filters: Filters;
    statistics: Statistics;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'User Management',
        href: '/admin/users',
    },
];

export default function Users({
    users,
    filters,
    statistics,
}: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="User Management" />

            <div className="space-y-6 p-6">
                <div>
                    <h1 className="text-2xl font-bold">
                        User Management
                    </h1>

                    <p className="mt-1 text-sm text-muted-foreground">
                        Manage registered users, account status and roles.
                    </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="rounded-xl border p-5">
                        <p className="text-sm text-muted-foreground">
                            Total Users
                        </p>
                        <p className="mt-2 text-3xl font-bold">
                            {statistics.total}
                        </p>
                    </div>

                    <div className="rounded-xl border p-5">
                        <p className="text-sm text-muted-foreground">
                            Active
                        </p>
                        <p className="mt-2 text-3xl font-bold">
                            {statistics.active}
                        </p>
                    </div>

                    <div className="rounded-xl border p-5">
                        <p className="text-sm text-muted-foreground">
                            Inactive
                        </p>
                        <p className="mt-2 text-3xl font-bold">
                            {statistics.inactive}
                        </p>
                    </div>

                    <div className="rounded-xl border p-5">
                        <p className="text-sm text-muted-foreground">
                            Administrators
                        </p>
                        <p className="mt-2 text-3xl font-bold">
                            {statistics.admins}
                        </p>
                    </div>
                </div>

                <form
                    method="get"
                    action="/admin/users"
                    className="grid gap-3 rounded-xl border p-4 md:grid-cols-4"
                >
                    <input
                        type="text"
                        name="search"
                        defaultValue={filters.search}
                        placeholder="Search name or email..."
                        className="rounded-lg border bg-background px-3 py-2 text-sm"
                    />

                    <select
                        name="status"
                        defaultValue={filters.status}
                        className="rounded-lg border bg-background px-3 py-2 text-sm"
                    >
                        <option value="">All statuses</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>

                    <select
                        name="role"
                        defaultValue={filters.role}
                        className="rounded-lg border bg-background px-3 py-2 text-sm"
                    >
                        <option value="">All roles</option>
                        <option value="admin">Admin</option>
                        <option value="user">User</option>
                    </select>

                    <button
                        type="submit"
                        className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
                    >
                        Search
                    </button>
                </form>

                <div className="overflow-hidden rounded-xl border">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="border-b bg-muted/40">
                                <tr>
                                    <th className="px-5 py-3">User</th>
                                    <th className="px-5 py-3">Role</th>
                                    <th className="px-5 py-3">Verification</th>
                                    <th className="px-5 py-3">Status</th>
                                    <th className="px-5 py-3">Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {users.data.map((user) => (
                                    <tr
                                        key={user.id}
                                        className="border-b last:border-0"
                                    >
                                        <td className="px-5 py-4">
                                            <div className="font-medium">
                                                {user.name}
                                            </div>

                                            <div className="text-xs text-muted-foreground">
                                                {user.email}
                                            </div>
                                        </td>

                                        <td className="px-5 py-4">
                                            <Form
                                                method="patch"
                                                action={`/admin/users/${user.id}/role`}
                                            >
                                                {({ processing }) => (
                                                    <select
                                                        name="role"
                                                        defaultValue={
                                                            user.role
                                                        }
                                                        disabled={processing}
                                                        onChange={(event) => {
                                                            event.currentTarget.form?.requestSubmit();
                                                        }}
                                                        className="rounded-md border bg-background px-2 py-1 text-xs"
                                                    >
                                                        <option value="user">
                                                            User
                                                        </option>

                                                        <option value="admin">
                                                            Admin
                                                        </option>
                                                    </select>
                                                )}
                                            </Form>
                                        </td>

                                        <td className="px-5 py-4">
                                            {user.email_verified_at ? (
                                                <span className="rounded-full bg-green-100 px-2 py-1 text-xs text-green-700 dark:bg-green-900/30 dark:text-green-400">
                                                    Verified
                                                </span>
                                            ) : (
                                                <span className="rounded-full bg-yellow-100 px-2 py-1 text-xs text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400">
                                                    Unverified
                                                </span>
                                            )}
                                        </td>

                                        <td className="px-5 py-4">
                                            {user.is_active ? (
                                                <span className="rounded-full bg-green-100 px-2 py-1 text-xs text-green-700 dark:bg-green-900/30 dark:text-green-400">
                                                    Active
                                                </span>
                                            ) : (
                                                <span className="rounded-full bg-red-100 px-2 py-1 text-xs text-red-700 dark:bg-red-900/30 dark:text-red-400">
                                                    Inactive
                                                </span>
                                            )}
                                        </td>

                                        <td className="px-5 py-4">
                                            <Form
                                                method="patch"
                                                action={`/admin/users/${user.id}/toggle-status`}
                                            >
                                                {({ processing }) => (
                                                    <button
                                                        type="submit"
                                                        disabled={processing}
                                                        className={
                                                            user.is_active
                                                                ? 'rounded-md bg-red-600 px-3 py-1.5 text-xs font-medium text-white'
                                                                : 'rounded-md bg-green-600 px-3 py-1.5 text-xs font-medium text-white'
                                                        }
                                                    >
                                                        {user.is_active
                                                            ? 'Deactivate'
                                                            : 'Activate'}
                                                    </button>
                                                )}
                                            </Form>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="flex flex-wrap gap-2 border-t p-4">
                        {users.links.map((link, index) => (
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