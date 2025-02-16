export interface UserStatistics {
    total: number;
    monthlyGrowth: Array<{ month: string; count: number }>;
}

export interface SubscriptionStatistics {
    userSubscriptions: number;
    companySubscriptions: number;
    totalSubscriptions: number;
}

export interface RevenueStatistics {
    monthRevenue: number;
    yearlyOverview: { month: string; revenue: number }[];
}