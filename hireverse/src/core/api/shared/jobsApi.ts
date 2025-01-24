import axios from "@core/lib/axios";
import { IJobWithCompanyProfile } from "@core/types/job.interface";
import { IPaginationResponse } from "@core/types/pagination.interface";
import { apiWrapper } from "@core/utils/helper";

export const searchJobs = async (filter:{
        keyword?: string;
        categories?: string[];
        employmentTypes?: string[];
        salaryRange?: string;
        location?: string,
        city?: string,
        country?: string,
        page: number;
        limit: number;
    }): Promise<IPaginationResponse<IJobWithCompanyProfile>> => {
    const {keyword="", location="", city="", country="", page, limit, categories="", employmentTypes="", salaryRange=""} = filter;
    const url = `/jobs/search?keyword=${keyword}&location=${location}&country=${country}&city=${city}&categories=${categories}&employmentTypes=${employmentTypes}&salaryRange=${salaryRange}&page=${page}&limit=${limit}`;
    return (await apiWrapper(axios.get<Promise<IPaginationResponse<IJobWithCompanyProfile>>>(url))).data;
};

export const getJob = async (id: string): Promise<IJobWithCompanyProfile> => {
    const url = `/jobs/${id}`;
    return (await apiWrapper(axios.get<Promise<IJobWithCompanyProfile>>(url))).data;
};

