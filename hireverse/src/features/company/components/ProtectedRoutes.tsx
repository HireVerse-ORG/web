import { getCompanyProfile } from "@core/api/company/profileApi";
import PageLoader from "@core/components/ui/PageLoader";
import { useCompanyContext } from "@core/contexts/CompanyContext";
import useGet from "@core/hooks/useGet";
import { ICompanyProfile } from "@core/types/company.interface";
import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
    const {data: profile, loading} = useGet<ICompanyProfile | null>(getCompanyProfile)
    const { companyProfile, setCompanyProfile } = useCompanyContext();

    useEffect(() => {
        if(profile){
            setCompanyProfile(profile)
        }
    }, [profile])

    if(loading){
        return <PageLoader/>;
    }

    if(!loading && !companyProfile){
        return <Navigate to={"/company/profile-creation"} replace/>
    }

    return <Outlet />;
};

export default ProtectedRoute;
