import { Box, Typography } from '@mui/material';
import AuthLayout from '../components/layouts/AuthLayout';
import ResetPasswordForm from '../components/forms/ResetPasswordForm';
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import { resetPassword } from '@core/api/auth/authapi';
import { toast } from 'sonner';

const ResetPasswordPage = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const navigate = useNavigate();

    if(!token){
        return <Navigate to={"/auth"} />
    }

    const handlePasswordReset = async (values: { newPassword: string; confirmPassword: string }) => {
        try {
            await resetPassword({...values, token})
            toast.success("Password reseted succesfully. Please login again");
            return navigate('/auth', {replace: true});
        } catch (error: any) {
            if(error === "Invalid or expired token"){
                toast.error("Session expired!");
                return navigate('/auth', {replace: true});
            }
            toast.error(error);
        }
    };

    return (
        <AuthLayout>
            <Box
                sx={{ width: "100%", maxWidth: 400, mx: "auto" }}
            >
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
                <ResetPasswordForm onSubmit={handlePasswordReset} />
            </Box>
        </AuthLayout>
    );
}

export default ResetPasswordPage;
