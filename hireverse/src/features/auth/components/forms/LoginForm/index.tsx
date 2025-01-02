import { Box, Button, Checkbox, CircularProgress, FormControlLabel, TextField, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import LoginSchema from "./schema";
import useAppDispatch from "@core/hooks/useDispatch";
import { setCredential } from "@core/store/authslice";
import { loginUser, sendOtp } from "@core/api/auth/authapi";
import { getUserDashboardPath } from "@core/utils/helper";
import { toast } from "sonner";

type LoginFormProps = {
    disabled?: boolean;
};

const LoginForm = ({disabled}: LoginFormProps) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (
        values: { email: string; password: string; rememberMe: boolean },
        { setErrors }: { setErrors: (errors: { [key: string]: string }) => void }
    ) => {
        try {
            const res = await loginUser(values.email, values.password);
            if(res.user.isBlocked) {
                toast.error("You have been blocked")
                return;
            }

            if (!res.user.isVerified) {
                await sendOtp(res.user.email);
                sessionStorage.setItem('verifyPageActive', "1");
                toast.warning("Please verify your account")
                navigate('/auth/verify', {state: {email: res.user.email}})
                return;
            }
            dispatch(setCredential({ user: res.user, token: res.token, rememberMe: values.rememberMe }));
            navigate(getUserDashboardPath(res.user.role))
        } catch (error: any) {
            setErrors({ password: error })
        }
    };



    return (
        <Formik
            initialValues={{ email: "", password: "", rememberMe: false }}
            validationSchema={LoginSchema}
            onSubmit={handleSubmit}
        >
            {({ errors, touched, isSubmitting }) => (
                <Form>
                    {/* Email Address */}
                    <Box mb={3}>
                        <Typography variant="body1" fontWeight={500} textAlign="left" mb={1}>
                            Email Address
                        </Typography>
                        <Field
                            as={TextField}
                            fullWidth
                            name="email"
                            type="email"
                            variant="outlined"
                            placeholder="Enter your email"
                            error={touched.email && !!errors.email}
                            helperText={touched.email && errors.email}
                        />
                    </Box>

                    {/* Password */}
                    <Box mb={3}>
                        <Typography variant="body1" fontWeight={500} textAlign="left" mb={1}>
                            Password
                        </Typography>
                        <Field
                            as={TextField}
                            fullWidth
                            name="password"
                            type="password"
                            variant="outlined"
                            placeholder="Enter your password"
                            error={touched.password && !!errors.password}
                            helperText={touched.password && errors.password}
                        />
                    </Box>

                    {/* Remember Me and Forgot Password */}
                    <Box
                        mb={3}
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <Field
                            as={FormControlLabel}
                            control={<Checkbox />}
                            name="rememberMe"
                            label="Remember me"
                        />
                        <Typography
                            variant="body2"
                            component={Link}
                            to="/auth/forgot-password"
                            sx={{ textDecoration: "none", color: "text.disabled", cursor: "pointer" }}
                        >
                            Forgot Password?
                        </Typography>
                    </Box>

                    {/* Login Button */}
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        size="large"
                        type="submit"
                        disabled={isSubmitting || disabled}
                    >
                        {isSubmitting ? <CircularProgress size={20} /> : "Login"}
                    </Button>

                    {/* Signup Link */}
                    <Box mt={2} textAlign="left">
                        <Typography variant="body2" color="text.disabled">
                            Don't have an account?{" "}
                            <Link
                                to="/auth/?page=signup"
                                style={{ textDecoration: "none", color: "primary.main", fontWeight: 500 }}
                            >
                                Sign up
                            </Link>
                        </Typography>
                    </Box>
                </Form>
            )}
        </Formik>
    );
};

export default LoginForm;
