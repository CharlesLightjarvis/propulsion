<?php

namespace Database\Seeders;

use App\Actions\Billing\PublishPlanPrice;
use App\Enums\BillingRegion;
use App\Enums\Gateway;
use App\Models\MembershipPlan;
use Illuminate\Database\Seeder;

class MembershipPlanSeeder extends Seeder
{
    public function run(PublishPlanPrice $publishPlanPrice): void
    {
        $plans = [
            'standard' => [
                'name' => 'Propulsion Standard',
                'description' => "L'essentiel pour rejoindre la communauté et passer à l'action.",
                'benefits' => [
                    'Accès à la communauté & à l’annuaire',
                    'Masterclass en ligne chaque vendredi',
                    'Contenus et chroniques',
                    'Entraide et questions/réponses',
                    'Rencontres physiques selon votre pays',
                    'Accès aux opportunités partagées',
                ],
                'order' => 1,
                'prices' => [[10000, BillingRegion::Africa], [2500, BillingRegion::Europe]],
            ],
            'pro' => [
                'name' => 'Propulsion Pro',
                'description' => 'Un accompagnement individuel pour accélérer vos résultats.',
                'benefits' => [
                    'Tous les avantages Propulsion Standard',
                    'Annuaire des membres & recommandations prioritaires',
                    'Visibilité renforcée dans la communauté',
                    'Appel de diagnostic personnalisé',
                    'Formations approfondies',
                    'Possibilité d’animer une masterclass',
                ],
                'order' => 2,
                'prices' => [[50000, BillingRegion::Africa], [10000, BillingRegion::Europe]],
            ],
            'elite' => [
                'name' => 'Propulsion Élite',
                'description' => 'Un accompagnement approfondi pour les membres les plus ambitieux.',
                'benefits' => [
                    'Tous les avantages Propulsion Pro',
                    'Accompagnement stratégique renforcé',
                    'Accès prioritaire aux opportunités',
                    'Visibilité premium & canal privé',
                    'Podcast et vidéo promotionnelle',
                ],
                'order' => 3,
                'prices' => [[250000, BillingRegion::Africa], [50000, BillingRegion::Europe]],
            ],
        ];

        foreach ($plans as $code => $attributes) {
            $plan = MembershipPlan::query()->updateOrCreate(
                ['code' => $code],
                [
                    'name' => $attributes['name'],
                    'description' => $attributes['description'],
                    'benefits' => $attributes['benefits'],
                    'display_order' => $attributes['order'],
                    'is_active' => true,
                ],
            );

            foreach ($attributes['prices'] as [$amount, $region]) {
                $publishPlanPrice->handle($plan, $amount, $region, 'year', Gateway::Stripe);
            }
        }
    }
}
