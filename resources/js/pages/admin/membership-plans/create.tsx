import { Form, Head } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Spinner } from '@/components/ui/spinner';
import { Textarea } from '@/components/ui/textarea';
import adminRoutes from '@/routes/admin';
import membershipPlans from '@/routes/admin/membership-plans';

const markets = [
    {
        region: 'africa',
        label: 'Afrique',
        currency: 'XAF',
        placeholder: '10000',
    },
    { region: 'europe', label: 'Europe', currency: 'EUR', placeholder: '25' },
] as const;

export default function MembershipPlanCreate() {
    const [benefitCount, setBenefitCount] = useState(3);

    return (
        <>
            <Head title="Ajouter une formule" />
            <div className="container mx-auto space-y-6 p-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">
                        Ajouter une formule
                    </h1>
                    <p className="text-muted-foreground">
                        Définissez la formule et un montant pour chacun des deux
                        marchés.
                    </p>
                </div>
                <Separator />
                <div className="mx-auto max-w-3xl">
                    <Form
                        {...membershipPlans.store.form()}
                        className="space-y-10"
                    >
                        {({ processing, errors, clearErrors }) => (
                            <>
                                <section className="space-y-5">
                                    <div>
                                        <h2 className="text-lg font-semibold">
                                            Informations générales
                                        </h2>
                                        <p className="text-sm text-muted-foreground">
                                            Le code est stable et utilisé par
                                            les intégrations.
                                        </p>
                                    </div>
                                    <div className="grid gap-5 md:grid-cols-2">
                                        <div className="space-y-2">
                                            <Label htmlFor="name">Nom *</Label>
                                            <Input
                                                id="name"
                                                name="name"
                                                autoFocus
                                                placeholder="Ex : Business"
                                                onChange={() =>
                                                    clearErrors('name')
                                                }
                                            />
                                            <InputError message={errors.name} />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="code">Code *</Label>
                                            <Input
                                                id="code"
                                                name="code"
                                                placeholder="Ex : business"
                                                onChange={() =>
                                                    clearErrors('code')
                                                }
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
                                            rows={4}
                                            placeholder="À qui s'adresse cette formule ?"
                                        />
                                    </div>
                                </section>

                                <Separator />

                                <section className="space-y-5">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h2 className="text-lg font-semibold">
                                                Avantages
                                            </h2>
                                            <p className="text-sm text-muted-foreground">
                                                Présentés au membre lors de son
                                                choix.
                                            </p>
                                        </div>
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
                                    <div className="space-y-3">
                                        {Array.from(
                                            { length: benefitCount },
                                            (_, position) => (
                                                <Input
                                                    key={position}
                                                    name={`benefits[${position}]`}
                                                    placeholder={`Avantage ${position + 1}`}
                                                />
                                            ),
                                        )}
                                    </div>
                                </section>

                                <Separator />

                                <section className="space-y-5">
                                    <div>
                                        <h2 className="text-lg font-semibold">
                                            Prix par marché
                                        </h2>
                                        <p className="text-sm text-muted-foreground">
                                            Le marché impose sa devise : XAF
                                            pour toute l'Afrique, EUR pour toute
                                            l'Europe.
                                        </p>
                                    </div>
                                    <div className="divide-y rounded-md border">
                                        {markets.map((market, position) => (
                                            <div
                                                key={market.region}
                                                className="grid gap-4 p-4 md:grid-cols-3"
                                            >
                                                <div>
                                                    <p className="font-medium">
                                                        {market.label}
                                                    </p>
                                                    <p className="text-sm text-muted-foreground">
                                                        Devise imposée :{' '}
                                                        {market.currency}
                                                    </p>
                                                </div>
                                                <input
                                                    type="hidden"
                                                    name={`prices[${position}][region]`}
                                                    value={market.region}
                                                />
                                                <div className="space-y-2">
                                                    <Label>
                                                        Montant en{' '}
                                                        {market.currency} *
                                                    </Label>
                                                    <Input
                                                        name={`prices[${position}][amount]`}
                                                        type="number"
                                                        min="0.01"
                                                        step={
                                                            market.currency ===
                                                            'EUR'
                                                                ? '0.01'
                                                                : '1'
                                                        }
                                                        placeholder={
                                                            market.placeholder
                                                        }
                                                        required
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label>Périodicité *</Label>
                                                    <select
                                                        name={`prices[${position}][interval]`}
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
                                            </div>
                                        ))}
                                    </div>
                                    <InputError message={errors.prices} />
                                </section>

                                <Separator />
                                <div className="flex justify-end gap-3">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => history.back()}
                                    >
                                        Annuler
                                    </Button>
                                    <Button type="submit" disabled={processing}>
                                        {processing && (
                                            <Spinner className="mr-2" />
                                        )}
                                        Créer la formule
                                    </Button>
                                </div>
                            </>
                        )}
                    </Form>
                </div>
            </div>
        </>
    );
}

MembershipPlanCreate.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: adminRoutes.dashboard() },
        { title: 'Formules et prix', href: membershipPlans.index() },
        { title: 'Nouvelle formule', href: membershipPlans.create() },
    ],
};
