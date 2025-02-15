import axios from "@core/lib/axios";
import { apiWrapper } from "@core/utils/helper";

export interface UserStatistics {
    total: number;
    monthlyGrowth: Array<{ month: string; count: number }>;
}

export const getUserStatistics = async (): Promise<UserStatistics> => {
    return (await apiWrapper(axios.get<UserStatistics>(`/user/statistics`))).data;
};
