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

export type CompanySubscriptioPlan = "free" | "basic" | "premium";

export interface ICompanySubscription {
    plan: CompanySubscriptioPlan;
    jobPostLimit: number;
    resumeAccessLimit: number; 
    profileAccessLimit: number; 
}

export interface ICompanySubscriptionUsage {
    id: string;
    userId: string;
    jobsPosted: number; 
    resumesAccessed: number; 
    profilesViewed: number; 
    lastUpdated: Date;
}
