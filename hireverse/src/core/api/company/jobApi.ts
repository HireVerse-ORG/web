import axios from "@core/lib/axios";
import { IJob, IJobCreate } from "@core/types/job.interface";
import { apiWrapper } from "@core/utils/helper";

const baseUrl = '/jobs';

export const createJob= async (data: IJobCreate): Promise<IJob> => {
    return (await apiWrapper(axios.post<IJob>(baseUrl, data))).data;
};