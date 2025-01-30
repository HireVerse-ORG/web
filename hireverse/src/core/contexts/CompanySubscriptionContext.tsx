import { getCompanySubscription, getCompanyUsage } from '@core/api/subscription/companySubscriptionApi';
import { ICompanySubscription, ICompanySubscriptionUsage } from '@core/types/subscription.interface';
import { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react';
import { useNotificationSocket } from './NotificationContext';

interface CompanySubscriptionContextType {
    subscription: ICompanySubscription | null;
    usage: ICompanySubscriptionUsage | null;
    setSubscription: (subscription: ICompanySubscription) => void;
    setUsage: (usage: ICompanySubscriptionUsage) => void;
    loading: boolean;
    jobPostLimitExceeded: boolean;
    applicationViewLimitExceeded: boolean;
    refetch: () => Promise<void>;
}

const CompanySubscriptionContext = createContext<CompanySubscriptionContextType | undefined>(undefined);

export const useCompanySubscription = (): CompanySubscriptionContextType => {
    const context = useContext(CompanySubscriptionContext);
    if (!context) {
        throw new Error('useSubscription must be used within a SubscriptionProvider');
    }
    return context;
};

interface SubscriptionProviderProps {
    children: ReactNode;
}

export const CompanySubscriptionProvider = ({ children }: SubscriptionProviderProps) => {
    const [subscription, setSubscription] = useState<ICompanySubscription | null>(null);
    const [usage, setUsage] = useState<ICompanySubscriptionUsage | null>(null);
    const [loading, setLoading] = useState(false);
    const [jobPostLimitExceeded, setJobPostLimitExceeded] = useState(false);
    const [applicationViewLimitExceeded, setApplicationViewLimitExceeded] = useState(false);

    const {socket} = useNotificationSocket();

    const handleJobPosted = useCallback(() => {
        setUsage((prevUsage) => 
            prevUsage ? { ...prevUsage, jobsPosted: prevUsage.jobsPosted + 1 } : prevUsage
        );
    }, []);

    const handleJobApplicationViewed = useCallback((message: any) => {
        const { job_application_id } = message;

        setUsage((prevUsage) => {
            if (!prevUsage) return prevUsage;

            const updatedApplicationIds = prevUsage.applicationIdsAccessed
                ? [...prevUsage.applicationIdsAccessed, job_application_id]
                : [job_application_id];

            return {
                ...prevUsage,
                applicantionAccessed: prevUsage.applicantionAccessed + 1,
                applicationIdsAccessed: updatedApplicationIds,
            };
        });

    }, []);

    useEffect(() => {
        if (!socket) return;

        socket.on("job-posted", handleJobPosted);
        socket.on("job-application-view-usage-updated", handleJobApplicationViewed);

        return () => {
            socket.off("job-posted", handleJobPosted);
            socket.off("job-application-view-usage-updated", handleJobApplicationViewed);
        };
    }, [socket, handleJobPosted, handleJobApplicationViewed]);

    const fetchSubscriptionData = async () => {
        setLoading(true);
        try {
            const subscriptionData = await getCompanySubscription();
            const usageData = await getCompanyUsage();

            setSubscription(subscriptionData);
            setUsage(usageData);
        } catch (error) {
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
            setJobPostLimitExceeded(
                subscription.jobPostLimit !== -1 && usage.jobsPosted + 1 > subscription.jobPostLimit
            );

            setApplicationViewLimitExceeded(
                subscription.applicantionAccessLimit !== -1 && usage.applicantionAccessed + 1 > subscription.applicantionAccessLimit
            );
        }
    }, [subscription, usage]);

    return (
        <CompanySubscriptionContext.Provider
            value={{
                subscription,
                usage,
                setSubscription,
                setUsage,
                loading,
                jobPostLimitExceeded,
                applicationViewLimitExceeded,
                refetch: fetchSubscriptionData,
            }}
        >
            {children}
        </CompanySubscriptionContext.Provider>
    );
};
