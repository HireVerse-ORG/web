import axios from "@core/lib/axios";
import { ICompanyProfile } from "@core/types/company.interface";
import { apiWrapper } from "@core/utils/helper";

const baseUrl = '/profile/company';

export const createCompanyProfile = async (data: Partial<ICompanyProfile>): Promise<{message: string, profile: ICompanyProfile}> => {
    return (await apiWrapper(axios.post<{message: string, profile: ICompanyProfile}>(baseUrl, data))).data;
};

export const getCompanyProfile = async (companyId?: string): Promise<ICompanyProfile> => {
    const url = (companyId ? `${baseUrl}/${companyId}` : `${baseUrl}`);
    return (await apiWrapper(axios.get<ICompanyProfile>(url))).data;
};