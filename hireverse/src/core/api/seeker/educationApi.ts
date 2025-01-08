import axios from "@core/lib/axios";
import { SeekerEducation } from "@core/types/seeker.interface";
import { apiWrapper } from "@core/utils/helper";

const baseUrl = '/profile/seeker/education';

export const createSeekerEducation = async (data: Partial<SeekerEducation>): Promise<SeekerEducation> => {
    return (await apiWrapper(axios.post<SeekerEducation>(baseUrl, data))).data;
};

export const updateSeekerEducation = async (id: string, data: Partial<SeekerEducation>): Promise<SeekerEducation> => {
    return (await apiWrapper(axios.put<SeekerEducation>(`${baseUrl}/${id}`, data))).data;
};

export const deleteSeekerEducation = async (id: string): Promise<void> => {
    return (await apiWrapper(axios.delete(`${baseUrl}/${id}`))).data;
};

export const listSeekerEducation = async (username?: string): Promise<SeekerEducation[]> => {
    const url = (username ? `${baseUrl}/${username}` : `${baseUrl}`);
    return (await apiWrapper(axios.get<SeekerEducation[]>(url))).data;
};