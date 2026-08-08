import { motion, useReducedMotion } from 'framer-motion';
import {
    Users,
    BookOpen,
    Handshake,
    Calendar,
    FileText,
    MessageCircle,
    MapPin,
    Briefcase,
    Zap,
} from 'lucide-react';

const features = [
    {
        icon: Users,
        title: 'Communauté active',
        detail: 'Accès à la communauté Propulsion et à l’entraide entre membres',
    },
    {
        icon: BookOpen,
        title: 'Annuaire des membres',
        detail: 'Base de contacts filtrable par pays, compétence et métier',
    },
    {
        icon: Handshake,
        title: 'Networking',
        detail: 'Mise en relation directe avec d’autres professionnels',
    },
    {
        icon: Calendar,
        title: 'Masterclass hebdomadaire',
        detail: 'Chaque vendredi, 20h–22h (heure du Cameroun)',
    },
    {
        icon: FileText,
        title: 'Contenus & chroniques',
        detail: 'Ressources terrain publiées régulièrement',
    },
    {
        icon: MessageCircle,
        title: 'Questions / réponses',
        detail: 'Échanges directs et entraide sur vos sujets',
    },
    {
        icon: MapPin,
        title: 'Rencontres physiques',
        detail: 'Apéro Business et événements locaux selon les pays',
    },
    {
        icon: Briefcase,
        title: 'Accès aux opportunités',
        detail: 'Recommandations, collaborations, visibilité, affaires',
    },
] as const;

export function Offer() {
    const reduceMotion = useReducedMotion();

    return (
        <section className="relative bg-muted/30 py-24 md:py-32 dark:bg-foreground/[0.02]">
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute top-1/2 right-0 h-[420px] w-[420px] -translate-y-1/2 rounded-full bg-primary/[0.04] blur-[150px] dark:bg-primary/[0.07]" />
            </div>

            <div className="relative mx-auto max-w-7xl px-6 md:px-8 lg:px-12">
                <motion.div
                    initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="mb-14 grid items-end gap-10 lg:grid-cols-[1.1fr_0.7fr] lg:gap-16"
                >
                    <div>
                        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/70 px-4 py-2 text-xs font-semibold tracking-[0.22em] text-muted-foreground uppercase backdrop-blur-xl">
                            <Zap
                                className="h-3.5 w-3.5 text-primary"
                                aria-hidden="true"
                            />
                            Ce que vous obtenez
                        </div>

                        <h2 className="max-w-xl text-4xl leading-[1.05] font-semibold tracking-[-0.03em] text-foreground sm:text-5xl">
                            Tout l'écosystème, dès le premier jour
                        </h2>
                    </div>

                    <div>
                        <div className="mb-4 flex items-center gap-4">
                            <span className="h-px w-10 bg-primary/50" />
                            <span className="text-xs font-semibold tracking-[0.18em] text-muted-foreground uppercase">
                                Formule Standard
                            </span>
                        </div>
                        <p className="mb-4 text-base leading-7 text-muted-foreground">
                            Savoir, réseau, exécution et opportunités :
                            l'ensemble de l'écosystème Propulsion, accessible
                            dès votre inscription.
                        </p>
                        <div className="inline-flex items-baseline gap-2 rounded-full border border-border/60 bg-background/70 px-4 py-2 backdrop-blur-xl">
                            <span className="text-lg font-semibold text-foreground">
                                10 000 FCFA
                            </span>
                            <span className="text-xs text-muted-foreground">
                                / 12 mois · 25 € hors Cameroun
                            </span>
                        </div>
                    </div>
                </motion.div>

                <div className="divide-y divide-border/60 border-t border-border/60 sm:grid sm:grid-cols-2 sm:gap-x-10 sm:divide-y-0 lg:grid-cols-4">
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            initial={
                                reduceMotion ? false : { opacity: 0, y: 20 }
                            }
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.4 }}
                            transition={{
                                duration: 0.5,
                                delay: (index % 4) * 0.06,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                            className="group flex items-start gap-4 py-5 sm:border-t sm:border-border/60 sm:py-6"
                        >
                            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border/60 text-foreground/60 transition-colors duration-300 group-hover:border-primary group-hover:text-primary">
                                <feature.icon
                                    className="h-4.5 w-4.5"
                                    aria-hidden="true"
                                />
                            </span>

                            <div className="min-w-0">
                                <div className="text-sm font-semibold text-foreground">
                                    {feature.title}
                                </div>
                                <div className="mt-0.5 text-xs leading-relaxed text-foreground/60">
                                    {feature.detail}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
