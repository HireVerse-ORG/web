import axios from "@core/lib/axios";
import { IPaginationResponse } from "@core/types/pagination.interface";
import { ICompanyUser } from "@core/types/user.interface";
import { apiWrapper } from "@core/utils/helper";

export const listCompanies = async (page=1, limit=10, query='', status='all'): Promise<IPaginationResponse<ICompanyUser>> => {
    return (await apiWrapper(axios.get<IPaginationResponse<ICompanyUser>>(`/user/list/companies?page=${page}&limit=${limit}&query=${query}&status=${status}`))).data;
};
export const acceptCompany = async (companyId: string): Promise<void> => {
    return (await apiWrapper(axios.put(`/profile/company/${companyId}/accept`))).data;
};
export const rejectCompany = async (companyId: string): Promise<void> => {
    return (await apiWrapper(axios.put(`/profile/company/${companyId}/reject`))).data;
};
