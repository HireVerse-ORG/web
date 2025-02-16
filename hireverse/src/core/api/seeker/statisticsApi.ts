import axios from "@core/lib/axios";
import { SeekerInterviewStatistics, SeekerJobApplicationStatistics } from "@core/types/statistics.interface";
import { apiWrapper } from "@core/utils/helper";

export const getMyJobApplicationStatistics = async (): Promise<SeekerJobApplicationStatistics> => {
    return (await apiWrapper(axios.get<SeekerJobApplicationStatistics>(`/jobs/statistics/seeker/applications`))).data;
};

export const getMyInterviewStatistics = async (): Promise<SeekerInterviewStatistics> => {
    return (await apiWrapper(axios.get<SeekerInterviewStatistics>(`/jobs/statistics/seeker/interview`))).data;
};
