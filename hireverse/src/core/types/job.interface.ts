import { IJobCategory } from "./jobCategory.interface";
import { ISkill } from "./skill.interface";

export type JobStatus = 'pending' | 'failed' | 'live' | 'closed';

export interface IJobCreate {
    title: string;
    employmentTypes: string[];
    salaryRange: number[] | null;
    categories: string[];
    skills: string[];
    description: string;
    responsibilities?: string;
    whoYouAre?: string;
    niceToHaves?: string;
    companyProfileId: string;
}

export interface IJobUpdate {
    id: string;
    userId: string;
    title?: string;
    employmentTypes?: string[];
    salaryRange?: number[] | null;
    categories?: string[];
    skills?: string[];
    description?: string;
    responsibilities?: string;
    whoYouAre?: string;
    niceToHaves?: string;
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
    categories: IJobCategory[] | string[];
    skills: ISkill[] | string[];
    status: JobStatus;
    description: string;
    responsibilities: string;
    whoYouAre: string;
    niceToHaves: string;
    companyProfileId: string;
    userId: string;
    failedReson: string | null;
    createdAt: Date;
    updatedAt: Date;
}

export interface IJobWithCompanyProfile extends IJob {
    companyProfile: null | {
        id: string;
        name: string;
        companyId: string;
        location: {
            city: string;
            country: string;
        },
        image: string | null;
    }
    applied?: boolean;
}