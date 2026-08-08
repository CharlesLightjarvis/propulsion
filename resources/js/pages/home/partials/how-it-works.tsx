import { motion, useReducedMotion } from 'framer-motion';
import { Check, Sparkles } from 'lucide-react';

type Step = {
    number: string;
    eyebrow: string;
    title: string;
    description: string;
    result: string;
};

const steps: Step[] = [
    {
        number: '01',
        eyebrow: 'Savoir',
        title: 'Apprendre',
        description:
            'Masterclass en direct, chroniques, documents et replays, publiés en continu.',
        result: 'Tu montes en compétence',
    },
    {
        number: '02',
        eyebrow: 'Exécution',
        title: 'Agir',
        description:
            'Challenges, missions et exercices avec un rapport à rendre à la communauté.',
        result: 'Tu passes à l’action',
    },
    {
        number: '03',
        eyebrow: 'Réseau',
        title: 'Se connecter',
        description:
            'Annuaire des membres, recherche par pays, métier et compétence.',
        result: 'Tu trouves les bonnes personnes',
    },
    {
        number: '04',
        eyebrow: 'Opportunités',
        title: 'Créer des opportunités',
        description:
            'Emplois, business, missions et partenariats partagés entre membres.',
        result: 'Ton réseau devient utile',
    },
    {
        number: '05',
        eyebrow: 'Terrain',
        title: 'Se rencontrer',
        description:
            'Apéro Business, événements et chapters locaux selon votre ville.',
        result: 'Le lien devient réel',
    },
    {
        number: '06',
        eyebrow: 'Suivi',
        title: 'Progresser',
        description:
            'Mentorat, feedback et recommandations pour tenir la cadence.',
        result: 'Tu ne restes jamais bloqué',
    },
];

export function HowItWorks() {
    const reduceMotion = useReducedMotion();

    return (
        <section className="relative overflow-hidden py-24 md:py-32">
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 overflow-hidden"
            >
                <div className="absolute top-0 left-[12%] h-[30rem] w-[30rem] rounded-full bg-primary/[0.04] blur-[150px]" />
                <div className="absolute right-[8%] bottom-0 h-[28rem] w-[28rem] rounded-full bg-primary/[0.03] blur-[150px]" />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.12)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.12)_1px,transparent_1px)] [mask-image:radial-gradient(circle_at_center,black,transparent_78%)] bg-[size:72px_72px]" />
            </div>

            <div className="relative mx-auto max-w-7xl px-6 md:px-8 lg:px-12">
                {/* En-tête */}
                <motion.div
                    initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="mb-14 grid gap-10 lg:grid-cols-[1.1fr_0.7fr] lg:items-end lg:gap-16"
                >
                    <div>
                        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/70 px-4 py-2 text-xs font-semibold tracking-[0.22em] text-muted-foreground uppercase backdrop-blur-xl">
                            <Sparkles
                                className="h-3.5 w-3.5 text-primary"
                                aria-hidden="true"
                            />
                            Comment ça marche
                        </div>

                        <h2 className="max-w-2xl text-4xl leading-[1.05] font-semibold tracking-[-0.03em] text-foreground sm:text-5xl">
                            Un moteur en six temps, pensé pour l'
                            <span className="relative inline-block">
                                exécution
                                <motion.span
                                    aria-hidden="true"
                                    initial={
                                        reduceMotion ? false : { scaleX: 0 }
                                    }
                                    whileInView={{ scaleX: 1 }}
                                    viewport={{ once: true }}
                                    transition={{
                                        duration: 0.8,
                                        delay: 0.4,
                                        ease: [0.22, 1, 0.36, 1],
                                    }}
                                    className="absolute -bottom-1 left-0 h-px w-full origin-left bg-primary/50"
                                />
                            </span>
                            .
                        </h2>
                    </div>

                    <div>
                        <div className="mb-4 flex items-center gap-4">
                            <span className="h-px w-10 bg-primary/50" />
                            <span className="text-xs font-semibold tracking-[0.18em] text-muted-foreground uppercase">
                                Un parcours clair
                            </span>
                        </div>
                        <p className="text-base leading-7 text-muted-foreground">
                            Chaque membre suit le même parcours : apprendre,
                            passer à l'action, se connecter aux bonnes personnes
                            et transformer tout ça en résultats concrets.
                        </p>
                    </div>
                </motion.div>

                {/* Timeline numérotée */}
                <div className="border-t border-border/60">
                    <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-y-14">
                        {steps.map((step, index) => (
                            <motion.article
                                key={step.title}
                                initial={
                                    reduceMotion ? false : { opacity: 0, y: 24 }
                                }
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.35 }}
                                transition={{
                                    duration: 0.55,
                                    delay: (index % 3) * 0.1,
                                    ease: [0.22, 1, 0.36, 1],
                                }}
                                className="group relative pt-8"
                            >
                                <div
                                    aria-hidden="true"
                                    className="absolute top-0 left-0 h-px w-10 bg-border transition-all duration-300 group-hover:w-16 group-hover:bg-primary"
                                />

                                <div className="mb-5 flex items-center gap-3">
                                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-border/70 bg-background font-mono text-sm font-semibold text-foreground/70 transition-all duration-300 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
                                        {step.number}
                                    </span>
                                    <span className="text-[0.65rem] font-semibold tracking-[0.18em] text-muted-foreground uppercase">
                                        {step.eyebrow}
                                    </span>
                                </div>

                                <h3 className="mb-2 text-xl font-semibold tracking-[-0.01em] text-foreground">
                                    {step.title}
                                </h3>

                                <p className="mb-4 text-sm leading-6 text-muted-foreground">
                                    {step.description}
                                </p>

                                <div className="flex items-center gap-2 text-sm font-medium text-foreground/70">
                                    <Check
                                        className="h-4 w-4 text-primary"
                                        aria-hidden="true"
                                    />
                                    {step.result}
                                </div>
                            </motion.article>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
