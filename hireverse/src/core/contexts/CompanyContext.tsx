import { getCompanyProfile } from "@core/api/company/profileApi";
import useGet from "@core/hooks/useGet";
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
    const [fetched, setfetched] = useState(false);
    const { data, loading } = useGet<ICompanyProfile | null>(getCompanyProfile);

    useEffect(() => {
        if (data) {
            setCompanyProfile(data);
            setfetched(true);
        }
    }, [data]);

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
