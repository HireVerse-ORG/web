import { Box, Button, CircularProgress, TextField, Typography, FormControlLabel, Checkbox } from "@mui/material";
import { Formik, Form, Field } from "formik";
import { toast } from "sonner";
import { useState } from "react";
import { SeekerProfileSchema } from "./schema";
import ImageUploader from "@core/components/ui/ImageUploader";
import CountryInput from "@core/components/ui/LocationInputs/CountryInput";
import CityInput from "@core/components/ui/LocationInputs/CityInput";
import { SeekerProfile } from "@core/types/seeker.interface";
import { updateSeekerProfile } from "@core/api/seeker/profileApi";
import { uploadToCloudinary } from "@core/lib/cloudinary";

type SeekerProfileFormProps = {
    profile?: SeekerProfile | null;
    onSucces?: (profile: SeekerProfile) => void;
}
const SeekerProfileForm = ({profile, onSucces}: SeekerProfileFormProps) => {
    const [profileImage, setProfileImage] = useState<File | null>(null);

    const handleImageChange = (image: File | null) => {
        if (image) {
            setProfileImage(image);
        }
    };

    const handleSubmit = async (values: any, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
        try {
            let uploadedImage; 
            if(profileImage){
                uploadedImage = await uploadToCloudinary(profileImage);
            }

            const updatedProfile = await updateSeekerProfile({
                profileName: values.fullName,
                title: values.currentTitle,
                location: {
                    country: values.country,
                    city: values.city
                },
                isOpenToWork: values.openToWork,
                image: uploadedImage
            });
            onSucces?.(updatedProfile);
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
                fullName: profile?.profileName || "",
                currentTitle: profile?.title || "",
                country: profile?.location?.country || "",
                city: profile?.location?.city || "",
                openToWork: profile?.isOpenToWork || false,
            }}
            validationSchema={SeekerProfileSchema}
            onSubmit={handleSubmit}
        >
            {({ errors, touched, isSubmitting, setFieldValue, values }) => (
                <Form>
                    <Box
                        sx={{
                            borderRadius: 1,
                            maxWidth: 500,
                            mx: "auto",
                        }}
                    >

                        {/* Image Upload */}
                        <ImageUploader onChange={handleImageChange} initialImageUrl={profile?.image} preview />

                        {/* Title */}
                        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                            <Typography variant="h6" fontWeight="bold">
                                Edit Intro
                            </Typography>
                        </Box>

                        {/* Full Name */}
                        <Box mb={3}>
                            <Typography variant="body1" fontWeight={500} mb={1}>
                                Full Name
                            </Typography>
                            <Field
                                as={TextField}
                                fullWidth
                                name="fullName"
                                variant="outlined"
                                placeholder="Enter your Full name"
                                error={touched.fullName && !!errors.fullName}
                                helperText={touched.fullName && errors.fullName}
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
                            <CountryInput 
                                initialValue={values.country}
                                onCountryChange={(newCountry) => {
                                    setFieldValue("country", newCountry);
                                    setFieldValue("city", null); 
                                }}
                                error={touched.country && !!errors.country} 
                                helperText={touched.country && errors.country}
                            />

                            {/* City */}
                            <CityInput 
                                initialValue={values.city}
                                country={values.country} 
                                onCityChange={(newCity) => {
                                    setFieldValue("city", newCity); 
                                }}
                                error={touched.city && !!errors.city} 
                                helperText={touched.city && errors.city} 
                            />
                        </Box>

                        {/* Open to Work Checkbox */}
                        <Box mb={3}>
                            <FormControlLabel
                                control={
                                    <Field
                                        as={Checkbox}
                                        name="openToWork"
                                        checked={values.openToWork}
                                        onChange={() => setFieldValue("openToWork", !values.openToWork)}
                                    />
                                }
                                label="Open to Work"
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
