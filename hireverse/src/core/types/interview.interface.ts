export type InterviewType = 'online' | 'offline';

export type InterviewStatus = 'scheduled' | 'accepted' | 'rejected' | 'canceled' | 'expired';


export interface IInterview {
    id: string;
    jobId: string;
    applicantId: string;
    applicationId: string;
    interviewerId: string;
    scheduledTime: Date;
    type: InterviewType;
    status: InterviewStatus;
    description?: string;
}