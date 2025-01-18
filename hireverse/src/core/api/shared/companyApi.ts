import axios from "@core/lib/axios";
import { ICompanyProfile } from "@core/types/company.interface";
import { IPaginationResponse } from "@core/types/pagination.interface";
import { apiWrapper } from "@core/utils/helper";

export const listPublicCompanies = async (page=1, limit=10, query?:string ): Promise<IPaginationResponse<ICompanyProfile>> => {
    return (await apiWrapper(axios.get<IPaginationResponse<ICompanyProfile>>(`/profile/company/list?page=${page}&limit=${limit}&query=${query}`))).data;
};
