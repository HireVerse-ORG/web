import React, { useEffect, useState } from "react";
import { Box, Typography, Tabs, Tab, TextField, Button, CircularProgress } from "@mui/material";
import colors from "@core/theme/colors";
import DocViewer from "@core/components/ui/DocViewer";
import { JobApplicationStatus } from "@core/types/job.application.interface";
import HiringProgress from "./HiringProgress";
import { addCommentToApplication, updateJobApplicationStatus } from "@core/api/company/jobApplicationApi";
import { toast } from "sonner";
import { momentDateFormatter } from "@core/utils/helper";

type ApplicantDetailTabCardProps = {
    data: {
        applicationId: string;
        resume: string;
        ResumeComment?: {
            text: string,
            date: Date,
        };
        hiringProgress: JobApplicationStatus;
        coverLetter?: string;
        declinedReason?: string;
    };

    onStatusChanged: (status: JobApplicationStatus) => void;
};

const ApplicantDetailTabCard = ({ data, onStatusChanged }: ApplicantDetailTabCardProps) => {
    const [comment, setComment] = useState<string>(data?.ResumeComment?.text || "");
    const [selectedTab, setSelectedTab] = useState("resume");
    const [loading, setLoading] = useState(false);
    const [existingComment, setExistingComment] = useState<{
        text: string,
        date: Date,
    } | null>(null);

    const [changingStatus, setChangingStatus] = useState(false);
    const [status, seStatus] = useState<JobApplicationStatus>(data.hiringProgress);
    const [declinedReason, setDeclinedReason] = useState<string | undefined>(data.declinedReason);


    useEffect(() => {
        if (data.ResumeComment?.text) {
            setExistingComment(data.ResumeComment);
        }
    }, [data.ResumeComment])

    const { resume, hiringProgress, coverLetter, applicationId } = data;

    const handleTabChange = (_: React.SyntheticEvent, newValue: string) => {
        setSelectedTab(newValue);
    };

    const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setComment(event.target.value);
    };

    const handleSubmitComment = async () => {
        setLoading(true);
        try {
            const date = new Date();
            await addCommentToApplication(applicationId, comment);
            setExistingComment({ text: comment, date });
            setComment("");
            toast.success("Comment submitted successfully!");
        } catch (error) {
            toast.error("Failed to submit comment.");
        } finally {
            setLoading(false);
        }
    };

    const handleNextStage = async (nextStage: JobApplicationStatus) => {
        setChangingStatus(true)
        try {
            await updateJobApplicationStatus(applicationId, { status: nextStage });
            onStatusChanged(nextStage);
            seStatus(nextStage);
            toast.success("Appliation stage changed");
        } catch (error) {
            toast.error("Failed go to next stage.");
        } finally {
            setChangingStatus(false)
        }
    }
    const handleDecline = async (reason?: string) => {
        setChangingStatus(true)
        try {
            await updateJobApplicationStatus(applicationId, { status: "declined", reason });
            onStatusChanged("declined");
            seStatus("declined");
            setDeclinedReason(reason);
            toast.success("Appliation declined");
        } catch (error) {
            toast.error("Failed go to decline aplication.");
        } finally {
            setChangingStatus(false)
        }
    }

    return (
        <Box sx={{
            backgroundColor: "white",
            border: `1px solid ${colors.borderColour}`,
            minWidth: "300px",
            minHeight: "100%",
        }}>
            {/* Tab Section */}
            <Tabs
                value={selectedTab}
                onChange={handleTabChange}
                indicatorColor="primary"
                textColor="primary"
            >
                <Tab label="Resume" value={"resume"} />
                {coverLetter && (
                    <Tab label="Cover Letter" value={"cover-letter"} />
                )}
                <Tab label="Hiring Progress" value={"hiring-progress"} />
                <Tab label="Interview Schedule" value={"interview-schedule"} />
            </Tabs>

            {/* Content Section */}
            <Box sx={{
                padding: 2,
            }}>
                {/* Resume Tab */}
                {selectedTab === "resume" && (
                    <Box>
                        {/* Resume Viewer */}
                        <Box sx={{ marginBottom: 2 }}>
                            <DocViewer docUrl={resume} />
                        </Box>

                        {/* Comment Section */}
                        <Box sx={{ marginTop: 3 }}>
                            {existingComment ? (
                                <>
                                    <Typography variant="h6" fontWeight="bold">
                                        Comment
                                    </Typography>
                                    <Box sx={{ marginTop: 2 }}>
                                        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                                            {existingComment.text}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" sx={{ marginTop: 1, fontStyle: 'italic' }}>
                                            {momentDateFormatter(existingComment.date)}
                                        </Typography>
                                    </Box>
                                </>
                            ) : hiringProgress !== "declined" && (
                                <>
                                    <Typography variant="h6" fontWeight="bold">
                                        Leave a Comment
                                    </Typography>

                                    <TextField
                                        fullWidth
                                        multiline
                                        rows={4}
                                        value={comment}
                                        onChange={handleCommentChange}
                                        placeholder="Add your comment here..."
                                        sx={{ marginTop: 2 }}
                                    />
                                    <Box sx={{ marginTop: 2 }}>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={handleSubmitComment}
                                            disabled={loading}
                                        >
                                            {loading ? (
                                                <CircularProgress size={24} color="inherit" />
                                            ) : (
                                                "Submit Comment"
                                            )}
                                        </Button>
                                    </Box>
                                </>
                            )}
                        </Box>
                    </Box>
                )}

                {/* Cover letter Tab */}
                {coverLetter && selectedTab === "cover-letter" && (
                    <Box>
                        <Typography variant="body1">{coverLetter}</Typography>
                    </Box>
                )}

                {/* Hiring Progress Tab */}
                {selectedTab === "hiring-progress" && (
                    <>
                        <HiringProgress
                            hiringStage={status}
                            onMoveToNextStep={handleNextStage}
                            onDeclineApplication={handleDecline}
                            disabled={changingStatus}
                        />

                        {status === "declined" && declinedReason && (
                            <Box sx={{ marginTop: 2 }}>
                                <Typography variant="body1" fontWeight="bold" color="error">
                                    Declined Reason:
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ marginTop: 1 }}>
                                    {declinedReason}
                                </Typography>
                            </Box>
                        )}
                    </>
                )}

                {/* Interview Schedule Tab */}
                {selectedTab === "interview-schedule" && (
                    <Box>
                        <Typography variant="body1" fontWeight="bold" >
                            Interview Schedules
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ marginTop: 1 }}>
                            {"No interview scheduled"}
                        </Typography>
                    </Box>
                )}

            </Box>
        </Box>
    );
};

export default ApplicantDetailTabCard;
