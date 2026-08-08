import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import { useState } from 'react';

const questions = [
    {
        question: 'Propulsion, c’est réservé aux entrepreneurs ?',
        reponse:
            'Non. La communauté s’adresse aux étudiants, salariés, chercheurs d’emploi, entrepreneurs et professionnels de toutes disciplines qui veulent développer leur réseau, leurs compétences et leurs opportunités.',
    },
    {
        question: 'Comment rejoindre la communauté ?',
        reponse:
            'Créez votre compte, choisissez votre formule (Standard ou Pro/Élite) et accédez immédiatement à la communauté, à l’annuaire des membres et aux prochaines masterclass.',
    },
    {
        question: 'À quelle fréquence ont lieu les masterclass ?',
        reponse:
            'Chaque vendredi de 20h à 22h, heure du Cameroun, animées par Dr Claudel Noubissie et des experts invités selon les sujets : négociation, vente, réseau, résilience entrepreneuriale...',
    },
    {
        question: 'Qu’est-ce qu’un Challenge Propulsion ?',
        reponse:
            'Un programme d’action sur 7 jours avec des missions concrètes à réaliser et un rapport à envoyer. L’objectif : passer de la théorie à l’exécution, avec du feedback de la communauté.',
    },
    {
        question: 'Comment fonctionne l’annuaire des membres ?',
        reponse:
            'Vous pouvez rechercher des membres par pays, métier ou compétence pour entrer en contact. Vos coordonnées restent sous votre contrôle : vous choisissez ce que vous rendez visible aux autres membres.',
    },
    {
        question: 'Les rencontres physiques sont-elles obligatoires ?',
        reponse:
            'Non, elles sont optionnelles. Des rencontres comme les Apéro Business ont lieu environ une fois par mois selon les villes et pays où la communauté est active.',
    },
    {
        question: 'Quelle est la différence entre Standard et Pro/Élite ?',
        reponse:
            'La formule Standard donne accès à toute la communauté, l’annuaire et les masterclass. Les formules Pro/Élite ajoutent un accompagnement individuel : appel vidéo, diagnostic et suivi personnalisé.',
    },
    {
        question: 'Comment sont utilisées mes données de contact ?',
        reponse:
            'Votre profil reste sous votre contrôle : c’est vous qui décidez ce qui est visible dans l’annuaire, et vous pouvez à tout moment limiter ou retirer l’accès à vos coordonnées.',
    },
] as const;

export default function FAQ() {
    const [ouvert, setOuvert] = useState<number | null>(null);

    return (
        <section className="relative bg-muted/30 py-24 md:py-32 dark:bg-foreground/[0.02]">
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute bottom-0 left-1/2 h-[380px] w-[380px] -translate-x-1/2 rounded-full bg-foreground/[0.02] blur-[130px] dark:bg-foreground/[0.04]" />
            </div>

            <div className="relative mx-auto max-w-3xl px-6 md:px-8 lg:px-12">
                {/* en-tête */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="mb-14 text-center"
                >
                    <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-border/40 bg-secondary px-4 py-2 text-xs font-semibold tracking-[0.25em] text-secondary-foreground uppercase backdrop-blur dark:border-border/60 dark:bg-secondary">
                        Questions fréquentes
                    </div>

                    <h2 className="mb-4 text-3xl font-semibold tracking-tight text-foreground md:text-5xl">
                        Toutes vos questions, répondues
                    </h2>

                    <p className="mx-auto max-w-xl text-lg text-foreground/60">
                        Retrouvez les réponses aux questions les plus fréquentes
                        sur la communauté, les masterclass et le fonctionnement
                        de Propulsion.
                    </p>
                </motion.div>

                {/* accordéon */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.15 }}
                    className="flex flex-col gap-3"
                >
                    {questions.map((item, index) => (
                        <div
                            key={index}
                            className="overflow-hidden rounded-2xl border border-border/40 bg-background/60 backdrop-blur-sm dark:border-border/50 dark:bg-background/50"
                        >
                            <button
                                type="button"
                                onClick={() =>
                                    setOuvert(ouvert === index ? null : index)
                                }
                                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                                aria-expanded={ouvert === index}
                            >
                                <span className="text-sm font-semibold text-foreground md:text-base">
                                    {item.question}
                                </span>

                                <span
                                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border/40 bg-background/60 text-foreground/60 transition-transform duration-300 dark:border-border/50 dark:bg-background/40 ${
                                        ouvert === index ? 'rotate-45' : ''
                                    }`}
                                    aria-hidden="true"
                                >
                                    <Plus className="h-4 w-4" />
                                </span>
                            </button>

                            <AnimatePresence initial={false}>
                                {ouvert === index && (
                                    <motion.div
                                        key="content"
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{
                                            duration: 0.3,
                                            ease: 'easeInOut',
                                        }}
                                    >
                                        <div className="border-t border-border/30 px-6 pt-4 pb-5 text-sm leading-relaxed text-foreground/60">
                                            {item.reponse}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
