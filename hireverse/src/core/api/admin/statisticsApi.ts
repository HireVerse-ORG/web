import axios from "@core/lib/axios";
import { RevenueStatistics, SubscriptionStatistics, UserStatistics } from "@core/types/statistics.interface";
import { apiWrapper } from "@core/utils/helper";

export const getUserStatistics = async (): Promise<UserStatistics> => {
    return (await apiWrapper(axios.get<UserStatistics>(`/user/statistics`))).data;
};

export const getSubscriptionStatistics = async (): Promise<SubscriptionStatistics> => {
    return (await apiWrapper(axios.get<SubscriptionStatistics>(`/payment/statistics/subscribers`))).data;
};

export const getRevenueStatistics = async (): Promise<RevenueStatistics> => {
    return (await apiWrapper(axios.get<RevenueStatistics>(`/payment/statistics/revenue`))).data;
};
