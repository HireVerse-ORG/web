import { Box, Button, CircularProgress, TextField, Typography } from "@mui/material";
import { Formik, Form } from "formik";
import { EmailVerificationSchema } from "./schema";
import { requestResetPassword } from "@core/api/auth/authapi";
import { toast } from "sonner";
import { useState } from "react";

const EmailVerificationForm = () => {
    const [submitted, setSubmitted] = useState(false);

    const handleEmailSubmit = async (values: { email: string }) => {
        try {
            await requestResetPassword(values);
            toast.success("A reset link send to your mail", {duration: 10000});
            setSubmitted(true);
        } catch (error: any) {
            toast.error(error);
        }
    };

    return (
        <Formik
            initialValues={{ email: "" }}
            validationSchema={EmailVerificationSchema}
            onSubmit={handleEmailSubmit}
        >
            {({ values, errors, touched, handleChange, handleBlur, isSubmitting }) => (
                <Form>
                    <Box mb={2}>
                        <Typography variant="body1" fontWeight={500} textAlign="left" mb={1}>
                            Email Address
                        </Typography>
                        <TextField
                            name="email"
                            type="email"
                            fullWidth
                            placeholder="Enter your email"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.email && Boolean(errors.email)}
                            helperText={touched.email && errors.email}
                            disabled={submitted}
                        />
                    </Box>
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        size="large"
                        type="submit"
                        disabled={isSubmitting || submitted}
                    >
                        {isSubmitting ? <CircularProgress size={20} /> : "Continue"}
                    </Button>
                </Form>
            )}
        </Formik>
    );
};

export default EmailVerificationForm;
