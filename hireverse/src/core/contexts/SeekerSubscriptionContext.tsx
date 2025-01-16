import { getSeekerSubscription, getSeekerUsage } from '@core/api/subscription/seekerSubscriptionApi';
import { ISeekerSubscription, ISeekerSubscriptionUsage } from '@core/types/subscription.interface';
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface SeekerSubscriptionContextType {
    subscription: ISeekerSubscription | null;
    usage: ISeekerSubscriptionUsage | null;
    setSubscription: (subscription: ISeekerSubscription) => void;
    setUsage: (usage: ISeekerSubscriptionUsage) => void;
    loading: boolean;
    refetch: () => Promise<void>;
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


    return (
        <SeekerSubscriptionContext.Provider
            value={{
                subscription,
                usage,
                setSubscription,
                setUsage,
                loading,
                refetch: fetchSubscriptionData
            }}
        >
            {children}
        </SeekerSubscriptionContext.Provider>
    );
};
