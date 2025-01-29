import { getSeekerSubscription, getSeekerUsage } from '@core/api/subscription/seekerSubscriptionApi';
import { ISeekerSubscription, ISeekerSubscriptionUsage } from '@core/types/subscription.interface';
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
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
        throw new Error('useSubscription must be used within a SubscriptionProvider');
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

    const socket = useNotificationSocket();

    useEffect(() => {
        if (!socket) return;

        const handleJobApplied = () => {
            if (usage) {
                setUsage((prevUsage) => prevUsage ? { ...prevUsage, jobApplicationsUsed: prevUsage.jobApplicationsUsed + 1 } : prevUsage);
            }
        };

        socket.on("job-applied", handleJobApplied);

        return () => {
            socket.off("job-applied");
        };
    }, [socket, usage]);

    const fetchSubscriptionData = async () => {
        setLoading(true);
        try {
            const subscriptionData = await getSeekerSubscription();
            const usageData = await getSeekerUsage();

            setSubscription(subscriptionData);
            setUsage(usageData);
        } catch (error) {
            // Handle errors gracefully
            // console.error('Error fetching subscription data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSubscriptionData();
    }, []);

    useEffect(() => {
        if (usage && subscription) {
            if (subscription.jobApplicationsPerMonth !== -1 && usage.jobApplicationsUsed + 1 > subscription.jobApplicationsPerMonth) {
                setJobApplicationLimitExceeded(true);
            } else {
                setJobApplicationLimitExceeded(false);
            }
        }
    }, [subscription, usage]);

    return (
        <SeekerSubscriptionContext.Provider
            value={{
                subscription,
                usage,
                setSubscription,
                setUsage,
                loading,
                refetch: fetchSubscriptionData,
                jobApplicationLimitExceeded,
            }}
        >
            {children}
        </SeekerSubscriptionContext.Provider>
    );
};
