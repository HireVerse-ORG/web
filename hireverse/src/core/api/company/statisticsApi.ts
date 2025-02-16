import axios from "@core/lib/axios";
import { CompanyJobApplicationStatistics, CompanyJobStatistics } from "@core/types/statistics.interface";
import { apiWrapper } from "@core/utils/helper";

export const getMyJobStatistics = async (): Promise<CompanyJobStatistics> => {
    return (await apiWrapper(axios.get<CompanyJobStatistics>(`/jobs/statistics/company`))).data;
};
export const getMyJobApplicationStatistics = async (): Promise<CompanyJobApplicationStatistics> => {
    return (await apiWrapper(axios.get<CompanyJobApplicationStatistics>(`/jobs/statistics/company/applications`))).data;
};
