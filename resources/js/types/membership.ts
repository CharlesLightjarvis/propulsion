export type PlanPrice = {
    id: string;
    formatted: string;
};

export type Plan = {
    code: string;
    name: string;
    description: string | null;
    benefits: string[];
    prices: {
        africa?: PlanPrice;
        europe?: PlanPrice;
    };
};
