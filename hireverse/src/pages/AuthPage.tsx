import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Box, Button, Typography, Link } from "@mui/material";
import AuthLayout from "@core/components/layouts/AuthLayout";
import LoginForm from "@core/components/Forms/LoginForm";
import SignUpForm from "@core/components/Forms/SignUpForm";

type UserType = "seeker" | "company";

const AuthPage = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const currentPage = searchParams.get("page") || "login";

    const [userType, setUserType] = useState<UserType>("seeker");

    const togglePage = () => {
        const newPage = currentPage === "login" ? "signup" : "login";
        navigate(`/auth?page=${newPage}`);
    };

    const tabButtonStyle = (activeFor: UserType) => {
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
        <AuthLayout>
            <Box textAlign="center" width="100%" sx={{ width: '100%', maxWidth: 400, mx: 'auto' }}>
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
                    }}
                >
                    {currentPage === "login" ? "Welcome Back, Dude" : "Get more opportunities"}
                </Typography>



                {/* Form */}
                <Box marginBlock={2}>
                    {currentPage === "login" ? (
                        <LoginForm />
                    ) : (
                        <SignUpForm />
                    )}
                </Box>


                <Box mt={2} color={"text.disabled"} textAlign={"left"}>
                    {currentPage === "login" ? "Don't have an account? " : "Already have an account? "}
                    <Link
                        component="button"
                        variant="body1"
                        onClick={togglePage}
                        fontWeight={500}
                    >
                        {currentPage === "login"
                            ? "Sign up"
                            : "Login"}
                    </Link>
                </Box>
            </Box>
        </AuthLayout>
    );
};

export default AuthPage;
