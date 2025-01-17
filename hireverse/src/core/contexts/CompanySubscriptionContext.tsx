import { getCompanySubscription, getCompanyUsage } from '@core/api/subscription/companySubscriptionApi';
import { ICompanySubscription, ICompanySubscriptionUsage } from '@core/types/subscription.interface';
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface CompanySubscriptionContextType {
    subscription: ICompanySubscription | null;
    usage: ICompanySubscriptionUsage | null;
    setSubscription: (subscription: ICompanySubscription) => void;
    setUsage: (usage: ICompanySubscriptionUsage) => void;
    loading: boolean;
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

    const fetchSubscriptionData = async () => {
        setLoading(true);
        try {
            const subscriptionData = await getCompanySubscription();  
            const usageData = await getCompanyUsage(); 

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
        <CompanySubscriptionContext.Provider
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
        </CompanySubscriptionContext.Provider>
    );
};
