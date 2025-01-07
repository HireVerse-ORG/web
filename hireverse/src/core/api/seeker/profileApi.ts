import axios from "@core/lib/axios";
import { SeekerProfile } from "@core/types/seeker.interface";
import { apiWrapper } from "@core/utils/helper";

const baseUrl = '/profile/seeker';

export const getSeekerProfile = async (username?: string): Promise<SeekerProfile> => {
    const url = (username ? `${baseUrl}/${username}` : `${baseUrl}`) + "?field=profile";
    return (await apiWrapper(axios.get<SeekerProfile>(url))).data;
};

export const getSeekerBio = async (username?: string): Promise<string> => {
    const url = (username ? `${baseUrl}/${username}` : `${baseUrl}`) + "?field=bio";
    return (await apiWrapper(axios.get<string>(url))).data;
};

export const getSeekerUsername = async (username?: string): Promise<string> => {
    const url = (username ? `${baseUrl}/${username}` : `${baseUrl}`) + "?field=username";
    return (await apiWrapper(axios.get<string>(url))).data;
};

export const updateSeekerProfile = async (data: Partial<SeekerProfile>): Promise<SeekerProfile> => {
    return (await apiWrapper(axios.put<SeekerProfile>(`${baseUrl}`, data))).data;
};

