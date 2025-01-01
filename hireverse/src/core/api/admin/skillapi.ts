import axios from "@core/lib/axios"
import { IPaginationResponse } from "@core/types/pagination.interface";
import { ISkill } from "@core/types/skill.interface";
import { apiWrapper} from "@core/utils/helper";

const baseUrl = '/jobs/skills';

export const createSkill = async (data: {name: string, isActive: boolean}): Promise<void> => {
    return (await apiWrapper(axios.post(`${baseUrl}`, data))).data;
};
export const updateSkill = async (data: {id: string, name: string, isActive: boolean}): Promise<void> => {
    return (await apiWrapper(axios.put(`${baseUrl}`, data))).data;
};

export const listSkills = async (page=1, limit=10, query=''): Promise<IPaginationResponse<ISkill>> => {
    return (await apiWrapper(axios.get<IPaginationResponse<ISkill>>(`${baseUrl}/list?page=${page}&limit=${limit}&query=${query}`))).data;
};

export const deactivateSkill = async (id: string): Promise<void> => {
    return (await apiWrapper(axios.delete(`${baseUrl}/${id}`))).data;
};

export const restoreSkill = async (id: string): Promise<void> => {
    return (await apiWrapper(axios.put(`${baseUrl}/${id}`))).data;
};
