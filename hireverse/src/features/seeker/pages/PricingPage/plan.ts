import { SeekerSubscriptioPlan } from "@core/types/subscription.interface";

export const SeekerPaymentPlans: {
    planName: string;
    rate: string;
    duration: string;
    features: { name: string; available: boolean }[]; 
    isPopular?: boolean;
    paymentPlan: SeekerSubscriptioPlan; 
}[] = [
    {
        planName: "Free",
        rate: "$0",
        duration: "month",
        features: [
            { name: "Profile Creation", available: true },
            { name: "5 Job applications/month", available: true },
            { name: "Limited Messaging", available: true },
        ],
        paymentPlan: "free",
    },
    {
        planName: "Basic Plan",
        rate: "$5",
        duration: "month",
        features: [
            { name: "Profile Creation", available: true },
            { name: "30 Job applications/month", available: true },
            { name: "Message Anyone", available: true },
        ],
        isPopular: true,
        paymentPlan: "basic", 
    },
    {
        planName: "Premium Plan",
        rate: "$15",
        duration: "month",
        features: [
            { name: "Profile Creation", available: true },
            { name: "Unlimited Job applications", available: true },
            { name: "Message Anyone", available: true },
        ],
        paymentPlan: "premium", 
    },
];