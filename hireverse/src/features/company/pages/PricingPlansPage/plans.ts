import { CompanySubscriptioPlan } from "@core/types/subscription.interface";

export const CompanyPaymentPlans: {
    planName: string;
    rate: string;
    duration: string;
    features: { name: string; available: boolean }[]; 
    isPopular?: boolean;
    paymentPlan: CompanySubscriptioPlan; 
}[] = [
    {
        planName: "Free",
        rate: "$0",
        duration: "month",
        features: [
            { name: "1 Job Posting per month", available: true },
            { name: "Access 5 Applications", available: true },
        ],
        paymentPlan: "free",
    },
    {
        planName: "Basic Plan",
        rate: "$10",
        duration: "month",
        features: [
            { name: "5 Job Postings per month", available: true },
            { name: "Access 20 Applications", available: true },
        ],
        isPopular: true,
        paymentPlan: "basic", 
    },
    {
        planName: "Premium Plan",
        rate: "$20",
        duration: "month",
        features: [
            { name: "Unlimited Job Postings", available: true },
            { name: "Unlimited Application Access", available: true },
        ],
        paymentPlan: "premium", 
    },
];