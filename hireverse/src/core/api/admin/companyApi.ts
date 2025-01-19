import axios from "@core/lib/axios";
import { CompanyProfileStatus, ICompanyProfile } from "@core/types/company.interface";
import { IPaginationResponse } from "@core/types/pagination.interface";
import { ICompanyUser } from "@core/types/user.interface";
import { apiWrapper } from "@core/utils/helper";

export const listCompanies = async (page=1, limit=10, query=''): Promise<IPaginationResponse<ICompanyUser>> => {
    return (await apiWrapper(axios.get<IPaginationResponse<ICompanyUser>>(`/user/list/companies?page=${page}&limit=${limit}&query=${query}`))).data;
};

export const listCompanyProfile = async (page=1, limit=10, status?:CompanyProfileStatus ): Promise<IPaginationResponse<ICompanyProfile>> => {
    return (await apiWrapper(axios.get<IPaginationResponse<ICompanyProfile>>(`/profile/company/admin/list?status=${status}&page=${page}&limit=${limit}`))).data;
};

export const acceptCompany = async (companyId: string): Promise<void> => {
    return (await apiWrapper(axios.put(`/profile/company/${companyId}/accept`))).data;
};
export const rejectCompany = async (companyId: string): Promise<void> => {
    return (await apiWrapper(axios.put(`/profile/company/${companyId}/reject`))).data;
};

