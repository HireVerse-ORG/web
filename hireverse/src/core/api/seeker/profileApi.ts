import axios from "@core/lib/axios";
import { SeekerProfile } from "@core/types/seeker.interface";
import { ISkill } from "@core/types/skill.interface";
import { apiWrapper } from "@core/utils/helper";

const baseUrl = '/profile/seeker';

export const getSeekerProfile = async (username?: string): Promise<SeekerProfile> => {
    const url = (username ? `${baseUrl}/${username}` : `${baseUrl}`) + "?field=profile";
    return (await apiWrapper(axios.get<SeekerProfile>(url))).data;
};

export const createSeekerProfile = async (username?: string): Promise<SeekerProfile> => {
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

export const getSeekerSkills = async (username?: string): Promise<ISkill[]> => {
    const url = (username ? `${baseUrl}/${username}` : `${baseUrl}`) + "?field=skills";
    return (await apiWrapper(axios.get<ISkill[]>(url))).data;
};

export const updateSeekerProfileSkills = async (data: {skill: string}): Promise<{skill: ISkill, status: boolean}> => {
    return (await apiWrapper(axios.put<{skill: ISkill, status: boolean}>(`${baseUrl}/skills`, data))).data;
};

export const removeSeekerProfileSkill = async (skillId: string): Promise<{skill: ISkill, status: boolean}> => {
    return (await apiWrapper(axios.delete<{skill: ISkill, status: boolean}>(`${baseUrl}/skills/${skillId}`))).data;
};

export const updateSeekerProfile = async (data: Partial<SeekerProfile>): Promise<SeekerProfile> => {
    return (await apiWrapper(axios.put<SeekerProfile>(`${baseUrl}`, data))).data;
};

export const checkSeekerUsernameExist = async (username: string, userid?: string): Promise<{exist: boolean}> => {
    return (await apiWrapper(axios.get<{exist: boolean}>(`${baseUrl}/username-exist/${username}?exclude=${userid}`))).data;
};

