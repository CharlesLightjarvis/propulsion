import { Head } from '@inertiajs/react';
import type { Plan } from '@/types';
import { Chiffres } from './partials/chiffres';
import { Cta } from './partials/cta';
import FAQ from './partials/faq';
import { Hero } from './partials/hero';
import { HowItWorks } from './partials/how-it-works';
import { Masterclass } from './partials/masterclass';
import { Offer } from './partials/offer';
import { Pricing } from './partials/pricing';
import Testimonials from './partials/testimonials';

export default function Home({ plans }: { plans: Plan[] }) {
    return (
        <>
            <Head title="Home" />
            <Hero />
            <HowItWorks />
            <Masterclass />
            <Offer />
            <Chiffres />
            <Testimonials />
            <Pricing plans={plans} />
            <FAQ />
            <Cta />
        </>
    );
}
