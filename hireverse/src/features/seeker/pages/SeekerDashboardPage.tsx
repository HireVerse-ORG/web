import React, { useEffect, useState } from "react";
import { Box, Typography, Paper, Alert, Grid2, capitalize } from "@mui/material";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Work, Event, Subscriptions } from "@mui/icons-material";
import MetricSkeleton from "@core/components/ui/MetricSkeleton";
import ChartSkeleton from "@core/components/ui/ChartSkeleton";
import { useSeekerSubscription } from "@core/contexts/SeekerSubscriptionContext";
import { getMyInterviewStatistics, getMyJobApplicationStatistics } from "@core/api/seeker/statisticsApi";
import { SeekerJobApplicationStatistics } from "@core/types/statistics.interface";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const SeekerDashboardPage: React.FC = () => {
    const {subscription} = useSeekerSubscription();
    const [jobApplicationStatistics, setJobApplicationStatistics] = useState<SeekerJobApplicationStatistics | null>(null);
    
    const [loading, setLoading] = useState(true);
    const [upcomingInterviews, setUpcomingInterviews] = useState(3);
    const [error, setError] = useState<string | null>(null);
    

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);

            try {
                const [applicationStats, interviewStats] = await Promise.all([
                    getMyJobApplicationStatistics(),
                    getMyInterviewStatistics()
                ]);

                setJobApplicationStatistics(applicationStats);
                setUpcomingInterviews(interviewStats.upcomingInterviewCount);
            } catch (error) {
                setError('Failed to load dashboard data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <Box>
            {error && (
                <Alert severity="error" sx={{ mb: 3 }}>
                    {error}
                </Alert>
            )}

            <Grid2 container spacing={3}>
                {/* Metrics Cards */}
                <Grid2 size={{ xs: 12, md: 4 }}>
                    <Paper sx={{
                        p: 3,
                        bgcolor: 'primary.main',
                        color: 'primary.contrastText',
                        boxShadow: 0
                    }}>
                        {loading ? (
                            <MetricSkeleton />
                        ) : (
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Work sx={{ fontSize: 40 }} />
                                <Box>
                                    <Typography variant="subtitle1">Total Applications</Typography>
                                    <Typography variant="h4">
                                        {jobApplicationStatistics?.totalApplications.toLocaleString() ?? 'N/A'}
                                    </Typography>
                                </Box>
                            </Box>
                        )}
                    </Paper>
                </Grid2>

                <Grid2 size={{ xs: 12, md: 4 }}>
                    <Paper sx={{
                        p: 3,
                        bgcolor: 'secondary.main',
                        color: 'secondary.contrastText',
                        boxShadow: 0
                    }}>
                        {loading ? (
                            <MetricSkeleton />
                        ) : (
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Event sx={{ fontSize: 40 }} />
                                <Box>
                                    <Typography variant="subtitle1">Upcoming Interviews</Typography>
                                    <Typography variant="h4">
                                        {upcomingInterviews.toLocaleString() ?? 'N/A'}
                                    </Typography>
                                </Box>
                            </Box>
                        )}
                    </Paper>
                </Grid2>

                <Grid2 size={{ xs: 12, md: 4 }}>
                    <Paper sx={{
                        p: 3,
                        bgcolor: 'success.main',
                        color: 'success.contrastText',
                        boxShadow: 0
                    }}>
                        {loading ? (
                            <MetricSkeleton />
                        ) : (
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Subscriptions sx={{ fontSize: 40 }} />
                                <Box>
                                    <Typography variant="subtitle1">Subscription Plan</Typography>
                                    <Typography variant="h4">{subscription?.plan ? capitalize(subscription.plan) : "N/A"}</Typography>
                                </Box>
                            </Box>
                        )}
                    </Paper>
                </Grid2>

                {/* Charts Section */}
                <Grid2 size={{ xs: 12 }} container spacing={3} sx={{ mt: 2 }} gap={2}>
                    <Grid2 size={{ xs: 12, md: 6 }}>
                        <Paper sx={{
                            height: 400,
                            borderRadius: 2,
                            boxShadow: 0
                        }}>
                            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                                Application Trend
                            </Typography>
                            {loading ? (
                                <ChartSkeleton />
                            ) : error ? (
                                <Box height={300} display="flex" alignItems="center" justifyContent="center">
                                    <Typography color="error">Application data unavailable</Typography>
                                </Box>
                            ) : (
                                <ResponsiveContainer width="100%" height={300}>
                                    <LineChart data={jobApplicationStatistics?.jobApplicationTrend || []}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="month" />
                                        <YAxis />
                                        <Tooltip />
                                        <Line type="monotone" dataKey="count" stroke="#8884d8" strokeWidth={2} />
                                    </LineChart>
                                </ResponsiveContainer>
                            )}
                        </Paper>
                    </Grid2>

                    <Grid2 size={{ xs: 12, md: 6 }}>
                        <Paper sx={{
                            height: 400,
                            borderRadius: 2,
                            boxShadow: 0
                        }}>
                            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                                Application Status Breakdown
                            </Typography>
                            {loading ? (
                                <ChartSkeleton />
                            ) : error ? (
                                <Box height={300} display="flex" alignItems="center" justifyContent="center">
                                    <Typography color="error">Applications data unavailable</Typography>
                                </Box>
                            ) : (
                                <ResponsiveContainer width="100%" height={300}>
                                    <PieChart>
                                        <Pie data={jobApplicationStatistics?.jobApplicationStatus} dataKey="count" nameKey="status" cx="50%" cy="50%" outerRadius={80} label>
                                            {jobApplicationStatistics?.jobApplicationStatus.map((_, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                    </PieChart>
                                </ResponsiveContainer>
                            )}
                        </Paper>
                    </Grid2>
                </Grid2>
            </Grid2>
        </Box>
    );
};

export default SeekerDashboardPage;
