import axios from "@core/lib/axios";
import { ICompanyProfile } from "@core/types/company.interface";
import { IPaginationResponse } from "@core/types/pagination.interface";
import { apiWrapper } from "@core/utils/helper";

interface CompanySearchFilters {
    query?: string
    country?: string;
    city?: string;
    place?: string;
    industries?: string[],
    companyTypes?: string[];
}

export const listPublicCompanies = async (
    page = 1, 
    limit = 10, 
    filter?: CompanySearchFilters
): Promise<IPaginationResponse<ICompanyProfile>> => {
    const queryParams: string[] = [];
    
    if (filter?.query) {
        queryParams.push(`query=${encodeURIComponent(filter.query)}`);
    }

    if (filter?.companyTypes && filter.companyTypes.length > 0) {
        queryParams.push(`companyTypes=${filter.companyTypes.join(',')}`);
    }

    if (filter?.industries && filter.industries.length > 0) {
        queryParams.push(`industries=${filter.industries.join(',')}`);
    }

    if (filter?.country) {
        queryParams.push(`country=${encodeURIComponent(filter.country)}`);
    }

    if (filter?.city) {
        queryParams.push(`city=${encodeURIComponent(filter.city)}`);
    }

    if (filter?.place) {
        queryParams.push(`place=${encodeURIComponent(filter.place)}`);
    }

    const url = `/profile/company/list?page=${page}&limit=${limit}&${queryParams.join('&')}`;

    return (await apiWrapper(axios.get<IPaginationResponse<ICompanyProfile>>(url))).data;
};