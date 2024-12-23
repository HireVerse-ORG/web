import { Box, Button, Checkbox, FormControlLabel, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const LoginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

const LoginForm = () => {
    const handleSubmit = async (values: { email: string; password: string, rememberMe: boolean }) => {
        console.log(values);
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
                            to="/forgot-password"
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
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Logging in..." : "Login"}
                    </Button>
                </Form>
            )}
        </Formik>
    );
};

export default LoginForm;
