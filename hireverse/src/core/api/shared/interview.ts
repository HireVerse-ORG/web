import axios from "@core/lib/axios";
import { IInterview } from "@core/types/interview.interface";
import { apiWrapper } from "@core/utils/helper";

const baseUrl = '/jobs/interview';

export const listApplicationInterviews= async (applicationId: string): Promise<{data: IInterview[]}> => {
    return (await apiWrapper(axios.get<{data: IInterview[]}>(`${baseUrl}/application/${applicationId}`))).data;
};