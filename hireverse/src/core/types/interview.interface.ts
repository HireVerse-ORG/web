import { IJobApplication } from "./job.application.interface";

export type InterviewType = 'online' | 'offline';

export type InterviewStatus = 'scheduled' | 'accepted' | 'rejected' | 'canceled' | 'expired';


export interface IInterview {
    id: string;
    job: string;
    application: string | any;
    applicantId: string;
    interviewerId: string;
    scheduledTime: Date;
    type: InterviewType;
    status: InterviewStatus;
    description?: string;
}

export interface IInterviewWithApplicationDetails extends IInterview {
    application: IJobApplication
}
