import axios from "@core/lib/axios";
import { SeekerPortfolio } from "@core/types/seeker.interface";
import { apiWrapper } from "@core/utils/helper";

const baseUrl = '/profile/seeker/portfolio';

export const createSeekerPortfolio = async (data: Partial<SeekerPortfolio>): Promise<SeekerPortfolio> => {
    return (await apiWrapper(axios.post<SeekerPortfolio>(baseUrl, data))).data;
};

export const updateSeekerPortfolio = async (id: string, data: Partial<SeekerPortfolio>): Promise<SeekerPortfolio> => {
    return (await apiWrapper(axios.put<SeekerPortfolio>(`${baseUrl}/${id}`, data))).data;
};

export const deleteSeekerPortfolio = async (id: string): Promise<void> => {
    return (await apiWrapper(axios.delete(`${baseUrl}/${id}`))).data;
};

export const listSeekerPortfolio = async (username?: string): Promise<SeekerPortfolio[]> => {
    const url = (username ? `${baseUrl}/${username}` : `${baseUrl}`);
    return (await apiWrapper(axios.get<SeekerPortfolio[]>(url))).data;
};