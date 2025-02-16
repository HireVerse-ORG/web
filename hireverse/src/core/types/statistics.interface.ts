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

export interface CompanyJobStatistics {
    jobPosted: number,
    jobPostTrend: { month: string; count: number }[]
}

export interface CompanyJobApplicationStatistics {
    joApplications: number,
    jobApplicationTrend: { month: string; count: number }[]
}