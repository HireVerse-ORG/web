import React, { useEffect, useState } from "react";
import { Box, Typography, Grid2, Paper, Alert, capitalize } from "@mui/material";
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, BarChart, Bar } from "recharts";
import MetricSkeleton from "@core/components/ui/MetricSkeleton";
import { Assignment, Subscriptions, Work } from "@mui/icons-material";
import ChartSkeleton from "@core/components/ui/ChartSkeleton";
import { useCompanySubscription } from "@core/contexts/CompanySubscriptionContext";
import { getMyJobApplicationStatistics, getMyJobStatistics } from "@core/api/company/statisticsApi";
import { CompanyJobApplicationStatistics, CompanyJobStatistics } from "@core/types/statistics.interface";

const CompanyDashboardPage: React.FC = () => {
    const { subscription } = useCompanySubscription();
    const [jobStatistics, setJobStatistics] = useState<CompanyJobStatistics | null>(null);
    const [jobApplicationStatistics, setJobApplicationStatistics] = useState<CompanyJobApplicationStatistics | null>(null);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);

            try {
                const [jobStats, applicationStats] = await Promise.all([
                    getMyJobStatistics(),
                    getMyJobApplicationStatistics()
                ]);

                setJobStatistics(jobStats);
                setJobApplicationStatistics(applicationStats);
            } catch (error) {
                setError('Failed to load dashboard data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <Box sx={{ flexGrow: 1 }}>
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
                                    <Typography variant="subtitle1">Total Jobs Posted</Typography>
                                    <Typography variant="h4">
                                        {jobStatistics?.jobPosted.toLocaleString() ?? 'N/A'}
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
                                <Assignment sx={{ fontSize: 40 }} />
                                <Box>
                                    <Typography variant="subtitle1">Total Applications</Typography>
                                    <Typography variant="h4">
                                        {jobApplicationStatistics?.joApplications.toLocaleString() ?? 'N/A'}
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
                                Job Post Trend
                            </Typography>
                            {loading ? (
                                <ChartSkeleton />
                            ) : error ? (
                                <Box height={300} display="flex" alignItems="center" justifyContent="center">
                                    <Typography color="error">Job Post data unavailable</Typography>
                                </Box>
                            ) : (
                                <ResponsiveContainer width="100%" height={300}>
                                    <LineChart data={jobStatistics?.jobPostTrend}>
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
                                Application Trend
                            </Typography>
                            {loading ? (
                                <ChartSkeleton />
                            ) : error ? (
                                <Box height={300} display="flex" alignItems="center" justifyContent="center">
                                    <Typography color="error">Applications data unavailable</Typography>
                                </Box>
                            ) : (
                                <ResponsiveContainer width="100%" height={300}>
                                    <BarChart data={jobApplicationStatistics?.jobApplicationTrend || []}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="month" />
                                        <YAxis />
                                        <Tooltip />
                                        <Bar dataKey="count" fill="#82ca9d" />
                                    </BarChart>
                                </ResponsiveContainer>
                            )}
                        </Paper>
                    </Grid2>
                </Grid2>
            </Grid2>
        </Box>
    );
};

export default CompanyDashboardPage;
