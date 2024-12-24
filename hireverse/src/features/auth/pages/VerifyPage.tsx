import { Box, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import AuthLayout from "../components/layouts/AuthLayout";
import OtpForm from "../components/forms/OtpForm";
import { maskEmail } from "@core/utils/helper";
import { useEffect } from "react";


const VerifyPage = () => {
    const location = useLocation();
    const email = location.state?.email;
    const navigate = useNavigate();

    useEffect(() => {
        const pageActive = sessionStorage.getItem('verifyPageActive');
        if (pageActive !== "1") {
            console.log(pageActive);
            navigate(-1)
        }
    }, [])

    return (
        <AuthLayout contentPosition="center">
            <Box
                textAlign="center"
                width="100%"
                sx={{ width: "100%", maxWidth: 400, mx: "auto" }}
            >
                <Typography
                    variant="h4"
                    fontWeight={600}
                    sx={{
                        fontSize: { xs: "1.5rem", sm: "2rem", md: "2.25rem" },
                    }}
                >
                    We’re Almost There
                </Typography>
                <Typography
                    variant="body1"
                    color="text.disabled"
                    mt={2}
                    mb={3}
                >
                    Enter the OTP sent to {email ? <strong>{maskEmail(email)}</strong> : "your mail"}
                </Typography>
                <OtpForm />
            </Box>
        </AuthLayout>
    );
};

export default VerifyPage;
