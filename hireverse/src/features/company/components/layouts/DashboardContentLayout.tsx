import ScrollableContainer from "@core/components/ui/ScrollableContainer";
import { Alert, Container, Link } from "@mui/material";
import Header from "../Header";
import { useCompanySubscription } from "@core/contexts/CompanySubscriptionContext";
import { Link as RouterLink, useLocation } from "react-router-dom";

type DashboardContentLayoutProps = {
    children: React.ReactNode;
};

const DashboardContentLayout = ({ children }: DashboardContentLayoutProps) => {
    const { jobPostLimitExceeded } = useCompanySubscription();
    const location = useLocation();
    const showJobPostAlertPaths = ["/company/post-job", "/company/edit-job", "/company/jobs"];

    return (
        <ScrollableContainer height={"100%"} overflow={"auto"} display={"flex"} flexDirection={"column"}>
            <Header />
            <Container component="section" sx={{ height: "100%", py: 3 }}>
                <>
                    {jobPostLimitExceeded && showJobPostAlertPaths.includes(location.pathname) && (
                        <Alert severity="warning" sx={{ mb: 2 }}>
                            You have reached your job posting limit.{" "}
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
                    {children}
                </>
            </Container>
        </ScrollableContainer>
    );
};

export default DashboardContentLayout;
