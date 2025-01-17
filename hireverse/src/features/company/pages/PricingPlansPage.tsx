import { cancelCompanySubscription, getCompanyPaymentLink } from "@core/api/subscription/companySubscriptionApi";
import PaymentPlanCard from "@core/components/ui/PaymentPlanCard";
import { useCompanySubscription } from "@core/contexts/CompanySubscriptionContext";
import { CompanySubscriptioPlan } from "@core/types/subscription.interface";
import { Box, Skeleton, Typography } from "@mui/material";
import { useState } from "react";
import { toast } from "sonner";

const plans: {
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
            { name: "Limited Resume Access", available: true },
            { name: "Limited Profile Access", available: true },
        ],
        paymentPlan: "free",
    },
    {
        planName: "Basic Plan",
        rate: "$10",
        duration: "month",
        features: [
            { name: "5 Job Postings per month", available: true },
            { name: "Access 20 Resumes", available: true },
            { name: "Access 20 Profiles", available: true },
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
            { name: "Unlimited Resume Access", available: true },
            { name: "Unlimited Profile Access", available: true },
        ],
        paymentPlan: "premium", 
    },
];

const PricingPlansPage = () => {
    const { subscription, loading: planLoading, refetch } = useCompanySubscription();
    const [loadingPlans, setLoadingPlans] = useState<Record<CompanySubscriptioPlan, boolean>>({
        free: false,
        basic: false,
        premium: false,
    });

    const handleSubscribe = async (plan: CompanySubscriptioPlan) => {
        if (plan === "free") {
            return;
        }
    
        try {
            setLoadingPlans((prev) => ({ ...prev, [plan]: true }));
            const { url } = await getCompanyPaymentLink(plan);
    
            if (url) {
                window.location.href = url;
            } else {
                throw new Error("Payment link is unavailable.");
            }
        } catch (error: any) {
            toast.error(error || "Failed to subscribe to the plan. Please try again later.");
        } finally {
            setLoadingPlans((prev) => ({ ...prev, [plan]: false }));
        }
    };

    const handleCancel = async (plan: CompanySubscriptioPlan) => {
        if (plan === "free") {
            return;
        }
        try {
            setLoadingPlans((prev) => ({ ...prev, [plan]: true }));
            await cancelCompanySubscription();
            refetch();
        } catch (error: any) {
            toast.error(error || "Failed to cancel the subscription. Please try again later.");
        } finally {
            setLoadingPlans((prev) => ({ ...prev, [plan]: false }));
        }
    };
    
    if (planLoading) {
        return (
            <Box
                sx={{
                    p: 4,
                    display: "flex",
                    gap: 3,
                    flexWrap: "wrap",
                    justifyContent: "center",
                }}
            >
                {Array.from({ length: 3 }).map((_, index) => (
                    <Box
                        key={index}
                        sx={{
                            flexBasis: "200px",
                            maxWidth: "400px",
                            width: "100%",
                        }}
                    >
                        <Skeleton
                            variant="rectangular"
                            width="100%"
                            height={200}
                            sx={{ mb: 1 }}
                        />
                        <Skeleton width="60%" sx={{ mb: 0.5 }} />
                        <Skeleton width="40%" />
                    </Box>
                ))}
            </Box>
        );
    }

    if (!subscription) {
        return (
            <Box sx={{ p: 4 }}>
                <Typography variant="h6" color="error">
                    No subscription found.
                </Typography>
            </Box>
        );
    }

    return (
        <Box
            sx={{
                p: 4,
                display: "flex",
                gap: 3,
                flexWrap: "wrap",
                justifyContent: "center",
            }}
        >
            {plans.map((plan, index) => (
                <Box
                    key={index}
                    sx={{
                        flexGrow: 1,
                        flexBasis: "200px",
                        maxWidth: "400px",
                        "@media (max-width: 600px)": {
                            flexBasis: "100%",
                        },
                    }}
                >
                    <PaymentPlanCard
                        planName={plan.planName}
                        rate={plan.rate}
                        duration={plan.duration}
                        features={plan.features}
                        isPopular={plan.isPopular}
                        isCurrentPlan={subscription?.plan === plan.paymentPlan}
                        buttonText={
                            loadingPlans[plan.paymentPlan]
                                ? "Processing..."
                                : subscription?.plan === plan.paymentPlan
                                    ? plan.paymentPlan === "free"
                                        ? "Subscribed"
                                        : "Cancel"
                                    : "Subscribe"
                        }
                        onSubscribe={
                            subscription?.plan === plan.paymentPlan
                                ? () => handleCancel(plan.paymentPlan) 
                                : () => handleSubscribe(plan.paymentPlan)
                        }
                        disabled={loadingPlans[plan.paymentPlan]} 
                    />
                </Box>
            ))}
        </Box>
    );
}

export default PricingPlansPage;
