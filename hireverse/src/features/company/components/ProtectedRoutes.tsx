import { getCompanyProfile } from "@core/api/company/profileApi";
import PageLoader from "@core/components/ui/PageLoader";
import { useCompanyContext } from "@core/contexts/CompanyContext";
import useGet from "@core/hooks/useGet";
import { ICompanyProfile } from "@core/types/company.interface";
import { Box, Typography } from "@mui/material";
import { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoute = () => {
    const { data: profile, loading } = useGet<ICompanyProfile | null>(getCompanyProfile);
    const { companyProfile, setCompanyProfile } = useCompanyContext();
    const location = useLocation();

    const excludedPaths = ["/company/settings"];
    const isExcludedPath = excludedPaths.includes(location.pathname);

    useEffect(() => {
        if (profile) {
            setCompanyProfile(profile);
        }
    }, [profile, setCompanyProfile]);

    const renderStatusMessage = (title: string, message: string) => (
        <Box sx={{ textAlign: "center", py: 4 }}>
            <Typography variant="h5" fontWeight={500} gutterBottom>
                {title}
            </Typography>
            <Typography variant="body1">{message}</Typography>
        </Box>
    );

    if (loading) {
        return <PageLoader />;
    }

    if (!loading && !companyProfile) {
        return <Navigate to="/company/profile-creation" replace state={{from: location.pathname}} />;
    }

    if (!isExcludedPath && companyProfile) {
        switch (companyProfile.status) {
            case "pending":
                return renderStatusMessage(
                    "Your company profile is pending verification.",
                    "We are reviewing your submission and will notify you once it's approved."
                );
            case "rejected":
                return renderStatusMessage(
                    "Your company profile was rejected.",
                    "Please review the submission details and resubmit your profile for verification."
                );
            case "verified":
                return <Outlet />;
            default:
                return renderStatusMessage(
                    "Unknown company profile status.",
                    "Please contact support for assistance."
                );
        }
    }

    return <Outlet />;
};

export default ProtectedRoute;
