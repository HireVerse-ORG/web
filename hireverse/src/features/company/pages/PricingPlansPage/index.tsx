import React from 'react';
import { Box, Typography, Skeleton } from '@mui/material';
import PaymentPlanCard from '@core/components/ui/PaymentPlanCard';
import { useCompanySubscription } from '@core/contexts/CompanySubscriptionContext';
import { CompanySubscriptioPlan } from '@core/types/subscription.interface';
import { APP_URL } from '@core/utils/constants';
import { toast } from 'sonner';
import { CompanyPaymentPlans } from './plans';
import { cancelCompanySubscription, getCompanyPaymentLink } from '@core/api/subscription/companySubscriptionApi';
import SubscriptionUsageCard from '@core/components/ui/SubscriptionUsageCard';


const PricingPlansPage = () => {
    const { subscription, loading: planLoading, usage, refetch } = useCompanySubscription();
    const [loadingPlans, setLoadingPlans] = React.useState<Record<CompanySubscriptioPlan, boolean>>({
        free: false,
        basic: false,
        premium: false,
    });

    const handleSubscribe = async (plan: CompanySubscriptioPlan) => {
        if (plan === 'free') return;

        try {
            setLoadingPlans((prev) => ({ ...prev, [plan]: true }));
            const successUrl = `${APP_URL}/company`;
            const cancelUrl = `${APP_URL}/company/pricing-plans`;
            const { url } = await getCompanyPaymentLink({ plan, successUrl, cancelUrl });

            if (url) {
                window.location.href = url;
            } else {
                throw new Error('Payment link is unavailable.');
            }
        } catch (error: any) {
            toast.error(error || 'Failed to subscribe to the plan. Please try again later.');
        } finally {
            setLoadingPlans((prev) => ({ ...prev, [plan]: false }));
        }
    };

    const handleCancel = async (plan: CompanySubscriptioPlan) => {
        if (plan === 'free') return;

        try {
            setLoadingPlans((prev) => ({ ...prev, [plan]: true }));
            await cancelCompanySubscription();
            refetch();
        } catch (error: any) {
            toast.error(error || 'Failed to cancel the subscription. Please try again later.');
        } finally {
            setLoadingPlans((prev) => ({ ...prev, [plan]: false }));
        }
    };

    if (planLoading) {
        return (
            <Box
                sx={{
                    p: 4,
                    display: 'flex',
                    gap: 3,
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                }}
            >
                {Array.from({ length: 3 }).map((_, index) => (
                    <Box
                        key={index}
                        sx={{
                            flexBasis: '200px',
                            maxWidth: '400px',
                            width: '100%',
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
        <Box sx={{ pb: 4 }}>
            {/* Payment Plans */}
            <Box
                sx={{
                    display: 'flex',
                    gap: 3,
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                }}
            >
                {CompanyPaymentPlans.map((plan, index) => (
                    <Box
                        key={index}
                        sx={{
                            flexGrow: 1,
                            flexBasis: '200px',
                            maxWidth: '400px',
                            '@media (max-width: 600px)': {
                                flexBasis: '100%',
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
                                    ? 'Processing...'
                                    : subscription?.plan === plan.paymentPlan
                                        ? plan.paymentPlan === 'free'
                                            ? 'Subscribed'
                                            : 'Cancel'
                                        : 'Subscribe'
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

            {/* Usage Section */}
            {usage && (
                <SubscriptionUsageCard title='Your Plan Usage' data={{
                    "Jobs Posted": usage.jobsPosted,
                    "Applications Accessed": usage.applicantionAccessed,
                }} />      
            )}
        </Box>
    );
};

export default PricingPlansPage;
