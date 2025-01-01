import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import AuthLayout from "../components/layouts/AuthLayout";
import LoginForm from "../components/forms/LoginForm";
import SignupForm from "../components/forms/SignupForm";
import { UserRoles } from "@core/types/user.interface";
import MSSignIn from "../components/MSSignIn";
import GoogleSignIn from "../components/GoogleSignIn";


const AuthPage = () => {
    const [searchParams] = useSearchParams();
    const currentPage = searchParams.get("page") || "login";
    const [userType, setUserType] = useState<Omit<UserRoles, "admin">>("seeker");

    const imagePath = (userType === "company" ? '/images/team.png' : '/images/working-beach.png');

    useEffect(() => {
        sessionStorage.removeItem("otpStartTime")
        sessionStorage.removeItem('verifyPageActive');
    }, [])

    const tabButtonStyle = (activeFor: UserRoles) => {
        return {
            padding: "8px 16px",
            backgroundColor: userType === activeFor ? "#E9EBFD" : "transparent",
            color: "primary.main",
            border: "none",
            boxShadow: "none",
            "&:hover": {
                backgroundColor: userType === activeFor ? "primary.main" : "primary.contrastText",
                color: userType === activeFor ? "primary.contrastText" : "primary.main",
            },
        }
    }

    return (
        <AuthLayout imageSrc={imagePath}>
            <Box textAlign="center" width="100%" sx={{ 
                width: '100%', 
                maxWidth: 400, 
                mx: 'auto', 
                paddingTop: currentPage === "login" ? 20 : 35,
                marginBottom: 4, 
            }}>

                <Box mb={3} display="flex" justifyContent="center" gap={1}>
                    <Button
                        variant="contained"
                        onClick={() => setUserType("seeker")}
                        sx={tabButtonStyle("seeker")}
                    >
                        Job Seeker
                    </Button>
                    <Button
                        variant="contained"
                        onClick={() => setUserType("company")}
                        sx={tabButtonStyle("company")}
                    >
                        Company
                    </Button>
                </Box>

                <Typography
                    variant="h4"
                    fontWeight={600}
                    sx={{
                        fontSize: { xs: "1.5rem", sm: "2rem", md: "2.25rem" },
                        mb: 3
                    }}
                >
                    {currentPage === "login" ? "Welcome Back, Dude" : "Get more opportunities"}
                </Typography>

                <Box mb={2} sx={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: 1 }}>
                    <GoogleSignIn role={userType.toString()} />
                    <MSSignIn role={userType.toString()} />
                </Box>

                {/* "Or with Email" text with a horizontal line */}
                <Box sx={{ position: "relative", width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Box
                        sx={{
                            position: "absolute",
                            top: "50%",
                            left: 0,
                            right: 0,
                            borderTop: "1px solid #ddd", 
                        }}
                    />
                    <Typography
                        variant="body2"
                        color="text.disabled"
                        sx={{
                            backgroundColor: "white", 
                            paddingX: 2,
                            position: "relative", 
                            zIndex: 1, 
                        }}
                    >
                        Or with Email
                    </Typography>
                </Box>

                {/* Form */}
                <Box marginBlock={2}>
                    {currentPage === "login" ? (
                        <LoginForm />
                    ) : (
                        <SignupForm role={userType.toString()} />
                    )}
                </Box>
            </Box>
        </AuthLayout>
    );
};

export default AuthPage;
