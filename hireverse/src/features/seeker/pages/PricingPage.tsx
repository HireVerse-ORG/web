import { cancelSeekerSubscription, getSeekerPaymentLink } from "@core/api/subscription/seekerSubscriptionApi";
import PaymentPlanCard from "@core/components/ui/PaymentPlanCard";
import { useSeekerSubscription } from "@core/contexts/SeekerSubscriptionContext";
import { SeekerSubscriptioPlan } from "@core/types/subscription.interface";
import { Box, Skeleton, Typography } from "@mui/material";
import { toast } from "sonner";
import { useState } from "react";

const plans: {
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
        rate: "$10",
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
        rate: "$25",
        duration: "month",
        features: [
            { name: "Profile Creation", available: true },
            { name: "Unlimited Job applications", available: true },
            { name: "Message Anyone", available: true },
        ],
        paymentPlan: "premium", 
    },
];

function PricingPage() {
    const { subscription, loading: planLoading, refetch } = useSeekerSubscription();
    const [loadingPlans, setLoadingPlans] = useState<Record<SeekerSubscriptioPlan, boolean>>({
        free: false,
        basic: false,
        premium: false,
    });

    const handleSubscribe = async (plan: SeekerSubscriptioPlan) => {
        if (plan === "free") {
            return;
        }
    
        try {
            setLoadingPlans((prev) => ({ ...prev, [plan]: true }));
            const { url } = await getSeekerPaymentLink(plan);
    
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

    const handleCancel = async (plan: SeekerSubscriptioPlan) => {
        if (plan === "free") {
            return;
        }
        try {
            setLoadingPlans((prev) => ({ ...prev, [plan]: true }));
            await cancelSeekerSubscription();
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

export default PricingPage;
