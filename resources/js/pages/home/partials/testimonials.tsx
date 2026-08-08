import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const avis = [
    {
        initiales: 'SM',
        nom: 'Sarah M.',
        role: 'Entrepreneure',
        entreprise: 'Douala, Cameroun',
        contenu:
            'Grâce à l’annuaire Propulsion, j’ai trouvé mon associé technique en deux semaines. Le réseau est réel, pas juste des contacts LinkedIn qui ne répondent jamais.',
    },
    {
        initiales: 'KD',
        nom: 'Karim D.',
        role: 'Consultant indépendant',
        entreprise: 'Abidjan, Côte d’Ivoire',
        contenu:
            'Les masterclass du vendredi sont devenues un rendez-vous fixe pour moi. Contenu direct, applicable, animé par des gens qui sont vraiment sur le terrain.',
    },
    {
        initiales: 'AL',
        nom: 'Aïcha L.',
        role: 'Chercheuse d’emploi',
        entreprise: 'Yaoundé, Cameroun',
        contenu:
            'Le challenge de 7 jours m’a forcée à structurer ma recherche d’emploi au lieu de juste envoyer des CV dans le vide. J’ai décroché un entretien la semaine suivante.',
    },
    {
        initiales: 'YB',
        nom: 'Youssef B.',
        role: 'Fondateur, startup tech',
        entreprise: 'Dakar, Sénégal',
        contenu:
            'J’ai rencontré deux futurs partenaires business lors d’un Apéro Business Propulsion. Ce genre de rencontre physique change tout par rapport aux groupes WhatsApp classiques.',
    },
    {
        initiales: 'CN',
        nom: 'Céline N.',
        role: 'Salariée, secteur bancaire',
        entreprise: 'Paris, France',
        contenu:
            'Je pensais que Propulsion était réservé aux entrepreneurs. En fait, en tant que salariée, j’y trouve autant de valeur : réseau, masterclass et opportunités de reconversion.',
    },
    {
        initiales: 'MB',
        nom: 'Marc-Aurèle B.',
        role: 'Architecte',
        entreprise: 'Bafoussam, Cameroun',
        contenu:
            'Être visible dans l’annuaire m’a apporté plusieurs missions par simple recommandation d’autres membres. C’est exactement l’effet réseau qu’on nous avait promis.',
    },
] as const;

const avisLoop = [...avis, ...avis];

export default function Testimonials() {
    return (
        <section className="relative overflow-hidden py-24 md:py-32">
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute top-0 right-1/3 h-[400px] w-[400px] rounded-full bg-primary/[0.03] blur-[140px] dark:bg-primary/[0.05]" />
            </div>

            <div className="relative mx-auto max-w-7xl px-6 md:px-8 lg:px-12">
                <div className="mb-16 text-center">
                    <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-border/40 bg-secondary px-4 py-2 text-xs font-semibold tracking-[0.25em] text-secondary-foreground uppercase backdrop-blur dark:border-border/60 dark:bg-secondary">
                        Ils témoignent
                    </div>

                    <h2 className="mb-4 text-3xl font-semibold tracking-tight text-foreground md:text-5xl">
                        Des membres qui transforment leur réseau en résultats
                    </h2>

                    <p className="mx-auto max-w-xl text-lg text-foreground/60">
                        Entrepreneurs, salariés, chercheurs d'emploi et
                        professionnels : découvrez comment ils utilisent
                        Propulsion au quotidien.
                    </p>
                </div>
            </div>

            <div className="relative overflow-hidden">
                <motion.div
                    className="flex w-max gap-5 px-6 md:px-8 lg:px-12"
                    animate={{ x: ['0%', '-50%'] }}
                    transition={{
                        duration: 30,
                        ease: 'linear',
                        repeat: Infinity,
                    }}
                >
                    {avisLoop.map((temoignage, index) => (
                        <div
                            key={`${temoignage.nom}-${index}`}
                            className="flex min-h-[260px] w-[320px] shrink-0 flex-col gap-5 rounded-2xl border border-border/40 bg-background/60 p-7 backdrop-blur-sm dark:border-border/50 dark:bg-background/50"
                        >
                            <Quote
                                className="h-7 w-7 text-primary/40"
                                aria-hidden="true"
                            />

                            <p className="flex-1 text-sm leading-relaxed text-foreground/70">
                                {temoignage.contenu}
                            </p>

                            <div className="flex items-center gap-3 border-t border-border/30 pt-5">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                                    {temoignage.initiales}
                                </div>

                                <div>
                                    <div className="text-sm font-semibold text-foreground">
                                        {temoignage.nom}
                                    </div>

                                    <div className="text-xs text-foreground/50">
                                        {temoignage.role} ·{' '}
                                        {temoignage.entreprise}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
