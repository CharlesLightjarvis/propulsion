import { Form, Head } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import InputError from '@/components/input-error';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Spinner } from '@/components/ui/spinner';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import adminRoutes from '@/routes/admin';
import membershipPlans from '@/routes/admin/membership-plans';
import prices from '@/routes/admin/membership-plans/prices';
import type { MembershipPlan, MembershipPlanPrice } from '@/types';

function regionLabel(region: MembershipPlanPrice['region']): string {
    return region === 'africa' ? 'Afrique' : 'Europe';
}

export default function MembershipPlanEdit({ plan }: { plan: MembershipPlan }) {
    const [benefitCount, setBenefitCount] = useState(
        Math.max(1, plan.benefits.length),
    );
    const [region, setRegion] = useState<'africa' | 'europe'>('africa');
    const planPrices = plan.prices ?? [];

    return (
        <>
            <Head title={`Modifier ${plan.name}`} />
            <div className="container mx-auto space-y-8 p-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">
                        {plan.name}
                    </h1>
                    <p className="text-muted-foreground">
                        Modifiez la présentation et publiez de nouvelles
                        versions de prix.
                    </p>
                </div>
                <Separator />
                <div className="mx-auto max-w-4xl space-y-12">
                    <Form
                        {...membershipPlans.update.form(plan.id)}
                        className="space-y-6"
                    >
                        {({ processing, errors }) => (
                            <>
                                <div>
                                    <h2 className="text-lg font-semibold">
                                        Informations de la formule
                                    </h2>
                                    <p className="text-sm text-muted-foreground">
                                        Identité, avantages et visibilité auprès
                                        des membres.
                                    </p>
                                </div>
                                <div className="grid gap-5 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Nom *</Label>
                                        <Input
                                            id="name"
                                            name="name"
                                            defaultValue={plan.name}
                                        />
                                        <InputError message={errors.name} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="code">Code *</Label>
                                        <Input
                                            id="code"
                                            name="code"
                                            defaultValue={plan.code}
                                        />
                                        <InputError message={errors.code} />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="description">
                                        Description
                                    </Label>
                                    <Textarea
                                        id="description"
                                        name="description"
                                        defaultValue={plan.description ?? ''}
                                        rows={4}
                                    />
                                </div>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <Label>Avantages</Label>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            onClick={() =>
                                                setBenefitCount(
                                                    (count) => count + 1,
                                                )
                                            }
                                        >
                                            <Plus className="mr-1 size-4" />
                                            Ajouter
                                        </Button>
                                    </div>
                                    {Array.from(
                                        { length: benefitCount },
                                        (_, position) => (
                                            <Input
                                                key={position}
                                                name={`benefits[${position}]`}
                                                defaultValue={
                                                    plan.benefits[position] ??
                                                    ''
                                                }
                                                placeholder={`Avantage ${position + 1}`}
                                            />
                                        ),
                                    )}
                                </div>
                                <label className="flex items-center gap-3 text-sm">
                                    <input
                                        type="hidden"
                                        name="is_active"
                                        value="0"
                                    />
                                    <input
                                        type="checkbox"
                                        name="is_active"
                                        value="1"
                                        defaultChecked={plan.is_active}
                                        className="size-4 rounded border-input"
                                    />
                                    Formule active et visible par les membres
                                </label>
                                <div className="flex justify-end">
                                    <Button type="submit" disabled={processing}>
                                        {processing && (
                                            <Spinner className="mr-2" />
                                        )}
                                        Enregistrer
                                    </Button>
                                </div>
                            </>
                        )}
                    </Form>

                    <Separator />

                    <section className="space-y-5">
                        <div>
                            <h2 className="text-lg font-semibold">
                                Publier un nouveau prix
                            </h2>
                            <p className="text-sm text-muted-foreground">
                                Choisissez uniquement le marché : la devise est
                                attribuée automatiquement.
                            </p>
                        </div>
                        <Form
                            {...prices.store.form(plan.id)}
                            className="grid gap-4 md:grid-cols-3"
                        >
                            {({ processing, errors }) => (
                                <>
                                    <div className="space-y-2">
                                        <Label>Marché *</Label>
                                        <select
                                            name="region"
                                            value={region}
                                            onChange={(event) =>
                                                setRegion(
                                                    event.target.value as
                                                        'africa' | 'europe',
                                                )
                                            }
                                            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm"
                                        >
                                            <option value="africa">
                                                Afrique — XAF
                                            </option>
                                            <option value="europe">
                                                Europe — EUR
                                            </option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label>
                                            Montant en{' '}
                                            {region === 'africa'
                                                ? 'XAF'
                                                : 'EUR'}{' '}
                                            *
                                        </Label>
                                        <Input
                                            name="amount"
                                            type="number"
                                            min="0.01"
                                            step={
                                                region === 'africa'
                                                    ? '1'
                                                    : '0.01'
                                            }
                                            placeholder={
                                                region === 'africa'
                                                    ? '10000'
                                                    : '25'
                                            }
                                        />
                                        <InputError message={errors.amount} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Périodicité</Label>
                                        <select
                                            name="interval"
                                            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm"
                                        >
                                            <option value="year">
                                                Annuelle
                                            </option>
                                            <option value="month">
                                                Mensuelle
                                            </option>
                                        </select>
                                    </div>
                                    <div className="flex justify-end md:col-span-3">
                                        <Button
                                            type="submit"
                                            disabled={processing}
                                        >
                                            {processing && (
                                                <Spinner className="mr-2" />
                                            )}
                                            Publier le prix
                                        </Button>
                                    </div>
                                </>
                            )}
                        </Form>
                    </section>

                    <Separator />

                    <section className="space-y-5">
                        <div>
                            <h2 className="text-lg font-semibold">
                                Historique des prix
                            </h2>
                            <p className="text-sm text-muted-foreground">
                                Toutes les versions sont conservées pour
                                l'intégrité financière.
                            </p>
                        </div>
                        <div className="overflow-hidden rounded-md border">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Marché</TableHead>
                                        <TableHead>Montant</TableHead>
                                        <TableHead>Périodicité</TableHead>
                                        <TableHead>Statut</TableHead>
                                        <TableHead>Stripe</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {planPrices.map((price) => (
                                        <TableRow key={price.id}>
                                            <TableCell>
                                                {regionLabel(price.region)}
                                            </TableCell>
                                            <TableCell className="font-medium">
                                                {price.formatted}
                                            </TableCell>
                                            <TableCell>
                                                {price.interval === 'year'
                                                    ? 'Annuelle'
                                                    : 'Mensuelle'}
                                            </TableCell>
                                            <TableCell>
                                                <Badge
                                                    variant={
                                                        price.status ===
                                                        'active'
                                                            ? 'default'
                                                            : 'secondary'
                                                    }
                                                >
                                                    {price.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant="outline">
                                                    {price.gateway_resources.some(
                                                        (resource) =>
                                                            resource.gateway ===
                                                            'stripe',
                                                    )
                                                        ? 'Synchronisé'
                                                        : 'En attente'}
                                                </Badge>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
}

MembershipPlanEdit.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: adminRoutes.dashboard() },
        { title: 'Formules et prix', href: membershipPlans.index() },
        { title: 'Modifier la formule', href: membershipPlans.index() },
    ],
};
