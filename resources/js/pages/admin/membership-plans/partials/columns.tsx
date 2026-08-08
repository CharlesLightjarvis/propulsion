import { Link, router } from '@inertiajs/react';
import type { ColumnDef } from '@tanstack/react-table';
import {
    Archive,
    ArchiveRestore,
    MoreHorizontal,
    Pencil,
    RefreshCw,
} from 'lucide-react';
import { DataTableColumnHeader } from '@/components/data-table-column-header';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import membershipPlans from '@/routes/admin/membership-plans';
import type { MembershipPlan } from '@/types';

export const PLAN_STATUS_OPTIONS = [
    { label: 'Active', value: 'active' },
    { label: 'Inactive', value: 'inactive' },
] as const;

function RowActions({ plan }: { plan: MembershipPlan }) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="size-8 p-0">
                    <span className="sr-only">Actions</span>
                    <MoreHorizontal className="size-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                    <Link
                        href={membershipPlans.edit(plan.slug)}
                        className="flex items-center gap-2"
                    >
                        <Pencil className="size-4" />
                        Modifier et gérer les prix
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() =>
                        router.post(membershipPlans.synchronize(plan.id).url)
                    }
                >
                    <RefreshCw className="size-4" />
                    Synchroniser avec Stripe
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() =>
                        router.patch(membershipPlans.toggleActive(plan.id).url)
                    }
                >
                    {plan.is_active ? (
                        <>
                            <Archive className="size-4" />
                            Archiver
                        </>
                    ) : (
                        <>
                            <ArchiveRestore className="size-4" />
                            Réactiver
                        </>
                    )}
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export const createColumns = (): ColumnDef<MembershipPlan>[] => [
    {
        accessorKey: 'name',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Formule" />
        ),
        cell: ({ row }) => (
            <div>
                <p className="font-medium">{row.original.name}</p>
                <p className="font-mono text-xs text-muted-foreground">
                    {row.original.code}
                </p>
            </div>
        ),
    },
    {
        id: 'prices',
        header: 'Prix actifs',
        cell: ({ row }) => (
            <div className="flex flex-wrap gap-1.5">
                {row.original.active_prices.length ? (
                    row.original.active_prices.map((price) => (
                        <Badge key={price.id} variant="outline">
                            {price.region === 'africa' ? 'Afrique' : 'Europe'} ·{' '}
                            {price.formatted}/
                            {price.interval === 'year' ? 'an' : 'mois'}
                        </Badge>
                    ))
                ) : (
                    <span className="text-sm text-muted-foreground">
                        Aucun prix
                    </span>
                )}
            </div>
        ),
    },
    {
        id: 'stripe',
        header: 'Stripe',
        cell: ({ row }) => {
            // Stripe only ever handles the Europe/EUR price — Africa/XAF
            // goes through a manual/aggregator flow and is never synced,
            // so only the Europe price determines this badge.
            const europePrices = row.original.active_prices.filter(
                (price) => price.region === 'europe',
            );
            const synced =
                europePrices.length > 0 &&
                europePrices.every((price) =>
                    price.gateway_resources.some(
                        (resource) =>
                            resource.gateway === 'stripe' &&
                            resource.sync_status === 'synced',
                    ),
                );

            return (
                <Badge variant={synced ? 'default' : 'secondary'}>
                    {synced ? 'Synchronisé' : 'À synchroniser'}
                </Badge>
            );
        },
    },
    {
        id: 'status',
        accessorFn: (row) => (row.is_active ? 'active' : 'inactive'),
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Statut" />
        ),
        filterFn: (row, id, value: string[]) =>
            value.includes(String(row.getValue(id))),
        cell: ({ row }) => (
            <Badge variant={row.original.is_active ? 'default' : 'secondary'}>
                {row.original.is_active ? 'Active' : 'Inactive'}
            </Badge>
        ),
    },
    {
        id: 'actions',
        cell: ({ row }) => <RowActions plan={row.original} />,
    },
];
