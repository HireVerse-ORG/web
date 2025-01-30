import { createContext, useContext, useState, ReactNode, useEffect, useCallback, useMemo } from 'react';
import { getSeekerSubscription, getSeekerUsage } from '@core/api/subscription/seekerSubscriptionApi';
import { ISeekerSubscription, ISeekerSubscriptionUsage } from '@core/types/subscription.interface';
import { useNotificationSocket } from './NotificationContext';

interface SeekerSubscriptionContextType {
    subscription: ISeekerSubscription | null;
    usage: ISeekerSubscriptionUsage | null;
    setSubscription: (subscription: ISeekerSubscription) => void;
    setUsage: (usage: ISeekerSubscriptionUsage) => void;
    loading: boolean;
    refetch: () => Promise<void>;
    jobApplicationLimitExceeded: boolean;
}

const SeekerSubscriptionContext = createContext<SeekerSubscriptionContextType | undefined>(undefined);

export const useSeekerSubscription = (): SeekerSubscriptionContextType => {
    const context = useContext(SeekerSubscriptionContext);
    if (!context) {
        throw new Error('useSeekerSubscription must be used within a SubscriptionProvider');
    }
    return context;
};

interface SubscriptionProviderProps {
    children: ReactNode;
}

export const SubscriptionProvider = ({ children }: SubscriptionProviderProps) => {
    const [subscription, setSubscription] = useState<ISeekerSubscription | null>(null);
    const [usage, setUsage] = useState<ISeekerSubscriptionUsage | null>(null);
    const [loading, setLoading] = useState(false);
    const [jobApplicationLimitExceeded, setJobApplicationLimitExceeded] = useState(false);

    const { socket } = useNotificationSocket();

    const fetchSubscriptionData = useCallback(async () => {
        setLoading(true);
        try {
            const [subscriptionData, usageData] = await Promise.all([
                getSeekerSubscription(),
                getSeekerUsage(),
            ]);

            setSubscription(subscriptionData);
            setUsage(usageData);
        } catch (error) {
            console.error('Error fetching subscription data:', error);
        } finally {
            setLoading(false);
        }
    }, []);


    const handleJobApplied = useCallback(() => {
        setUsage(prevUsage =>
            prevUsage ? { ...prevUsage, jobApplicationsUsed: prevUsage.jobApplicationsUsed + 1 } : prevUsage
        );
    }, []);


    useEffect(() => {
        fetchSubscriptionData();
    }, [fetchSubscriptionData]);


    useEffect(() => {
        if (!socket) return;

        socket.on('job-applied', handleJobApplied);

        return () => {
            socket.off('job-applied', handleJobApplied);
        };
    }, [socket, handleJobApplied]);


    useEffect(() => {
        if (usage && subscription) {
            setJobApplicationLimitExceeded(
                subscription.jobApplicationsPerMonth !== -1 &&
                usage.jobApplicationsUsed >= subscription.jobApplicationsPerMonth
            );
        }
    }, [subscription, usage]);

    const value = useMemo(() => ({
        subscription,
        usage,
        setSubscription,
        setUsage,
        loading,
        refetch: fetchSubscriptionData,
        jobApplicationLimitExceeded,
    }), [subscription, usage, loading, fetchSubscriptionData]);

    return (
        <SeekerSubscriptionContext.Provider value={value}>
            {children}
        </SeekerSubscriptionContext.Provider>
    );
};
