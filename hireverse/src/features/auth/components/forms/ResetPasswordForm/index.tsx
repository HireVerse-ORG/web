import { Box, Button, CircularProgress, TextField, Typography } from "@mui/material";
import { Formik, Form } from "formik";
import { ResetPasswordSchema } from "./schema";


const ResetPasswordForm = ({ onSubmit }: { onSubmit: (values: { newPassword: string; confirmPassword: string }) => void }) => {
    return (
        <Formik
            initialValues={{ newPassword: "", confirmPassword: "" }}
            validationSchema={ResetPasswordSchema}
            onSubmit={onSubmit}
        >
            {({ errors, touched, handleChange, handleBlur, values, isSubmitting }) => (
                <Form>
                    <Box mb={2}>
                        <Typography variant="body1" fontWeight={500} textAlign="left" mb={1}>
                            New Password
                        </Typography>
                        <TextField
                            name="newPassword"
                            type="password"
                            fullWidth
                            placeholder="Enter Password"
                            value={values.newPassword}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.newPassword && Boolean(errors.newPassword)}
                            helperText={touched.newPassword && errors.newPassword}
                        />
                    </Box>
                    <Box mb={2}>
                        <Typography variant="body1" fontWeight={500} textAlign="left" mb={1}>
                            Confirm Password
                        </Typography>
                        <TextField
                            name="confirmPassword"
                            type="password"
                            fullWidth
                            placeholder="Enter Password"
                            value={values.confirmPassword}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                            helperText={touched.confirmPassword && errors.confirmPassword}
                        />
                    </Box>
    
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        size="large"
                        type="submit"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? <CircularProgress size={20} /> : "Reset Password"}
                    </Button>
                </Form>
            )}
        </Formik>
    );
};

export default ResetPasswordForm;
