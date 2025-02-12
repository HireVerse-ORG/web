import axios from "@core/lib/axios";
import { IInterview, IInterviewWithApplicationDetails, InterviewStatus, InterviewType } from "@core/types/interview.interface";
import { IPaginationResponse } from "@core/types/pagination.interface";
import { apiWrapper } from "@core/utils/helper";

const baseUrl = '/jobs/interview';

export const listApplicationInterviews= async (applicationId: string): Promise<{data: IInterview[]}> => {
    return (await apiWrapper(axios.get<{data: IInterview[]}>(`${baseUrl}/application/${applicationId}`))).data;
};

export const ListMyInterviewSchedules = async (params: {
    page: number;
    limit: number;
    types?: InterviewType[];
    statuses?: InterviewStatus[];
    upcoming?: boolean;
}): Promise<IPaginationResponse<IInterviewWithApplicationDetails>> => {
    const url = `${baseUrl}/my-schedules`;
    return (await apiWrapper(axios.get<IPaginationResponse<IInterviewWithApplicationDetails>>(url, {
        params: {
            ...params,
            types: params.types?.join(','),
            statuses: params.statuses?.join(',')
        }
    }))).data;
};