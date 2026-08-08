import { Head, usePage } from '@inertiajs/react';
import adminRoutes from '@/routes/admin';
import membershipPlans from '@/routes/admin/membership-plans';
import type { MembershipPlan, Paginated } from '@/types';
import MembershipPlanList from './partials/membership-plan-list';

export default function MembershipPlansIndex() {
    const { plans } = usePage<{ plans: Paginated<MembershipPlan> }>().props;

    return (
        <>
            <Head title="Formules et prix" />
            <div className="flex h-full flex-1 flex-col gap-6 p-4">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Formules et prix
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Gérez le catalogue Propulsion et sa synchronisation avec
                        les moyens de paiement.
                    </p>
                </div>
                <MembershipPlanList plans={plans} />
            </div>
        </>
    );
}

MembershipPlansIndex.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: adminRoutes.dashboard() },
        { title: 'Formules et prix', href: membershipPlans.index() },
    ],
};
