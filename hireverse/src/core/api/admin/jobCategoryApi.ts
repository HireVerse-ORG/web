import axios from "@core/lib/axios"
import { IJobCategory } from "@core/types/jobCategory.interface";
import { IPaginationResponse } from "@core/types/pagination.interface";
import { apiWrapper} from "@core/utils/helper";

const baseUrl = '/jobs/category';

export const createJobCategory = async (data: {name: string, isActive: boolean}): Promise<void> => {
    return (await apiWrapper(axios.post(`${baseUrl}`, data))).data;
};
export const updateJobCategory = async (data: {id: string, name: string, isActive: boolean}): Promise<void> => {
    return (await apiWrapper(axios.put(`${baseUrl}`, data))).data;
};

export const listJobCategory = async (page=1, limit=10, query=''): Promise<IPaginationResponse<IJobCategory>> => {
    return (await apiWrapper(axios.get<IPaginationResponse<IJobCategory>>(`${baseUrl}/list?page=${page}&limit=${limit}&query=${query}`))).data;
};

export const deactivateJobCategory = async (id: string): Promise<void> => {
    return (await apiWrapper(axios.delete(`${baseUrl}/${id}`))).data;
};

export const restoreJobCategory = async (id: string): Promise<void> => {
    return (await apiWrapper(axios.put(`${baseUrl}/${id}`))).data;
};
