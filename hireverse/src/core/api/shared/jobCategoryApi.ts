import axios from "@core/lib/axios";
import { IJobCategory } from "@core/types/jobCategory.interface";
import { IPaginationResponse } from "@core/types/pagination.interface";
import { apiWrapper } from "@core/utils/helper";

export const searchJobCategories = async (query: string): Promise<IJobCategory[]> => {
    const url = `/jobs/category/search?query=${query}`;
    return (await apiWrapper(axios.get<IJobCategory[]>(url))).data;
};

export const publicJobCategoryList = async (page=1, limit=10): Promise<IPaginationResponse<IJobCategory>> => {
    const url = `/jobs/category/public?page=${page}&limit=${limit}`;
    return (await apiWrapper(axios.get<IPaginationResponse<IJobCategory>>(url))).data;
};

export const jobCategoryListByJobKeyword = async (keyWord: string): Promise<string[]> => {
    const url = `/jobs/keyword-categories?keyword=${keyWord}`;
    return (await apiWrapper(axios.get<string[]>(url))).data;
};