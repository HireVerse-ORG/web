import axios from "@core/lib/axios";
import { IInterview, IInterviewWithApplicationDetails } from "@core/types/interview.interface";
import { IPaginationResponse } from "@core/types/pagination.interface";
import { apiWrapper } from "@core/utils/helper";

const baseUrl = '/jobs/interview';

export const acceptInterview = async (interviewId: string): Promise<IInterview> => {
    return (await apiWrapper(axios.put<IInterview>(`${baseUrl}/${interviewId}/accept`))).data;
};

export const rejectInterview = async (interviewId: string): Promise<IInterview> => {
    return (await apiWrapper(axios.put<IInterview>(`${baseUrl}/${interviewId}/reject`))).data;
};

export const listApplicantInterviewSchedules = async (page: number, limit: number): Promise<IPaginationResponse<IInterviewWithApplicationDetails>> => {
    const url = `${baseUrl}/applicant/schedules?page=${page}&limit=${limit}`;
    return (await apiWrapper(axios.get<IPaginationResponse<IInterviewWithApplicationDetails>>(url))).data;
};
