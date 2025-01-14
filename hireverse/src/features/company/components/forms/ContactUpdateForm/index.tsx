import { Box, Button, CircularProgress, TextField, Typography } from "@mui/material";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { contactUpdateSchema } from "./schema";
import { updateCompanyProfile } from "@core/api/company/profileApi";
import { useCompanyContext } from "@core/contexts/CompanyContext";
import { toast } from "sonner";

type ContactFormData = Yup.InferType<typeof contactUpdateSchema>;

type ContactUpdateFormProps = {
    data?: {
        email?: string;
        twitter?: string;
        facebook?: string;
        linkedin?: string;
        instagram?: string;
        phone?: string;
    };
    onSuccess?: (data: ContactFormData) => void;
};

const ContactUpdateForm: React.FC<ContactUpdateFormProps> = ({ data, onSuccess }) => {
    const {companyProfile, setCompanyProfile } = useCompanyContext();

    const initialValues: ContactFormData = {
        email: data?.email || "",
        linkedin: data?.linkedin || "",
        twitter: data?.twitter || "",
        facebook: data?.facebook || "",
        instagram: data?.instagram || "",
        phone: data?.phone || "",
    };

    // Submit handler
    const handleSubmit = async (values: ContactFormData, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
        try {
            await updateCompanyProfile({
                email: values.email,
                phone: values.phone,
                socialLinks: {
                    linkedin: values.linkedin || "",
                    twitter: values.twitter || "",
                    facebook: values.facebook || "",
                    instagram: values.instagram || "",
                },
            });
    
            setCompanyProfile({
                ...companyProfile!,
                email: values.email,
                phone: values.phone,
                socialLinks: {
                    linkedin: values.linkedin || "",
                    twitter: values.twitter || "",
                    facebook: values.facebook || "",
                    instagram: values.instagram || "",
                },
            });
    
            toast.success("Contact information updated successfully.");
            onSuccess && onSuccess(values);
        } catch (error) {
            toast.error("Failed to update contact information.");
        } finally {
            setSubmitting(false);
        }
    };
    

    return (
        <Box>
            <Typography variant="h5" mb={2} fontWeight={500}>
                Update Contact Information
            </Typography>

            <Formik
                initialValues={initialValues}
                validationSchema={contactUpdateSchema}
                onSubmit={handleSubmit}
            >
                {({ touched, errors, isSubmitting }) => (
                    <Form>
                        {/* Email Field */}
                        <Box mb={2}>
                            <Typography variant="body1" fontWeight={500}>
                                Email
                            </Typography>
                            <Field
                                name="email"
                                as={TextField}
                                fullWidth
                                margin="normal"
                                placeholder="Enter your email"
                                error={touched.email && !!errors.email}
                                helperText={touched.email && errors.email}
                            />
                        </Box>

                        {/* Phone Field */}
                        <Box mb={2}>
                            <Typography variant="body1" fontWeight={500}>
                                Phone
                            </Typography>
                            <Field
                                name="phone"
                                as={TextField}
                                fullWidth
                                margin="normal"
                                placeholder="Enter your phone number"
                                error={touched.phone && !!errors.phone}
                                helperText={touched.phone && errors.phone}
                            />
                        </Box>

                        {/* LinkedIn Field */}
                        <Box mb={2}>
                            <Typography variant="body1" fontWeight={500}>
                                LinkedIn
                            </Typography>
                            <Field
                                name="linkedin"
                                as={TextField}
                                fullWidth
                                margin="normal"
                                placeholder="Enter your LinkedIn URL"
                                error={touched.linkedin && !!errors.linkedin}
                                helperText={touched.linkedin && errors.linkedin}
                            />
                        </Box>

                        {/* Twitter Field */}
                        <Box mb={2}>
                            <Typography variant="body1" fontWeight={500}>
                                Twitter
                            </Typography>
                            <Field
                                name="twitter"
                                as={TextField}
                                fullWidth
                                margin="normal"
                                placeholder="Enter your Twitter URL"
                                error={touched.twitter && !!errors.twitter}
                                helperText={touched.twitter && errors.twitter}
                            />
                        </Box>

                        {/* Facebook Field */}
                        <Box mb={2}>
                            <Typography variant="body1" fontWeight={500}>
                                Facebook
                            </Typography>
                            <Field
                                name="facebook"
                                as={TextField}
                                fullWidth
                                margin="normal"
                                placeholder="Enter your Facebook URL"
                                error={touched.facebook && !!errors.facebook}
                                helperText={touched.facebook && errors.facebook}
                            />
                        </Box>

                        {/* Instagram Field */}
                        <Box mb={2}>
                            <Typography variant="body1" fontWeight={500}>
                                Instagram
                            </Typography>
                            <Field
                                name="instagram"
                                as={TextField}
                                fullWidth
                                margin="normal"
                                placeholder="Enter your Instagram URL"
                                error={touched.instagram && !!errors.instagram}
                                helperText={touched.instagram && errors.instagram}
                            />
                        </Box>

                        {/* Save Button */}
                        <Box sx={{ mt: 2 }}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                sx={{ mt: 2 }}
                                disabled={isSubmitting}
                                fullWidth
                            >
                                {isSubmitting ? <CircularProgress size={24} /> : "Save"}
                            </Button>
                        </Box>
                    </Form>
                )}
            </Formik>
        </Box>
    );
};

export default ContactUpdateForm;
