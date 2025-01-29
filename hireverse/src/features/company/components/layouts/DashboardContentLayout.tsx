import ScrollableContainer from "@core/components/ui/ScrollableContainer";
import { Alert, Box, Link } from "@mui/material";
import Header from "../Header";
import { useCompanySubscription } from "@core/contexts/CompanySubscriptionContext";
import { Link as RouterLink, useLocation } from "react-router-dom";

type DashboardContentLayoutProps = {
    children: React.ReactNode;
};

const DashboardContentLayout = ({ children }: DashboardContentLayoutProps) => {
    const { jobPostLimitExceeded, applicationViewLimitExceeded } = useCompanySubscription();
    const location = useLocation();

    const showJobPostAlertPaths = ["/company/post-job", "/company/edit-job", "/company/jobs"];
    const isJobPostPath = showJobPostAlertPaths.includes(location.pathname);
    
    const jobApplicationPathRegex = /^\/company\/job\/[^/]+$|^\/company\/applicants$/;
    const isJobApplicationPath = jobApplicationPathRegex.test(location.pathname);

    return (
        <ScrollableContainer height={"100%"} overflow={"auto"} display={"flex"} flexDirection={"column"}>
            <Header />
            <Box component="section" sx={{ height: "100%", p: 3 }}>
                <>
                    {jobPostLimitExceeded && isJobPostPath && (
                        <Alert severity="warning" sx={{ mb: 2 }}>
                            You have reached your job posting limit. {" "}
                            <Link
                                component={RouterLink}
                                to="/company/pricing-plans"
                                underline="hover"
                                sx={{ fontWeight: "bold", color: "primary.main" }}
                            >
                                Upgrade your plan
                            </Link>{" "}
                            to post more jobs.
                        </Alert>
                    )}

                    {applicationViewLimitExceeded && isJobApplicationPath && (
                        <Alert severity="warning" sx={{ mb: 2 }}>
                            You have reached your limit for viewing job applications. {" "}
                            <Link
                                component={RouterLink}
                                to="/company/pricing-plans"
                                underline="hover"
                                sx={{ fontWeight: "bold", color: "primary.main" }}
                            >
                                Upgrade your plan
                            </Link>{" "}
                            to unlock more applications. <br></br> You can still access previously viewed applications.
                        </Alert>
                    )}
                    {children}
                </>
            </Box>
        </ScrollableContainer>
    );
};

export default DashboardContentLayout;
