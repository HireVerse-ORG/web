import axios from "@core/lib/axios";
import { SeekerExperience } from "@core/types/seeker.interface";
import { apiWrapper } from "@core/utils/helper";

const baseUrl = '/profile/seeker/experience';

export const createSeekerExperience = async (data: Partial<SeekerExperience>): Promise<SeekerExperience> => {
    return (await apiWrapper(axios.post<SeekerExperience>(baseUrl, data))).data;
};

export const updateSeekerExperience = async (id: string, data: Partial<SeekerExperience>): Promise<SeekerExperience> => {
    return (await apiWrapper(axios.put<SeekerExperience>(`${baseUrl}/${id}`, data))).data;
};

export const deleteSeekerExperience = async (id: string): Promise<void> => {
    return (await apiWrapper(axios.delete(`${baseUrl}/${id}`))).data;
};

export const listSeekerExperience = async (username?: string): Promise<SeekerExperience[]> => {
    const url = (username ? `${baseUrl}/${username}` : `${baseUrl}`);
    return (await apiWrapper(axios.get<SeekerExperience[]>(url))).data;
};