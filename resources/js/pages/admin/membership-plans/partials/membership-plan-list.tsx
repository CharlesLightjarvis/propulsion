import { router } from '@inertiajs/react';
import { useMemo } from 'react';
import { DataTable } from '@/components/data-table';
import { Button } from '@/components/ui/button';
import membershipPlans from '@/routes/admin/membership-plans';
import type { MembershipPlan, Paginated } from '@/types';
import { createColumns, PLAN_STATUS_OPTIONS } from './columns';

export default function MembershipPlanList({
    plans,
}: {
    plans: Paginated<MembershipPlan>;
}) {
    const columns = useMemo(() => createColumns(), []);
    const previous = plans.links[0]?.url;
    const next = plans.links[plans.links.length - 1]?.url;

    return (
        <div className="space-y-4">
            <DataTable
                columns={columns}
                data={plans.data}
                searchFilter={{
                    columnIds: ['name', 'code'],
                    placeholder: 'Rechercher une formule...',
                }}
                facetedFilters={[
                    {
                        columnId: 'status',
                        title: 'Statut',
                        options: PLAN_STATUS_OPTIONS,
                    },
                ]}
                actionButton={{
                    label: 'Ajouter une formule',
                    onClick: () => router.visit(membershipPlans.create()),
                }}
                enablePagination={false}
            />
            {plans.last_page > 1 && (
                <div className="flex items-center justify-end gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        disabled={!previous}
                        onClick={() => previous && router.visit(previous)}
                    >
                        Précédent
                    </Button>
                    <span className="text-sm text-muted-foreground">
                        Page {plans.current_page} / {plans.last_page}
                    </span>
                    <Button
                        variant="outline"
                        size="sm"
                        disabled={!next}
                        onClick={() => next && router.visit(next)}
                    >
                        Suivant
                    </Button>
                </div>
            )}
        </div>
    );
}
