import { Box, Button, CircularProgress, TextField, Typography } from "@mui/material";
import { Formik, Form, Field } from "formik";
import { toast } from "sonner";
import { useState } from "react";
import { SeekerProfileSchema } from "./schema";
import ImageUploader from "@core/components/ui/ImageUploader";

const SeekerProfileForm = () => {
    const [profileImage, setProfileImage] = useState<File | null>(null);

    const handleImageChange = (image: File | null) => {
        if (image) {
            setProfileImage(image);
        }
    };

    const handleSubmit = async (values: any, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
        try {
            console.log(values);
            toast.success("Profile updated successfully!");
        } catch (error) {
            toast.error("Failed to update profile.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Formik
            initialValues={{
                firstName: "",
                lastName: "",
                currentTitle: "",
                country: "",
                city: "",
                profileImage: null,
            }}
            validationSchema={SeekerProfileSchema}
            onSubmit={handleSubmit}
        >
            {({ errors, touched, isSubmitting, setFieldValue }) => (
                <Form>
                    <Box
                        sx={{
                            borderRadius: 1,
                            maxWidth: 500,
                            mx: "auto",
                        }}
                    >

                        {/* Image Upload */}
                        <ImageUploader onChange={handleImageChange} />

                        {/* Title */}
                        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                            <Typography variant="h6" fontWeight="bold">
                                Edit Intro
                            </Typography>
                        </Box>

                        {/* First Name */}
                        <Box mb={3}>
                            <Typography variant="body1" fontWeight={500} mb={1}>
                                First Name
                            </Typography>
                            <Field
                                as={TextField}
                                fullWidth
                                name="firstName"
                                variant="outlined"
                                placeholder="Enter your first name"
                                error={touched.firstName && !!errors.firstName}
                                helperText={touched.firstName && errors.firstName}
                            />
                        </Box>

                        {/* Last Name */}
                        <Box mb={3}>
                            <Typography variant="body1" fontWeight={500} mb={1}>
                                Last Name
                            </Typography>
                            <Field
                                as={TextField}
                                fullWidth
                                name="lastName"
                                variant="outlined"
                                placeholder="Enter your last name"
                                error={touched.lastName && !!errors.lastName}
                                helperText={touched.lastName && errors.lastName}
                            />
                        </Box>

                        {/* Current Title */}
                        <Box mb={3}>
                            <Typography variant="body1" fontWeight={500} mb={1}>
                                Current Position
                            </Typography>
                            <Field
                                as={TextField}
                                fullWidth
                                name="currentTitle"
                                variant="outlined"
                                placeholder="Enter your current position"
                                error={touched.currentTitle && !!errors.currentTitle}
                                helperText={touched.currentTitle && errors.currentTitle}
                            />
                        </Box>

                        {/* Location */}
                        <Typography variant="body1" fontWeight={500} mb={1}>
                            Location
                        </Typography>
                        <Box display="flex" gap={2} mb={3}>
                            {/* Country */}
                            <Field
                                as={TextField}
                                fullWidth
                                name="country"
                                variant="outlined"
                                placeholder="Country"
                                error={touched.country && !!errors.country}
                                helperText={touched.country && errors.country}
                            />

                            {/* City */}
                            <Field
                                as={TextField}
                                fullWidth
                                name="city"
                                variant="outlined"
                                placeholder="City"
                                error={touched.city && !!errors.city}
                                helperText={touched.city && errors.city}
                            />
                        </Box>

                        {/* Save Button */}
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            size="large"
                            type="submit"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? <CircularProgress size={20} /> : "Save"}
                        </Button>
                    </Box>
                </Form>
            )}
        </Formik>
    );
};

export default SeekerProfileForm;
