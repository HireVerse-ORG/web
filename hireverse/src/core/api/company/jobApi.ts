import axios from "@core/lib/axios";
import { IJob, IJobCreate, IJobUpdate } from "@core/types/job.interface";
import { IPaginationResponse } from "@core/types/pagination.interface";
import { apiWrapper } from "@core/utils/helper";

const baseUrl = '/jobs';

export const createJob= async (data: IJobCreate): Promise<IJob> => {
    return (await apiWrapper(axios.post<IJob>(baseUrl, data))).data;
};

export const updateJob= async (data: IJobUpdate): Promise<IJob> => {
    return (await apiWrapper(axios.put<IJob>(`${baseUrl}/${data.id}`, data))).data;
};

export const getJobDetailsforCompany = async (id: string): Promise<IJob> => {
    const url = `/jobs/company/${id}`;
    return (await apiWrapper(axios.get<Promise<IJob>>(url))).data;
};

export const retryJobPosting = async (id: string): Promise<IJob> => {
    return (await apiWrapper(axios.post<IJob>(`${baseUrl}/retry/${id}`))).data;
};
export const closeJob = async (id: string): Promise<IJob> => {
    return (await apiWrapper(axios.post<IJob>(`${baseUrl}/close/${id}`))).data;
};

export const listMyJobs= async (page=1, limit=10, query?: string): Promise<IPaginationResponse<IJob>> => {
    return (await apiWrapper(axios.get<IPaginationResponse<IJob>>(`${baseUrl}/my-jobs?page=${page}&limit=${limit}&query=${query}`))).data;
};