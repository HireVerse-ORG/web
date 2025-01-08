import { useState, useEffect } from 'react';
import { checkSeekerUsernameExist, updateSeekerProfile } from "@core/api/seeker/profileApi";
import { Button, TextField, CircularProgress, Typography, Box, debounce } from "@mui/material";
import { toast } from 'sonner';
import useAppSelector from '@core/hooks/useSelector';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';

type SeekerProfileUrlProps = {
    baseUrl: string;
    username?: string | null;
    onSuccess?: (username: string) => void;
};

const USERNAME_LENGTH = 5;

// Validation schema for username
const validationSchema = Yup.object({
    username: Yup.string()
        .matches(/^[A-Za-z][A-Za-z0-9_-]*$/, "Username must start with a letter and can only contain letters, numbers, -, or _")
        .min(USERNAME_LENGTH, `Username must have at least ${USERNAME_LENGTH} characters`)
        .required("Username is required"),
});

const SeekerProfileUrlForm = ({ baseUrl, username, onSuccess }: SeekerProfileUrlProps) => {
    const userid = useAppSelector((state) => state.auth.user?.id);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [isUsernameExist, setIsUsernameExist] = useState<boolean>(false);

    // Check if username exists
    const handleUsernameChange = debounce(async (username: string) => {
        if (username.trim().length >= USERNAME_LENGTH) {
            setIsSubmitting(true);
            try {
                const data = await checkSeekerUsernameExist(username, userid);
                setIsUsernameExist(data.exist);
            } catch (error) {
                toast.error("Something went wrong");
            } finally {
                setIsSubmitting(false);
            }
        }
    }, 900)

    // Form submission handler
    const handleSubmit = async (values: { username: string }) => {
        const { username: inputUsername } = values;

        if (isUsernameExist) {
            return;
        }

        setIsSubmitting(true);
        try {
            await updateSeekerProfile({ profileUsername: inputUsername.trim() });
            onSuccess?.(inputUsername);
        } catch (error) {
            toast.error("There was an error updating the profile.");
        } finally {
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
        if (username) {
            handleUsernameChange(username);
        }
    }, [username]);

    return (
        <Box>
            <Typography variant="h6" fontWeight="bold" mb={2}>
                Update Profile URL
            </Typography>

            <Typography variant="body2" color="textSecondary" mb={1}>
                {`${baseUrl}/`}
            </Typography>

            <Formik
                initialValues={{ username: username || '' }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
                enableReinitialize
            >
                {({ values, handleChange, errors, touched, isValid, setFieldValue }) => (
                    <Form>
                        <Field
                            as={TextField}
                            name="username"
                            variant="outlined"
                            value={values.username}
                            onChange={(e: any) => {
                                handleChange(e);
                                setFieldValue("username", e.target.value); 
                                handleUsernameChange(e.target.value); 
                            }}
                            fullWidth
                            error={touched.username && !!errors.username}
                            helperText={touched.username ? errors.username : (isUsernameExist ? "Username already exists." : "")}
                            disabled={isSubmitting}
                            margin="normal"
                            placeholder="Enter a unique profile URL"
                        />

                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            type="submit"
                            fullWidth
                            disabled={isSubmitting || isUsernameExist || !values.username || !isValid}
                        >
                            {isSubmitting ? <CircularProgress size={24} /> : "Save"}
                        </Button>
                    </Form>
                )}
            </Formik>
        </Box>
    );
};

export default SeekerProfileUrlForm;
