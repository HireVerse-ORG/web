import axios from "@core/lib/axios";
import { IJobCategory } from "@core/types/jobCategory.interface";
import { apiWrapper } from "@core/utils/helper";

export const searchJobCategories = async (query: string): Promise<IJobCategory[]> => {
    const url = `/jobs/category/search?query=${query}`;
    return (await apiWrapper(axios.get<IJobCategory[]>(url))).data;
};