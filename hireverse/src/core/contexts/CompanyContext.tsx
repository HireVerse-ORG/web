import { ICompanyProfile } from "@core/types/company.interface";
import { createContext, ReactNode, useContext, useState } from "react";

interface CompanyContextType {
    companyProfile: ICompanyProfile | null;
    setCompanyProfile: (profile: ICompanyProfile | null) => void;
}

const CompanyContext = createContext<CompanyContextType | undefined>(undefined);

export const CompanyProvider = ({ children }: { children: ReactNode }) => {
    const [companyProfile, setCompanyProfile] = useState<ICompanyProfile | null>(null);

    return (
        <CompanyContext.Provider value={{ companyProfile, setCompanyProfile }}>
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
