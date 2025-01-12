import { createContext, ReactNode, useContext, useState } from "react";

interface CompanyContextType {
    hasProfile: boolean;
    setHasProfile: (hasProfile: boolean) => void;
}

const CompanyContext = createContext<CompanyContextType | undefined>(undefined);

export const CompanyProvider = ({ children }: { children: ReactNode }) => {
    const [hasProfile, setHasProfile] = useState(false);

    return (
        <CompanyContext.Provider value={{ hasProfile, setHasProfile }}>
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
