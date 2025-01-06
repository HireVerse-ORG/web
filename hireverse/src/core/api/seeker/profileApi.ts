import axios from "@core/lib/axios";
import { SeekerProfile } from "@core/types/seeker.interface";
import { apiWrapper } from "@core/utils/helper";

const baseUrl = '/profile/seeker';

export const getSeekerProfile = async (): Promise<SeekerProfile> => {
    return (await apiWrapper(axios.get<SeekerProfile>(`${baseUrl}?field=profile`))).data;
};

export const getSeekerBio = async (): Promise<string> => {
    return (await apiWrapper(axios.get<string>(`${baseUrl}?field=bio`))).data;
};

export const getSeekerUsername = async (): Promise<string> => {
    return (await apiWrapper(axios.get<string>(`${baseUrl}?field=username`))).data;
};
