import { Box, Typography } from "@mui/material";
import AuthLayout from "../components/layouts/AuthLayout";
import EmailVerificationForm from "../components/forms/EmailVerificationForm";

const ForgotPasswordPage = () => {
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
                    Forgot Password?<br /> Let’s Fix It!
                </Typography>
                <EmailVerificationForm />
            </Box>
        </AuthLayout>
    );
};

export default ForgotPasswordPage;
