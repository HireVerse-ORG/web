import { Alert, Box, Grid2, Paper, Skeleton, Typography } from "@mui/material";
import { AreaChart, Area, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { PeopleAlt, Subscriptions, MonetizationOn } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { getUserStatistics, UserStatistics } from "@core/api/admin/statisticsApi";

const dashboardData = {
    totalSubscriptions: 1890,
    mrr: 62500,
    revenueData: [
        { month: 'Jan', revenue: 4000 },
        { month: 'Feb', revenue: 3000 },
        { month: 'Mar', revenue: 5000 },
        { month: 'Apr', revenue: 5780 },
        { month: 'May', revenue: 7890 },
        { month: 'Jun', revenue: 6390 },
    ],
};

const AdminDashboardPage = () => {
    const [userStatistics, setUserStatistics] = useState<UserStatistics | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);

            try {
                const [userStats] = await Promise.all([
                    getUserStatistics(),
                    // getPaymentStatistics() // Add similar function for payments
                ]);

                setUserStatistics(userStats);
                // setPaymentStatistics(paymentStats);
            } catch (error) {
                setError('Failed to load dashboard data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const MetricSkeleton = () => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Skeleton variant="circular" width={40} height={40} />
            <Box sx={{ width: '100%' }}>
                <Skeleton variant="text" width={100} />
                <Skeleton variant="text" width={80} />
            </Box>
        </Box>
    );

    const ChartSkeleton = () => (
        <Skeleton
            variant="rectangular"
            height={300}
            sx={{ borderRadius: 2 }}
            animation="wave"
        />
    );

    return (
        <Box sx={{ flexGrow: 1, pt: 2, pb: 5 }}>
            {error && (
                <Alert severity="error" sx={{ mb: 3 }}>
                    {error}
                </Alert>
            )}

            {/* Page Title */}
            <Typography variant="h5" component="h1" gutterBottom sx={{
                fontWeight: 'bold',
                mb: 4,
                color: 'text.primary',
                display: 'flex',
                alignItems: 'center',
                gap: 1
            }}>
                Dashboard Overview
            </Typography>

            <Grid2 container spacing={3}>
                {/* Metrics Cards */}
                <Grid2 size={{ xs: 12, md: 4 }}>
                    <Paper sx={{
                        p: 3,
                        borderRadius: 2,
                        bgcolor: 'primary.main',
                        color: 'primary.contrastText',
                        boxShadow: 3
                    }}>
                        {loading ? (
                            <MetricSkeleton />
                        ) : (
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <PeopleAlt sx={{ fontSize: 40 }} />
                                <Box>
                                    <Typography variant="subtitle1">Total Users</Typography>
                                    <Typography variant="h4" sx={{ fontWeight: 700 }}>
                                        {userStatistics?.total?.toLocaleString() ?? 'N/A'}
                                    </Typography>
                                </Box>
                            </Box>
                        )}
                    </Paper>
                </Grid2>

                <Grid2 size={{ xs: 12, md: 4 }}>
                    <Paper sx={{
                        p: 3,
                        borderRadius: 2,
                        bgcolor: 'secondary.main',
                        color: 'secondary.contrastText',
                        boxShadow: 3
                    }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Subscriptions sx={{ fontSize: 40 }} />
                            <Box>
                                <Typography variant="subtitle1">Subscriptions</Typography>
                                <Typography variant="h4" sx={{ fontWeight: 700 }}>
                                    {dashboardData.totalSubscriptions.toLocaleString()}
                                </Typography>
                            </Box>
                        </Box>
                    </Paper>
                </Grid2>

                <Grid2 size={{ xs: 12, md: 4 }}>
                    <Paper sx={{
                        p: 3,
                        borderRadius: 2,
                        bgcolor: 'success.main',
                        color: 'success.contrastText',
                        boxShadow: 3
                    }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <MonetizationOn sx={{ fontSize: 40 }} />
                            <Box>
                                <Typography variant="subtitle1">Monthly Revenue</Typography>
                                <Typography variant="h4" sx={{ fontWeight: 700 }}>
                                    ${dashboardData.mrr.toLocaleString()}
                                </Typography>
                            </Box>
                        </Box>
                    </Paper>
                </Grid2>

                {/* Charts Section */}
                <Grid2 size={{ xs: 12 }} container spacing={3} sx={{ mt: 0 }}>
                    <Grid2 size={{ xs: 12, md: 6 }}>
                        <Paper sx={{
                            p: 2,
                            height: 400,
                            borderRadius: 2,
                            boxShadow: 0
                        }}>
                            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                                Revenue Overview
                            </Typography>
                            {loading ? (
                                <ChartSkeleton />
                            ) : error ? (
                                <Box height={300} display="flex" alignItems="center" justifyContent="center">
                                    <Typography color="error">Revenue data unavailable</Typography>
                                </Box>
                            ) : (
                                <ResponsiveContainer width="100%" height="90%">
                                    <AreaChart data={dashboardData.revenueData}>
                                        <defs>
                                            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                                                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="month" />
                                        <YAxis />
                                        <Tooltip
                                            contentStyle={{
                                                borderRadius: 8,
                                                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                                            }}
                                        />
                                        <Area
                                            type="monotone"
                                            dataKey="revenue"
                                            stroke="#8884d8"
                                            fillOpacity={1}
                                            fill="url(#colorRevenue)"
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            )}
                        </Paper>
                    </Grid2>

                    <Grid2 size={{ xs: 12, md: 6 }}>
                        <Paper sx={{
                            p: 2,
                            height: 400,
                            borderRadius: 2,
                            boxShadow: 0
                        }}>
                            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                                User Growth
                            </Typography>
                            {loading ? (
                                <ChartSkeleton />
                            ) : error ? (
                                <Box height={300} display="flex" alignItems="center" justifyContent="center">
                                    <Typography color="error">User growth data unavailable</Typography>
                                </Box>
                            ) : (
                                <ResponsiveContainer width="100%" height="90%">
                                    <LineChart data={userStatistics?.monthlyGrowth || []}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="month" />
                                        <YAxis />
                                        <Tooltip
                                            contentStyle={{
                                                borderRadius: 8,
                                                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                                            }}
                                        />
                                        <Line
                                            type="monotone"
                                            dataKey="count"
                                            stroke="#82ca9d"
                                            strokeWidth={2}
                                            dot={{ fill: '#82ca9d', strokeWidth: 2 }}
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            )}
                        </Paper>
                    </Grid2>
                </Grid2>
            </Grid2>
        </Box>
    );
};

export default AdminDashboardPage;