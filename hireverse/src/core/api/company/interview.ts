import axios from "@core/lib/axios";
import { IInterview, InterviewType } from "@core/types/interview.interface";
import { apiWrapper } from "@core/utils/helper";

const baseUrl = '/jobs/interview';

export const scheduleInterview= async (data: { 
    jobId: string, 
    applicantId: string, 
    applicationId: string, 
    scheduledTime: Date; 
    type: InterviewType; 
    description?: string;
}): Promise<IInterview> => {
    return (await apiWrapper(axios.post<IInterview>(`${baseUrl}/schedule`, data))).data;
};

export const cancelInterview= async (interviewId: string): Promise<IInterview> => {
    return (await apiWrapper(axios.put<IInterview>(`${baseUrl}/${interviewId}/cancel`))).data;
};

export const completeInterview= async (interviewId: string): Promise<IInterview> => {
    return (await apiWrapper(axios.put<IInterview>(`${baseUrl}/${interviewId}/complete`))).data;
};