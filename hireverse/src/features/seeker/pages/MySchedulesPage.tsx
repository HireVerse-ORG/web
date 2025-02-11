import { acceptInterview, listApplicantInterviewSchedules, rejectInterview } from "@core/api/seeker/interview";
import InterviewScheduleCard, { InterviewScheduleCardSkeleton } from "@core/components/ui/InterviewScheduleCard";
import useGet from "@core/hooks/useGet";
import { IInterviewWithApplicationDetails } from "@core/types/interview.interface";
import { IPaginationResponse } from "@core/types/pagination.interface";
import { Box, Typography, CircularProgress, Button, Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const MySchedulesPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const { data, loading, error } = useGet<IPaginationResponse<IInterviewWithApplicationDetails> | null>(
        () => listApplicantInterviewSchedules(currentPage, 10), 
        [currentPage]
    );
    
    const [schedules, setSchedules] = useState<IInterviewWithApplicationDetails[]>([]);
    const [activeButtonInterviewId, setActiveButtonInterviewId] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (data) {
            setSchedules(data.data);
        }
    }, [data]);

    const handleAccept = async (interviewId: string) => {
        setActiveButtonInterviewId(interviewId);
        try {
            await acceptInterview(interviewId);
            toast.success("Interview accepted");
            setSchedules(prev =>
                prev.map((sch) =>
                    sch.id === interviewId ? { ...sch, status: "accepted" } : sch
                )
            );
        } catch (error) {
            toast.error("Failed to accept interview");
        } finally {
            setActiveButtonInterviewId(null);
        }
    };

    const handleReject = async (interviewId: string) => {
        setActiveButtonInterviewId(interviewId);
        try {
            await rejectInterview(interviewId);
            toast.success("Interview rejected");
            setSchedules(prev =>
                prev.map((sch) =>
                    sch.id === interviewId ? { ...sch, status: "rejected" } : sch
                )
            );
        } catch (error) {
            toast.error("Failed to reject interview");
        } finally {
            setActiveButtonInterviewId(null);
        }
    };

    const handleViewApplication = (applicationId: string) => {
        navigate(`/seeker/my-application/${applicationId}`);
    };

    // Handle page change
    const handlePageChange = (_event: React.ChangeEvent<unknown>, newPage: number) => {
        setCurrentPage(newPage);
    };

    return (
        <Box sx={{ p: 2 }}>
            {loading ? (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
                    {Array.from({ length: 6 }).map((_, index) => (
                        <Box key={index} sx={{ width: "100%", maxWidth: "300px" }}>
                            <InterviewScheduleCardSkeleton />
                        </Box>
                    ))}
                </Box>
            ) : error ? (
                <Typography color="error" sx={{ textAlign: "center", padding: 2 }}>
                    Failed to load schedules. Please try again.
                </Typography>
            ) : schedules.length === 0 ? (
                <Box
                    sx={{
                        padding: 4,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "100%",
                    }}
                >
                    <Typography variant="h6" color="text.secondary">
                        No Schedules Yet
                    </Typography>
                </Box>
            ) : (
                <>
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
                        {schedules.map((interview) => (
                            <Box key={interview.id} sx={{ width: "100%", maxWidth: "300px" }}>
                                <InterviewScheduleCard
                                    data={{
                                        jobTitle: interview.application?.jobRole || "Unknown",
                                        scheduledTime: interview.scheduledTime,
                                        status: interview.status,
                                        type: interview.type,
                                        description: interview.description,
                                    }}
                                >
                                    {interview.status === "scheduled" ? (
                                        <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={() => handleAccept(interview.id)}
                                                disabled={activeButtonInterviewId !== null && activeButtonInterviewId !== interview.id}
                                            >
                                                {activeButtonInterviewId === interview.id ? (
                                                    <CircularProgress size={20} color="inherit" />
                                                ) : (
                                                    "Accept"
                                                )}
                                            </Button>
                                            <Button
                                                variant="outlined"
                                                color="error"
                                                onClick={() => handleReject(interview.id)}
                                                disabled={activeButtonInterviewId !== null && activeButtonInterviewId !== interview.id}
                                            >
                                                {activeButtonInterviewId === interview.id ? (
                                                    <CircularProgress size={20} color="inherit" />
                                                ) : (
                                                    "Reject"
                                                )}
                                            </Button>
                                        </Box>
                                    ) : (
                                        <Box sx={{ mt: 1 }}>
                                            <Button variant="contained" onClick={() => handleViewApplication(interview.application.id)}>
                                                View Application
                                            </Button>
                                        </Box>
                                    )}
                                </InterviewScheduleCard>
                            </Box>
                        ))}
                    </Box>

                    {/* Pagination */}
                    {data?.totalPages && data.totalPages > 1 && (
                        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                            <Pagination
                                count={data.totalPages}
                                page={currentPage}
                                onChange={handlePageChange}
                                color="primary"
                            />
                        </Box>
                    )}
                </>
            )}
        </Box>
    );
};

export default MySchedulesPage;
