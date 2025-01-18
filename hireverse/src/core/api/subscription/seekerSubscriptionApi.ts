import axios from "@core/lib/axios";
import { ISeekerSubscription, ISeekerSubscriptionUsage, SeekerSubscriptioPlan } from "@core/types/subscription.interface";
import { apiWrapper } from "@core/utils/helper";

const baseUrl = "payment/subscription/seeker"

export const getSeekerSubscription = async (): Promise<ISeekerSubscription> => {
    return (await apiWrapper(axios.get<ISeekerSubscription>(`${baseUrl}/plan`))).data;
};

export const getSeekerUsage = async (): Promise<ISeekerSubscriptionUsage> => {
    return (await apiWrapper(axios.get<ISeekerSubscriptionUsage>(`${baseUrl}/usage`))).data;
};

export const getSeekerPaymentLink = async (data: {plan: SeekerSubscriptioPlan, successUrl: string, cancelUrl: string}): Promise<{url: string}> => {
    return (await apiWrapper(axios.post<{url: string}>(`${baseUrl}/paymentlink`, data))).data;
};

export const cancelSeekerSubscription = async (): Promise<{message: string}> => {
    return (await apiWrapper(axios.delete<{message: string}>(`${baseUrl}/cancel`))).data;
};
