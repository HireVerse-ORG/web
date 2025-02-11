import { useState } from "react";
import { cancelInterview } from "@core/api/company/interview";
import { acceptInterview, rejectInterview } from "@core/api/seeker/interview";
import { listApplicationInterviews } from "@core/api/shared/interview";
import InterviewScheduleCard from "@core/components/ui/InterviewScheduleCard";
import useGet from "@core/hooks/useGet";
import useAppSelector from "@core/hooks/useSelector";
import { IInterview } from "@core/types/interview.interface";
import { Alert, Box, Button, Typography, Skeleton, CircularProgress } from "@mui/material";
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

    // Loading state
    if (loading) return (
        <Box>
            {[1, 2].map((i) => (
                <Box key={i} mb={2} p={2} border={1} borderColor="grey.300" borderRadius={2}>
                    <Skeleton variant="text" width="40%" height={30} />
                    <Skeleton variant="text" width="60%" height={24} />
                    <Skeleton variant="text" width="60%" height={24} />
                    <Skeleton variant="text" width="60%" height={24} />
                    <Box mt={2} display="flex" gap={1}>
                        <Skeleton variant="rectangular" width={100} height={36} />
                        <Skeleton variant="rectangular" width={100} height={36} />
                    </Box>
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

    return (
        <Box>
            {interviews.map((interview) => (
                <InterviewScheduleCard key={interview.id} data={{
                    scheduledTime: interview.scheduledTime,
                    type: interview.type,
                    status: interview.status,
                    description: interview.description,
                }}>
                    {(user?.role === 'seeker' || user?.role === 'company') && interview.status === 'scheduled' && (
                        <Box mt={2} display="flex" gap={1}>
                            {user?.role === 'seeker' && (
                                <>
                                    <Button
                                        variant="contained"
                                        size="small"
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

                            {user?.role === 'company' && (
                                <Button
                                    variant="outlined"
                                    size="small"
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
                            )}
                        </Box>
                    )}
                </InterviewScheduleCard>
            ))}
        </Box>
    );
};

export default ApplicationInterviews;