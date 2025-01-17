import axios from "@core/lib/axios";
import { CompanySubscriptioPlan, ICompanySubscription, ICompanySubscriptionUsage } from "@core/types/subscription.interface";
import { apiWrapper } from "@core/utils/helper";

const baseUrl = "payment/subscription/company"

export const getCompanySubscription = async (): Promise<ICompanySubscription> => {
    return (await apiWrapper(axios.get<ICompanySubscription>(`${baseUrl}/plan`))).data;
};

export const getCompanyUsage = async (): Promise<ICompanySubscriptionUsage> => {
    return (await apiWrapper(axios.get<ICompanySubscriptionUsage>(`${baseUrl}/usage`))).data;
};

export const getCompanyPaymentLink = async (plan: CompanySubscriptioPlan): Promise<{url: string}> => {
    return (await apiWrapper(axios.post<{url: string}>(`${baseUrl}/paymentlink`, {plan}))).data;
};

export const cancelCompanySubscription = async (): Promise<{message: string}> => {
    return (await apiWrapper(axios.delete<{message: string}>(`${baseUrl}/cancel`))).data;
};
