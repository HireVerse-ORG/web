import React, { useEffect, useState } from 'react';
import DocViewer from '@core/components/ui/DocViewer';
import { Box, Typography, Tabs, Tab, Skeleton, Button, CircularProgress } from '@mui/material';
import ApplicantInfoCard from '../components/ApplicationInfoCard';
import GoBackTitleButton from '@core/components/ui/GoBackTitleButton';
import { momentDateFormatter } from '@core/utils/helper';
import { IJobApplication } from '@core/types/job.application.interface';
import { acceptJobOffer, getApplicationDetails, rejectJobOffer } from '@core/api/seeker/jobApplicationApi';
import useGet from '@core/hooks/useGet';
import { useParams, useSearchParams } from 'react-router-dom';
import ApplicationInterviews from '../../shared/ApplicationInterviews';
import { toast } from 'sonner';

const MyApplicationViewPage = () => {
    const { id: applicationId } = useParams<{ id: string }>();
    const [searchParams, setSearchParams] = useSearchParams();

    const initialTab = searchParams.get("tab") || "resume";
    const [tabValue, setTabValue] = useState(initialTab);
    const [acceptingOffer, setAcceptingOffer] = useState(false);
    const [rejectingOffer, setRejectingOffer] = useState(false);

    useEffect(() => {
        const currentTab = searchParams.get("tab") || "resume";
        if (currentTab !== tabValue) {
            setTabValue(currentTab);
        }
    }, [searchParams]);

    const { data: application,
        setData: setApplication,
        loading: applicationLoading,
        error: applicationError } = useGet<IJobApplication>(() => getApplicationDetails(applicationId || ""));

    const handleTabChange = (_: React.SyntheticEvent, newTabValue: string) => {
        setTabValue(newTabValue);
        setSearchParams({ tab: newTabValue });
    };

    const handleAcceptOffer = async (applicationId: string) => {
        setAcceptingOffer(true)
        try {
            await acceptJobOffer(applicationId);
            if (application) {
                setApplication({
                    ...application,
                    status: "hired"
                })
            }
            toast.success("Offer accepted. Congratulations!");
        } catch (error) {
            toast.error("Failed to accept the offer.");
        } finally {
            setAcceptingOffer(false);
        }
    };

    const handleRejectOffer = async (applicationId: string) => {
        setRejectingOffer(true);
        try {
            await rejectJobOffer(applicationId);
            if (application) {
                setApplication({
                    ...application,
                    status: "declined"
                })
            }
            toast.info("Offer declined.");
        } catch (error) {
            toast.error("Failed to reject the offer.");
        } finally {
            setRejectingOffer(false);
        }
    };


    if (applicationLoading) {
        return (
            <Box pb={5}>
                <GoBackTitleButton title={"Your Application Details"} />
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        flexDirection: { xs: "column", sm: "row" },
                        gap: 2,
                    }}
                >
                    <Skeleton variant="rectangular" height={400} sx={{ flex: 1 }} />
                    <Skeleton variant="rectangular" height={400} sx={{ flex: 2 }} />
                </Box>
            </Box >
        );
    }

    if (!application || applicationError) {
        // Error handling
        return (
            <Box pb={5}>
                <GoBackTitleButton title={"Applicant Details"} />
                <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                    <Typography color="error" variant="h6">
                        {applicationError || "Failed to load applicant details. Please try again later."}
                    </Typography>
                </Box>
            </Box>
        );
    }

    return (
        <Box pb={5}>
            <Box display="flex" justifyContent="space-between" alignItems="center" gap={2}>
                <GoBackTitleButton title={"Your Application Details"} />
            </Box>

            <Box sx={{
                display: "flex",
                justifyContent: "space-between",
                flexDirection: { xs: "column", sm: "row" },
                gap: 2
            }}>
                {/* left */}
                <Box sx={{ minWidth: "350px" }}>
                    <ApplicantInfoCard data={{
                        fullName: application.fullName,
                        appliedJob: application.jobRole,
                        stage: application.status,
                        email: application.email,
                        phone: application.phone || "",
                        appliedDate: application.createdAt
                    }} />
                </Box>

                {/* right */}
                <Box sx={{ flexGrow: 1 }}>
                    {/* Tabs Navigation */}
                    <Tabs
                        value={tabValue}
                        onChange={handleTabChange}
                        indicatorColor="primary"
                        textColor="primary"
                    >
                        <Tab label="Resume" value={"resume"} />
                        {application.coverLetter && (
                            <Tab label="Cover Letter" value={"cover-letter"} />
                        )}
                        {application.offerLetter && (
                            <Tab label="Offer Letter" value={"offer-letter"} />
                        )}
                        <Tab label="Interview Schedules" value={"interview-schedules"} />
                    </Tabs>
                    {/* Tab Content */}
                    <Box sx={{ p: 2 }}>
                        {tabValue === "resume" && (
                            <Box>
                                {application.comment?.text && (
                                    <Box sx={{ mb: 4 }}>
                                        <Typography variant="h6" fontWeight="bold">
                                            Comment
                                        </Typography>
                                        <Box sx={{ marginTop: 1 }}>
                                            <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                                                {application.comment.text}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary" sx={{ marginTop: 1, fontStyle: 'italic' }}>
                                                {momentDateFormatter(application.comment.date)}
                                            </Typography>
                                        </Box>
                                    </Box>
                                )}

                                <DocViewer docUrl={application.resume} />

                            </Box>
                        )}

                        {/* Cover letter Tab */}
                        {application.coverLetter && tabValue === "cover-letter" && (
                            <Box>
                                <Typography variant="body1">{application.coverLetter}</Typography>
                            </Box>
                        )}

                        {tabValue === "offer-letter" && application.offerLetter && (
                            <Box sx={{ marginBottom: 2 }}>
                                {application.status === "offered" && (
                                    <Box sx={{ display: 'flex', gap: 2, mb: 2, justifyContent: 'center' }}>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() => handleAcceptOffer(application.id)}
                                            disabled={acceptingOffer || rejectingOffer}
                                        >
                                            {acceptingOffer ? <CircularProgress size={20} color='inherit' /> : "Accept Offer"}
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            color="error"
                                            onClick={() => handleRejectOffer(application.id)}
                                            disabled={acceptingOffer || rejectingOffer}
                                        >
                                            {rejectingOffer ? <CircularProgress size={20} color='inherit' /> : "Reject Offer"}
                                        </Button>
                                    </Box>
                                )}
                                <DocViewer docUrl={application.offerLetter} />
                            </Box>
                        )}

                        {tabValue === "interview-schedules" && (
                            <ApplicationInterviews applicationId={application.id} />
                        )}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default MyApplicationViewPage;
