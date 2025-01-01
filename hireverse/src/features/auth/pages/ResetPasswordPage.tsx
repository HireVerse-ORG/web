import { Box, Typography } from '@mui/material';
import AuthLayout from '../components/layouts/AuthLayout';
import ResetPasswordForm from '../components/forms/ResetPasswordForm';
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import { resetPassword } from '@core/api/auth/authapi';
import { toast } from 'sonner';
import { useEffect, useState } from 'react';
import { timeFormatter } from '@core/utils/helper';

const ResetPasswordPage = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const expiryParam = searchParams.get("expiry");
    const navigate = useNavigate();

    const [timeLeft, setTimeLeft] = useState<number | null>(null);

    useEffect(() => {
        if (!expiryParam) {
            navigate('/auth', { replace: true });
            return;
        }

        const expiry = new Date(expiryParam).getTime();
        const now = Date.now();
        const remainingTime = Math.max(expiry - now, 0);

        if (remainingTime === 0) {
            toast.error("Reset link has expired!");
            navigate('/auth', { replace: true });
            return;
        }

        setTimeLeft(remainingTime);

        const interval = setInterval(() => {
            const updatedTime = expiry - Date.now();
            if (updatedTime <= 0) {
                clearInterval(interval);
                toast.error("Reset link has expired!");
                navigate('/auth', { replace: true });
            } else {
                setTimeLeft(updatedTime);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [expiryParam, navigate]);

    
    const handlePasswordReset = async (values: { newPassword: string; confirmPassword: string }) => {
        try {
            await resetPassword({ ...values, token: token! });
            toast.success("Password reset successfully. Please login again");
            return navigate('/auth', { replace: true });
        } catch (error: any) {
            if (error === "Invalid or expired token") {
                toast.error("Reset link has expired!");
                return navigate('/auth', { replace: true });
            }
            toast.error(error);
        }
    };

    if (!token || !expiryParam) {
        return <Navigate to={"/auth"} />;
    }

    return (
        <AuthLayout>
            <Box sx={{ width: "100%", maxWidth: 400, mx: "auto" }}>
                <Typography
                    variant="h4"
                    fontWeight={600}
                    textAlign={"center"}
                    sx={{
                        fontSize: { xs: "1.5rem", sm: "2rem", md: "2.25rem" },
                        marginBottom: 2,
                    }}
                >
                    New Password, New Start!
                </Typography>
                <Typography
                    variant="body2"
                    color="textDisabled"
                    textAlign="center"
                    sx={{ marginBottom: 2, fontWeight: 500 }}
                >
                    {timeLeft !== null ? `Expires in: ${timeFormatter(timeLeft)}` : "Calculating..."}
                </Typography>
                <ResetPasswordForm onSubmit={handlePasswordReset} />
            </Box>
        </AuthLayout>
    );
};

export default ResetPasswordPage;
