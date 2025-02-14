import { cancelInterview } from "@core/api/company/interview";
import { acceptInterview, rejectInterview } from "@core/api/seeker/interview";
import { ListMyInterviewSchedules } from "@core/api/shared/interview";
import { startInterview } from "@core/api/shared/meetingApi";
import InterviewFilters, { InterviewFilterValues } from "@core/components/interview/InterviewFilters";
import InterviewScheduleCard, { InterviewScheduleCardSkeleton } from "@core/components/interview/InterviewScheduleCard";
import { useInterviewScheduleNotification } from "@core/contexts/InterviewScheduleNotification";
import useGet from "@core/hooks/useGet";
import useAppSelector from "@core/hooks/useSelector";
import { IInterviewWithApplicationDetails, InterviewStatus, InterviewType } from "@core/types/interview.interface";
import { IPaginationResponse } from "@core/types/pagination.interface";
import { VideoCall } from "@mui/icons-material";
import { Box, Typography, CircularProgress, Button, Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";

const MySchedulesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const user = useAppSelector(state => state.auth.user);

  const initialFilters: InterviewFilterValues = {
    types: searchParams.get("types")?.split("+") as InterviewType[] || [],
    statuses: searchParams.get("statuses")?.split("+") as InterviewStatus[] || [],
    upcoming: searchParams.get("upcoming") === "true",
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<InterviewFilterValues>(initialFilters);

  useEffect(() => {
    const params = new URLSearchParams();
    if (filters.types) {
      params.append("types", filters.types.join('+'))
    }
    if (filters.statuses) {
      params.append("statuses", filters.statuses.join('+'))
    }
    if (filters.upcoming) {
      params.set("upcoming", "true");
    }
    setSearchParams(params, { replace: true });
  }, [filters]);

  const { data, loading, error } = useGet<IPaginationResponse<IInterviewWithApplicationDetails> | null>(
    () =>
      ListMyInterviewSchedules({
        page: currentPage,
        limit: 6,
        types: filters.types,
        statuses: filters.statuses,
        upcoming: filters.upcoming,
      }),
    [currentPage, filters]
  );
  const [schedules, setSchedules] = useState<IInterviewWithApplicationDetails[]>([]);
  const [activeButtonInterviewId, setActiveButtonInterviewId] = useState<string | null>(null);
  const [cancelLoading, setCancelLoading] = useState<string | null>(null);
  const [meetingLoading, setMeetingLoading] = useState<boolean>(false);

  const { notifications, setNotifications } = useInterviewScheduleNotification();

  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      setSchedules(data.data);
    }
  }, [data]);

  useEffect(() => {
    if (notifications.length > 0) {
      setFilters({
        types: ['online'],
        statuses: ['accepted'],
        upcoming: false,
      })
    }
  }, [notifications])

  const handlePageChange = (_event: React.ChangeEvent<unknown>, newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleFiltersChange = (newFilters: InterviewFilterValues) => {
    setCurrentPage(1);
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setCurrentPage(1);
    setFilters({ types: [], statuses: [], upcoming: false });
    setSearchParams({}, { replace: true });
  };

  const handleAccept = async (interviewId: string) => {
    setActiveButtonInterviewId(interviewId);
    try {
      await acceptInterview(interviewId);
      toast.success("Interview accepted");
      setSchedules((prev) =>
        prev.map((sch) =>
          sch.id === interviewId ? { ...sch, status: "accepted" } : sch
        )
      );
    } catch (error) {
      toast.error(typeof error == "string" ? error : "Failed to accept interview");
    } finally {
      setActiveButtonInterviewId(null);
    }
  };

  const handleReject = async (interviewId: string) => {
    setActiveButtonInterviewId(interviewId);
    try {
      await rejectInterview(interviewId);
      toast.success("Interview rejected");
      setSchedules((prev) =>
        prev.map((sch) =>
          sch.id === interviewId ? { ...sch, status: "rejected" } : sch
        )
      );
    } catch (error) {
      toast.error(typeof error == "string" ? error : "Failed to reject interview");
    } finally {
      setActiveButtonInterviewId(null);
    }
  };

  const handleViewApplication = (applicationId: string) => {
    if (user?.role === "seeker") {
      navigate(`/seeker/my-application/${applicationId}`);
    } else if (user?.role === "company") {
      navigate(`/company/applicant/${applicationId}`);
    }
  };

  const handleCancel = async (interviewId: string) => {
    setCancelLoading(interviewId);
    try {
      await cancelInterview(interviewId);
      if (data) {
        setSchedules((prev) =>
          prev.filter((sch) =>
            sch.id !== interviewId
          )
        );
      }
      toast.success("Interview canceled successfully!");
    } catch (error) {
      toast.error(typeof error == "string" ? error : "Failed to cancel interview schedule");
    } finally {
      setCancelLoading(null);
    }
  };

  const handleStartMeeting = async (interviewId: string) => {
    setMeetingLoading(true);
    try {
      const meeting = await startInterview({ interviewId });
      setNotifications((prev) => {
        const existingIndex = prev.findIndex((n) => n.interviewId === interviewId);
        if (existingIndex !== -1) {
          const updated = [...prev];
          updated[existingIndex] = { roomId: meeting.roomId, interviewId };
          return updated;
        }
        return [...prev, { roomId: meeting.roomId, interviewId }];
      });
      window.open(`/meeting/${meeting.roomId}`, "_self");
    } catch (error) {
      console.log(error);
    } finally {
      setMeetingLoading(false);
    }
  }

  return (
    <Box sx={{ p: 2 }}>
      {/* Filter UI */}
      <InterviewFilters
        filters={filters}
        onFiltersChange={handleFiltersChange}
        onClearFilters={handleClearFilters}
        availableStatuses={
          user?.role === "seeker"
            ? ["accepted", "rejected", "scheduled"]
            : user?.role === "company"
              ? ["accepted", "rejected", "scheduled", "expired"]
              : []
        }
      />

      {loading ? (
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
          {Array.from({ length: 6 }).map((_, index) => (
            <Box key={index} sx={{ width: "100%", maxWidth: "300px" }}>
              <InterviewScheduleCardSkeleton />
            </Box>
          ))}
        </Box>
      ) : error ? (
        <Typography color="error" sx={{ textAlign: "center", p: 2 }}>
          Failed to load schedules. Please try again.
        </Typography>
      ) : schedules.length === 0 ? (
        <Box
          sx={{
            p: 4,
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
            {schedules.map((interview) => {

              const ongoing = notifications.find(nt => nt.interviewId === interview.id);

              return (
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
                    {user?.role === "seeker" && (
                      <>
                        <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
                          {interview.status === "scheduled" ? (
                            <>
                              <Button
                                size="small"
                                fullWidth
                                variant="contained"
                                color="primary"
                                onClick={() => handleAccept(interview.id)}
                                disabled={
                                  activeButtonInterviewId !== null &&
                                  activeButtonInterviewId !== interview.id
                                }
                              >
                                {activeButtonInterviewId === interview.id ? (
                                  <CircularProgress size={20} color="inherit" />
                                ) : (
                                  "Accept"
                                )}
                              </Button>
                              <Button
                                size="small"
                                fullWidth
                                variant="outlined"
                                color="error"
                                onClick={() => handleReject(interview.id)}
                                disabled={
                                  activeButtonInterviewId !== null &&
                                  activeButtonInterviewId !== interview.id
                                }
                              >
                                {activeButtonInterviewId === interview.id ? (
                                  <CircularProgress size={20} color="inherit" />
                                ) : (
                                  "Reject"
                                )}
                              </Button>
                            </>
                          ) : (
                            <Button
                              size="small"
                              fullWidth
                              variant="outlined"
                              onClick={() =>
                                handleViewApplication(interview.application.id)
                              }
                              sx={{ textWrap: "nowrap" }}
                            >
                              View Application
                            </Button>
                          )}
                        </Box>
                      </>
                    )}

                    {user?.role === "company" && (
                      <>
                        <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
                          {!['expired', 'rejected', 'completed'].includes(interview.status) && (
                            <Button
                              size="small"
                              fullWidth
                              variant="outlined"
                              color="error"
                              onClick={() => handleCancel(interview.id)}
                              disabled={cancelLoading === interview.id}
                            >
                              {cancelLoading === interview.id ? (
                                <CircularProgress size={20} color="inherit" />
                              ) : (
                                "Cancel"
                              )}
                            </Button>
                          )}
                          <Button
                            size="small"
                            fullWidth
                            variant="outlined"
                            onClick={() =>
                              handleViewApplication(interview.application.id)
                            }
                            sx={{ textWrap: "nowrap" }}
                          >
                            View Application
                          </Button>
                        </Box>
                        {interview.status === "accepted" && interview.type === "online" && !ongoing && (
                          <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            startIcon={<VideoCall />}
                            onClick={() => handleStartMeeting(interview.id)}
                            disabled={meetingLoading}
                            sx={{ mt: 1 }}
                          >
                            {meetingLoading ? <CircularProgress size={20} color="inherit" /> : "Start Meeting"}
                          </Button>
                        )}
                      </>
                    )}

                    {ongoing && (
                      <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        startIcon={<VideoCall />}
                        onClick={() => window.open(`/meeting/${ongoing.roomId}`, "_self")}
                        sx={{ mt: 1 }}
                      >
                        Join Meeting
                      </Button>
                    )}
                  </InterviewScheduleCard>
                </Box>
              )
            })}
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
