import { motion  } from 'framer-motion';
import type {Variants} from 'framer-motion';

const stats = [
    {
        value: '1 000+',
        label: 'Membres actifs',
        detail: 'Étudiants, salariés, entrepreneurs, professionnels',
    },
    {
        value: '50+',
        label: 'Pays représentés',
        detail: 'Afrique et diaspora',
    },
    {
        value: '1',
        label: 'Masterclass par semaine',
        detail: 'Chaque vendredi, 20h–22h (Cameroun)',
    },
    {
        value: '7',
        label: 'Jours par challenge',
        detail: 'Missions et rapports terrain',
    },
    {
        value: '1x/mois',
        label: 'Rencontres physiques',
        detail: 'Apéro Business & chapters locaux',
    },
    {
        value: '100 %',
        label: 'Accès à l’annuaire',
        detail: 'Recherche de membres par pays et métier',
    },
] as const;

const containerVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.09 } },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, scale: 0.92 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.55, ease: 'easeOut' },
    },
};

export function Chiffres() {
    return (
        <section className="relative bg-muted/30 py-24 md:py-32 dark:bg-foreground/[0.02]">
            {/* blobs décoratifs */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/[0.04] blur-[160px] dark:bg-primary/[0.07]" />
            </div>

            <div className="relative mx-auto max-w-7xl px-6 md:px-8 lg:px-12">
                {/* en-tête */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="mb-16 text-center"
                >
                    <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-border/40 bg-secondary px-4 py-2 text-xs font-semibold tracking-[0.25em] text-secondary-foreground uppercase backdrop-blur dark:border-border/60 dark:bg-secondary">
                        En chiffres
                    </div>

                    <h2 className="mb-4 text-3xl font-semibold tracking-tight text-foreground md:text-5xl">
                        Une communauté panafricaine en pleine croissance
                    </h2>

                    <p className="mx-auto max-w-xl text-lg text-foreground/60">
                        Des membres engagés, du contenu terrain chaque semaine
                        et des opportunités concrètes réunis sur une seule
                        plateforme dédiée au réseau et à l'exécution.
                    </p>
                </motion.div>

                {/* grille de stats */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-80px' }}
                    className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
                >
                    {stats.map((stat) => (
                        <motion.div
                            key={stat.label}
                            variants={itemVariants}
                            className="rounded-2xl border border-border/40 bg-background/60 p-8 text-center backdrop-blur-sm dark:border-border/50 dark:bg-background/50"
                        >
                            <div className="mb-1 text-5xl font-semibold tracking-tight text-foreground md:text-6xl">
                                {stat.value}
                            </div>

                            <div className="mt-3 text-base font-medium text-foreground/80">
                                {stat.label}
                            </div>

                            <div className="mt-1 text-xs tracking-[0.2em] text-foreground/40 uppercase">
                                {stat.detail}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
