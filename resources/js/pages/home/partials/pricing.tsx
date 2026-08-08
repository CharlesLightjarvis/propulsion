import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import checkout from '@/routes/billing/checkout';
import type { Plan } from '@/types';

export function Pricing({ plans }: { plans: Plan[] }) {
    return (
        <section
            id="pricing"
            className="relative bg-muted/30 py-24 md:py-32 dark:bg-foreground/[0.02]"
        >
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute top-1/2 left-1/2 h-[480px] w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/[0.04] blur-[160px] dark:bg-primary/[0.07]" />
            </div>

            <div className="relative mx-auto max-w-7xl px-6 md:px-8 lg:px-12">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="mb-14 text-center"
                >
                    <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-border/40 bg-secondary px-4 py-2 text-xs font-semibold tracking-[0.25em] text-secondary-foreground uppercase backdrop-blur dark:border-border/60 dark:bg-secondary">
                        Rejoindre Propulsion
                    </div>

                    <h2 className="mx-auto mb-4 max-w-2xl text-3xl font-semibold tracking-tight text-foreground md:text-5xl">
                        Une formule pour chaque étape de votre parcours
                    </h2>

                    <p className="mx-auto max-w-xl text-lg text-foreground/60">
                        Adhésion annuelle. Tarifs Cameroun et international.
                    </p>
                </motion.div>

                <div className="grid gap-6 lg:grid-cols-3">
                    {plans.map((plan, index) => {
                        const featured = plan.code === 'pro';

                        return (
                            <motion.div
                                key={plan.code}
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{
                                    duration: 0.5,
                                    delay: index * 0.1,
                                }}
                                className={cn(
                                    'relative flex flex-col rounded-2xl border p-8 backdrop-blur-sm transition-all duration-300',
                                    featured
                                        ? 'border-primary bg-background/60 dark:bg-background/50'
                                        : 'border-border/40 bg-background/60 hover:border-border/60 dark:border-border/50 dark:bg-background/50',
                                )}
                            >
                                {featured && (
                                    <Badge className="absolute -top-3 left-8 bg-primary text-primary-foreground">
                                        Le plus choisi
                                    </Badge>
                                )}

                                <h3 className="mb-1 text-xl font-semibold text-foreground">
                                    {plan.name}
                                </h3>
                                <p className="mb-6 text-sm text-foreground/60">
                                    {plan.description}
                                </p>

                                <div className="mb-6 flex items-baseline gap-2">
                                    <span className="text-3xl font-semibold text-foreground">
                                        {plan.prices.europe?.formatted ?? '—'}
                                    </span>
                                    <span className="text-sm text-foreground/50">
                                        / 12 mois
                                    </span>
                                </div>

                                <ul className="mb-8 flex flex-1 flex-col gap-3">
                                    {plan.benefits.map((benefit) => (
                                        <li
                                            key={benefit}
                                            className="flex items-start gap-2 text-sm text-foreground/80"
                                        >
                                            <Check
                                                className="mt-0.5 h-4 w-4 shrink-0 text-primary"
                                                aria-hidden="true"
                                            />
                                            {benefit}
                                        </li>
                                    ))}
                                </ul>

                                <div className="flex flex-col gap-2">
                                    <Button
                                        size="lg"
                                        variant={
                                            featured ? 'default' : 'outline'
                                        }
                                        className="rounded-full"
                                        asChild
                                        disabled={!plan.prices.europe}
                                    >
                                        <Link
                                            href={
                                                plan.prices.europe
                                                    ? checkout.redirect(
                                                          plan.prices.europe.id,
                                                      ).url
                                                    : '#'
                                            }
                                        >
                                            Rejoindre —{' '}
                                            {plan.prices.europe?.formatted ??
                                                '—'}
                                        </Link>
                                    </Button>

                                    <Button
                                        size="lg"
                                        variant="ghost"
                                        disabled
                                        className="cursor-not-allowed rounded-full opacity-60"
                                        title="Paiement Afrique bientôt disponible"
                                    >
                                        {plan.prices.africa?.formatted ?? '—'} —
                                        Paiement Afrique bientôt disponible
                                    </Button>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
