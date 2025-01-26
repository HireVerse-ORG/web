export type JobApplicationStatus = 'pending' | 'applied' | 'failed' | 'in-review' | 'shortlisted' | 'interview' | 'hired' |'declined' | 'withdrawn';


export interface IJobApplication {
    id: string;
    userId: string;
    companyProfileId: string;
    jobRole: string;
    jobId: string;
    fullName: string;
    email: string;
    phone?: string;
    coverLetter?: string;
    resume: string;
    status: JobApplicationStatus;
    failedReason: string | null;
    createdAt: Date;
    updatedAt: Date;
}

export interface IJobApplicationWithCompanyProfile extends IJobApplication {
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
}
