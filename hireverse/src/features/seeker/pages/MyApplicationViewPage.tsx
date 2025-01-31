import React, { useState } from 'react';
import DocViewer from '@core/components/ui/DocViewer';
import { Box, Typography, Tabs, Tab, Skeleton } from '@mui/material';
import ApplicantInfoCard from '../components/ApplicationInfoCard';
import GoBackTitleButton from '@core/components/ui/GoBackTitleButton';
import { momentDateFormatter } from '@core/utils/helper';
import { IJobApplication } from '@core/types/job.application.interface';
import { getApplicationDetails } from '@core/api/seeker/jobApplicationApi';
import useGet from '@core/hooks/useGet';
import { useParams } from 'react-router-dom';

const MyApplicationViewPage = () => {
    const { id: applicationId } = useParams<{ id: string }>();
    const [tabValue, setTabValue] = useState("resume");

    const { data: application,
        loading: applicationLoading,
        error: applicationError } = useGet<IJobApplication>(() => getApplicationDetails(applicationId || ""));



    const handleTabChange = (_: React.SyntheticEvent, newtabValue: string) => {
        setTabValue(newtabValue);
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
                <Box sx={{minWidth: "350px"}}>
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
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default MyApplicationViewPage;
