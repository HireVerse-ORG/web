export type JobStatus = 'active' | 'inactive' | 'draft';

export interface IJobCreate {
    title: string;
    employmentTypes: string[];
    salaryRange: number[] | null;
    categories: string[];
    skills: string[];
    status: JobStatus;
    description: string;
    responsibilities?: string;
    whoYouAre?: string;
    niceToHaves?: string;
    companyProfileId: string;
}

export interface IJobUpdate {
    title?: string;
    employmentTypes?: string[];
    salaryRange?: number[] | null;
    categories?: string[];
    skills?: string[];
    status?: JobStatus;
    description?: string;
    responsibilities?: string;
    whoYouAre?: string;
    niceToHaves?: string;
}

export interface IJob {
    id: string;
    title: string;
    employmentTypes: string[];
    salaryRange: number[] | null;
    categories: string[];
    skills: string[];
    status: JobStatus;
    description: string;
    responsibilities: string;
    whoYouAre: string;
    niceToHaves: string;
    companyProfileId: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
}