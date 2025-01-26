import React from 'react';
import Header from '../Header';
import ScrollableContainer from '@core/components/ui/ScrollableContainer';
import { Alert, Container, Link } from '@mui/material';
import { useSeekerSubscription } from '@core/contexts/SeekerSubscriptionContext';
import { Link as RouterLink, useLocation } from "react-router-dom";

type ContentLayoutProps = {
    children: React.ReactNode;
};

const ContentLayout = ({ children }: ContentLayoutProps) => {
    const { jobApplicationLimitExceeded } = useSeekerSubscription();
    const location = useLocation();
    const showJobApplyAlertPaths = ["/seeker/my-applications"];
    return (
        <ScrollableContainer height={"100%"} overflow={"auto"} display={"flex"} flexDirection={"column"}>
            <Header />
            <Container component="section" sx={{ height: "100%", py: 3 }}>
                <>
                    {jobApplicationLimitExceeded && showJobApplyAlertPaths.includes(location.pathname) && (
                        <Alert severity="warning" sx={{ mb: 2 }}>
                            You have reached your job apply limit.{" "}
                            <Link
                                component={RouterLink}
                                to="/seeker/pricing-plans"
                                underline="hover"
                                sx={{ fontWeight: "bold", color: "primary.main" }}
                            >
                                Upgrade your plan
                            </Link>{" "}
                            to apply for more jobs.
                        </Alert>
                    )}
                    {children}
                </>
            </Container>
        </ScrollableContainer>
    );
}

export default ContentLayout;
