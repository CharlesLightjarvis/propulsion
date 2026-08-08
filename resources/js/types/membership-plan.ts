export type GatewayResource = {
    gateway: string;
    external_id: string;
    sync_status: string;
};

export type MembershipPlanPrice = {
    id: string;
    amount_minor: number;
    currency: string;
    formatted: string;
    region: 'africa' | 'europe';
    interval: string;
    status: string;
    published_at: string | null;
    gateway_resources: GatewayResource[];
};

export type MembershipPlan = {
    id: string;
    code: string;
    slug: string;
    name: string;
    description: string | null;
    benefits: string[];
    is_active: boolean;
    prices_count: number;
    active_prices: MembershipPlanPrice[];
    prices?: MembershipPlanPrice[];
};
