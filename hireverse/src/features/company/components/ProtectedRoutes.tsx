import PageLoader from "@core/components/ui/PageLoader";
import { useCompanyContext } from "@core/contexts/CompanyContext";
import { Box, Typography } from "@mui/material";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoute = () => {
    const { companyProfile, loading } = useCompanyContext();
    const location = useLocation();

    const excludedPaths = ["/company/settings", "/company/profile"];
    const isExcludedPath = excludedPaths.includes(location.pathname);

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
