import { useState } from "react";
import { cancelInterview, completeInterview } from "@core/api/company/interview";
import { acceptInterview, rejectInterview } from "@core/api/seeker/interview";
import { listApplicationInterviews } from "@core/api/shared/interview";
import InterviewScheduleCard, { InterviewScheduleCardSkeleton } from "@core/components/interview/InterviewScheduleCard";
import useGet from "@core/hooks/useGet";
import useAppSelector from "@core/hooks/useSelector";
import { IInterview } from "@core/types/interview.interface";
import { Alert, Box, Button, Typography, CircularProgress } from "@mui/material";
import { toast } from "sonner";

type ApplicationInterviewsProps = {
    applicationId: string;
}

const ApplicationInterviews = ({ applicationId }: ApplicationInterviewsProps) => {
    const { data, setData, loading, error } = useGet<{ data: IInterview[] } | null>(() => listApplicationInterviews(applicationId));
    const user = useAppSelector(state => state.auth.user);

    // Loading states for actions
    const [acceptLoading, setAcceptLoading] = useState<string | null>(null);
    const [rejectLoading, setRejectLoading] = useState<string | null>(null);
    const [cancelLoading, setCancelLoading] = useState<string | null>(null);
    const [completedLoading, setcompletedLoading] = useState<string | null>(null);

    // Loading state
    if (loading) return (
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
            {Array.from({ length: 3 }).map((_, index) => (
                <Box key={index} sx={{ width: "100%", maxWidth: "300px" }}>
                    <InterviewScheduleCardSkeleton />
                </Box>
            ))}
        </Box>
    );

    if (error) return <Alert severity="error" sx={{ my: 2 }}>{error}</Alert>;
    if (!data || data.data.length === 0) return (
        <Typography variant="body1" color="text.secondary">
            No interviews scheduled yet.
        </Typography>
    );

    const interviews = data.data;

    const handleAccept = async (interviewId: string) => {
        setAcceptLoading(interviewId);
        try {
            await acceptInterview(interviewId);
            if (data) {
                setData({
                    ...data,
                    data: data.data.map(interview =>
                        interview.id === interviewId ? { ...interview, status: 'accepted' } : interview
                    ),
                });
            }
            toast.success("Interview accepted successfully!");
        } catch (error) {
            toast.error("Failed to accept interview schedule");
        } finally {
            setAcceptLoading(null);
        }
    };

    const handleReject = async (interviewId: string) => {
        setRejectLoading(interviewId);
        try {
            await rejectInterview(interviewId);
            if (data) {
                setData({
                    ...data,
                    data: data.data.map(interview =>
                        interview.id === interviewId ? { ...interview, status: 'rejected' } : interview
                    ),
                });
            }
            toast.success("Interview rejected successfully!");
        } catch (error) {
            toast.error("Failed to reject interview schedule");
        } finally {
            setRejectLoading(null);
        }
    };

    const handleCancel = async (interviewId: string) => {
        setCancelLoading(interviewId);
        try {
            await cancelInterview(interviewId);
            if (data) {
                setData({
                    ...data,
                    data: data.data.filter(interview =>
                        interview.id !== interviewId
                    ),
                });
            }
            toast.success("Interview canceled successfully!");
        } catch (error) {
            toast.error("Failed to cancel interview schedule");
        } finally {
            setCancelLoading(null);
        }
    };

    const handleCompleted = async (interviewId: string) => {
        setcompletedLoading(interviewId);
        try {
            await completeInterview(interviewId);
            if (data) {
                setData({
                    ...data,
                    data: data.data.map(interview =>
                        interview.id === interviewId ? { ...interview, status: 'completed' } : interview
                    ),
                });
            }
            toast.success("Interview completed successfully!");
        } catch (error) {
            toast.error("Failed to completed interview schedule");
        } finally {
            setcompletedLoading(null);
        }
    };

    return (
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            {interviews.map((interview) => (
                <Box key={interview.id} sx={{ width: "100%", maxWidth: "300px" }}>
                    <InterviewScheduleCard data={{
                        scheduledTime: interview.scheduledTime,
                        type: interview.type,
                        status: interview.status,
                        description: interview.description,
                    }}>
                        {user?.role === 'seeker' && interview.status === 'scheduled' && (
                            <Box display="flex" gap={1}>
                                {user?.role === 'seeker' && (
                                    <>
                                        <Button
                                            variant="contained"
                                            size="small"
                                            fullWidth
                                            onClick={() => handleAccept(interview.id)}
                                            disabled={!!acceptLoading || !!rejectLoading}
                                        >
                                            {acceptLoading === interview.id ? (
                                                <CircularProgress size={20} color="inherit" />
                                            ) : (
                                                "Accept"
                                            )}
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            size="small"
                                            fullWidth
                                            color="error"
                                            onClick={() => handleReject(interview.id)}
                                            disabled={!!acceptLoading || !!rejectLoading}
                                        >
                                            {rejectLoading === interview.id ? (
                                                <CircularProgress size={20} color="inherit" />
                                            ) : (
                                                "Reject"
                                            )}
                                        </Button>
                                    </>
                                )}
                            </Box>
                        )}
                        {user?.role === 'company' && (
                            <Box display="flex" gap={1}>
                                {!['expired', 'rejected', 'completed'].includes(interview.status) && (
                                    <>
                                        <Button
                                            variant="outlined"
                                            size="small"
                                            fullWidth
                                            color="error"
                                            onClick={() => handleCancel(interview.id)}
                                            disabled={!!cancelLoading}
                                        >
                                            {cancelLoading === interview.id ? (
                                                <CircularProgress size={20} color="inherit" />
                                            ) : (
                                                "Cancel"
                                            )}
                                        </Button>
                                        <Button
                                            variant="contained"
                                            size="small"
                                            fullWidth
                                            color="success"
                                            onClick={() => handleCompleted(interview.id)}
                                            disabled={!!completedLoading}
                                        >
                                            {completedLoading === interview.id ? (
                                                <CircularProgress size={20} color="inherit" />
                                            ) : (
                                                "Completed"
                                            )}
                                        </Button>
                                    </>
                                )}
                            </Box>
                        )}
                    </InterviewScheduleCard>
                </Box>
            ))}
        </Box>
    );
};

export default ApplicationInterviews;