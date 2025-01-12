import { TextField, Box, Typography } from "@mui/material";
import { Formik, Field, Form, FormikProps } from "formik";
import { forwardRef, useImperativeHandle, useRef } from "react";
import FormLayout from "@core/components/layouts/FormLayout";
import { ContactFormSchema } from "./schema";

export interface CompanyContactFormValues {
    email: string;
    phoneNumber: string;
    website: string;
    socialMedia: {
        linkedIn: string;
        twitter: string;
        facebook: string;
        instagram: string;
    };
}

type CompanyProfileFormProps = {
    data?: CompanyContactFormValues;
    onSubmit: (values: CompanyContactFormValues) => void; 
}

const CompanyContactForm = forwardRef(({ data, onSubmit }: CompanyProfileFormProps, ref) => {
    const formikRef = useRef<FormikProps<CompanyContactFormValues> | null>(null);

    useImperativeHandle(ref, () => ({
        submitForm: () => formikRef.current?.submitForm(),
    }));

    const handleSubmit = (values: CompanyContactFormValues) => {
        onSubmit(values);
    };

    const formboxstyle = { width: "100%", maxWidth: "400px", mx: { xs: "auto", sm: 0 } };
    return (
        <Formik
            initialValues={{
                email: data?.email || "",
                phoneNumber: data?.phoneNumber || "",
                website: data?.website || "",
                socialMedia: {
                    facebook: data?.socialMedia?.facebook || "",
                    instagram: data?.socialMedia?.instagram || "",
                    linkedIn: data?.socialMedia?.linkedIn || "",
                    twitter: data?.socialMedia?.twitter || "",
                },
            }}
            validationSchema={ContactFormSchema}
            onSubmit={handleSubmit}
            innerRef={formikRef}
        >
            {({ errors, touched }) => (
                <Form>
                    <FormLayout title="Company Contact Details" description="Fill out your company's contact details below.">

                        {/* Email */}
                        <Box sx={formboxstyle}>
                            <Typography variant="body1" fontWeight={500} mb={1}>
                                Email Address
                            </Typography>
                            <Field
                                name="email"
                                variant="outlined"
                                fullWidth
                                placeholder="Enter your company email"
                                as={TextField}
                                error={touched.email && Boolean(errors.email)}
                                helperText={touched.email && errors.email}
                            />
                        </Box>

                        {/* Phone Number */}
                        <Box sx={formboxstyle}>
                            <Typography variant="body1" fontWeight={500} mb={1}>
                                Phone Number
                            </Typography>
                            <Field
                                name="phoneNumber"
                                variant="outlined"
                                fullWidth
                                placeholder="Enter your company phone number"
                                as={TextField}
                                error={touched.phoneNumber && Boolean(errors.phoneNumber)}
                                helperText={touched.phoneNumber && errors.phoneNumber}
                            />
                        </Box>
                    </FormLayout>

                    <FormLayout title="Additional Contact Information" description="Provide your company's website and social media profiles so customers can easily connect with you.">

                        {/* Website */}
                        <Box sx={formboxstyle}>
                            <Typography variant="body1" fontWeight={500} mb={1}>
                                Website
                            </Typography>
                            <Field
                                name="website"
                                variant="outlined"
                                fullWidth
                                placeholder="Enter your company's website URL"
                                as={TextField}
                                error={touched.website && Boolean(errors.website)}
                                helperText={touched.website && errors.website}
                            />
                        </Box>

                        {/* Social Media Links */}
                        <Box sx={{ ...formboxstyle, mb: 6 }}>
                            <Typography variant="body1" fontWeight={500} mb={1}>
                                Social Media Links
                            </Typography>

                            {/* LinkedIn */}
                            <Field
                                name="socialMedia.linkedIn"
                                label="LinkedIn"
                                variant="outlined"
                                fullWidth
                                placeholder="LinkedIn Profile URL"
                                as={TextField}
                                error={touched.socialMedia?.linkedIn && Boolean(errors.socialMedia?.linkedIn)}
                                helperText={touched.socialMedia?.linkedIn && errors.socialMedia?.linkedIn}
                                sx={{ mb: 2 }}  // Gap between fields
                            />

                            {/* X */}
                            <Field
                                name="socialMedia.twitter"
                                label="X (Twitter)"
                                variant="outlined"
                                fullWidth
                                placeholder="X Profile URL"
                                as={TextField}
                                error={touched.socialMedia?.twitter && Boolean(errors.socialMedia?.twitter)}
                                helperText={touched.socialMedia?.twitter && errors.socialMedia?.twitter}
                                sx={{ mb: 2 }}  // Gap between fields
                            />

                            {/* Facebook */}
                            <Field
                                name="socialMedia.facebook"
                                label="Facebook"
                                variant="outlined"
                                fullWidth
                                placeholder="Facebook Profile URL"
                                as={TextField}
                                error={touched.socialMedia?.facebook && Boolean(errors.socialMedia?.facebook)}
                                helperText={touched.socialMedia?.facebook && errors.socialMedia?.facebook}
                                sx={{ mb: 2 }}  // Gap between fields
                            />

                            {/* Instagram */}
                            <Field
                                name="socialMedia.instagram"
                                label="Instagram"
                                variant="outlined"
                                fullWidth
                                placeholder="Instagram Profile URL"
                                as={TextField}
                                error={touched.socialMedia?.instagram && Boolean(errors.socialMedia?.instagram)}
                                helperText={touched.socialMedia?.instagram && errors.socialMedia?.instagram}
                            />
                        </Box>
                    </FormLayout>
                </Form>
            )}
        </Formik>
    );
});

export default CompanyContactForm;
