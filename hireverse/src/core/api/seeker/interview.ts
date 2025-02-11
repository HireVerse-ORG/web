import axios from "@core/lib/axios";
import { IInterview } from "@core/types/interview.interface";
import { apiWrapper } from "@core/utils/helper";

const baseUrl = '/jobs/interview';

export const acceptInterview= async (interviewId: string): Promise<IInterview> => {
    return (await apiWrapper(axios.put<IInterview>(`${baseUrl}/${interviewId}/accept`))).data;
};

export const rejectInterview= async (interviewId: string): Promise<IInterview> => {
    return (await apiWrapper(axios.put<IInterview>(`${baseUrl}/${interviewId}/reject`))).data;
};
