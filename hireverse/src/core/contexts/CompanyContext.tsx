import { getCompanyProfile } from "@core/api/company/profileApi";
import { ICompanyProfile } from "@core/types/company.interface";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

interface CompanyContextType {
    companyProfile: ICompanyProfile | null;
    setCompanyProfile: (profile: ICompanyProfile | null) => void;
    loading: boolean;
    fetched: boolean;
}

const CompanyContext = createContext<CompanyContextType | undefined>(undefined);

export const CompanyProvider = ({ children }: { children: ReactNode }) => {
    const [companyProfile, setCompanyProfile] = useState<ICompanyProfile | null>(null);
    const [loading, setLoading] = useState(false);
    const [fetched, setfetched] = useState(false);

    const fetchProfile = async () => {
        setLoading(true);
        setfetched(false);
        try {
            const profile = await getCompanyProfile();
            setCompanyProfile(profile);
        } catch (error) {
            setCompanyProfile(null);
        } finally {
            setLoading(false);
            setfetched(true);
        }
    }

    useEffect(() => {
        fetchProfile();
    }, []);

    return (
        <CompanyContext.Provider value={{ companyProfile, setCompanyProfile, loading, fetched }}>
            {children}
        </CompanyContext.Provider>
    );
};

export const useCompanyContext = () => {
    const context = useContext(CompanyContext);
    if (!context) {
        throw new Error("useCompanyContext must be used within CompanyProvider");
    }
    return context;
};
