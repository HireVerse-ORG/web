export type SeekerSubscriptioPlan = "free" | "basic" | "premium";

export interface ISeekerSubscription {
    plan: SeekerSubscriptioPlan;
    jobApplicationsPerMonth: number;
    canMessageAllSeekers: boolean;
    canMessageOnlySeekers: boolean;
}

export interface ISeekerSubscriptionUsage {
    jobApplicationsUsed: number;
    lastUpdated: Date;
}
