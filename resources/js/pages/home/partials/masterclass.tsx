import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const sessions = [
    {
        titre: 'L’art de rebondir après un échec',
        date: '6 février 2026',
        image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=70',
    },
    {
        titre: 'Les opportunités dans l’industrie de la beauté',
        date: '19 décembre 2025',
        image: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=800&q=70',
    },
    {
        titre: 'Négocier : contrats, prix, équipe et partenariats',
        date: 'Replay disponible',
        image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=70',
    },
    {
        titre: 'Vendre quand on n’est pas encore connu',
        date: 'Replay disponible',
        image: 'https://images.unsplash.com/photo-1560439514-4e9645039924?auto=format&fit=crop&w=800&q=70',
    },
] as const;

export function Masterclass() {
    return (
        <section className="relative overflow-hidden py-24 md:py-32">
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute bottom-0 left-1/4 h-[380px] w-[380px] rounded-full bg-primary/[0.03] blur-[140px] dark:bg-primary/[0.06]" />
            </div>

            <div className="relative mx-auto max-w-7xl px-6 md:px-8 lg:px-12">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="mb-12 text-center"
                >
                    <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-border/40 bg-secondary px-4 py-2 text-xs font-semibold tracking-[0.25em] text-secondary-foreground uppercase backdrop-blur dark:border-border/60 dark:bg-secondary">
                        Masterclass Propulsion
                    </div>

                    <h2 className="mb-4 text-3xl font-semibold tracking-tight text-foreground md:text-5xl">
                        Une masterclass en direct, chaque vendredi
                    </h2>

                    <p className="mx-auto max-w-xl text-lg text-foreground/60">
                        Animées par Dr Claudel Noubissie et des experts invités
                        selon les sujets — du contenu terrain, directement
                        applicable.
                    </p>
                </motion.div>

                {/* Carte événement — prochaine session */}
                <motion.div
                    initial={{ opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.75 }}
                    className="relative mb-8 overflow-hidden rounded-3xl border border-border/40"
                >
                    <div className="relative aspect-[16/9] w-full sm:aspect-[21/9]">
                        <img
                            src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1600&q=75"
                            alt="Masterclass Propulsion en session, intervenant face à un public assis"
                            loading="lazy"
                            className="absolute inset-0 h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10" />

                        <div className="absolute top-5 left-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold tracking-[0.2em] text-white uppercase backdrop-blur-md">
                            <span className="h-2 w-2 rounded-full bg-emerald-400" />
                            Prochaine session
                        </div>

                        <div className="absolute inset-x-0 bottom-0 flex flex-col gap-4 p-6 sm:flex-row sm:items-end sm:justify-between sm:p-8">
                            <div>
                                <div className="mb-3 flex flex-wrap gap-2">
                                    <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md">
                                        <Calendar
                                            className="h-3.5 w-3.5"
                                            aria-hidden="true"
                                        />
                                        Chaque vendredi
                                    </span>
                                    <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md">
                                        <Clock
                                            className="h-3.5 w-3.5"
                                            aria-hidden="true"
                                        />
                                        20h – 22h (Cameroun)
                                    </span>
                                </div>

                                <h3 className="mb-3 max-w-lg text-xl font-semibold text-white md:text-2xl">
                                    Vendre, négocier et rebondir : la
                                    masterclass de la semaine
                                </h3>

                                <div className="flex items-center gap-2.5">
                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground ring-2 ring-white/30">
                                        CN
                                    </div>
                                    <div className="text-sm text-white/80">
                                        <span className="font-medium text-white">
                                            Dr Claudel Noubissie
                                        </span>{' '}
                                        · Fondateur Propulsion
                                    </div>
                                </div>
                            </div>

                            <Button className="w-full shrink-0 gap-2 rounded-full bg-white text-black hover:bg-white/90 sm:w-auto">
                                Réserver ma place
                                <ArrowUpRight
                                    className="h-4 w-4"
                                    aria-hidden="true"
                                />
                            </Button>
                        </div>
                    </div>
                </motion.div>

                {/* Replays — bande de sessions passées */}
                <div className="-mx-6 flex snap-x [scrollbar-width:none] gap-4 overflow-x-auto px-6 pb-2 [-ms-overflow-style:none] md:mx-0 md:grid md:grid-cols-4 md:gap-5 md:overflow-visible md:px-0 [&::-webkit-scrollbar]:hidden">
                    {sessions.map((session, index) => (
                        <motion.div
                            key={session.titre}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.08 }}
                            className="group relative aspect-[4/5] w-[220px] shrink-0 snap-start overflow-hidden rounded-2xl border border-border/40 sm:w-auto"
                        >
                            <img
                                src={session.image}
                                alt=""
                                aria-hidden="true"
                                loading="lazy"
                                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                            <div className="absolute inset-x-0 bottom-0 p-4">
                                <div className="mb-2 text-[11px] font-semibold tracking-[0.15em] text-white/70 uppercase">
                                    {session.date}
                                </div>
                                <div className="text-sm leading-snug font-semibold text-white">
                                    {session.titre}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
