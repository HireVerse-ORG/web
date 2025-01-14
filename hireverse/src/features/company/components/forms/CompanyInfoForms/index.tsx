import { Box, Typography, TextField, MenuItem, Button } from "@mui/material";
import { useState } from "react";
import { Formik, Form, Field } from "formik";
import ImagePreviewer from "@core/components/ui/ImagePreviewer";
import ImageUploader from "@core/components/ui/ImageUploader";
import { ICompanyProfile } from "@core/types/company.interface";
import { CompanyInfoFormSchema } from "./schema";
import CountryInput from "@core/components/ui/LocationInputs/CountryInput";
import CityInput from "@core/components/ui/LocationInputs/CityInput";
import { industries } from "@core/data/companyFormData";
import { DatePicker } from '@mui/x-date-pickers';
import moment from "moment";
import { toast } from "sonner";
import { uploadToCloudinary } from "@core/api/external/cloudinaryApi";
import { updateCompanyProfile } from "@core/api/company/profileApi";
import { useCompanyContext } from "@core/contexts/CompanyContext";

type CompanyInfoFormsProps = {
    profile: ICompanyProfile | null;
    onSucces?: (profile: ICompanyProfile) => void;
};

const CompanyInfoForms = ({ profile, onSucces }: CompanyInfoFormsProps) => {
    const {setCompanyProfile} = useCompanyContext();
    const [logoImage, setLogoImage] = useState<File | null>(null);
    const [logoImagePreview, setLogoImagePreview] = useState<File | string>(
        profile?.image || ""
    );

    const handleImageChange = (image: File | null) => {
        if (image) {
            setLogoImage(image);
            setLogoImagePreview(image);
        }
    };

    const handleCropped = (croppedImage: File, url: string) => {
        setLogoImage(croppedImage);
        setLogoImagePreview(url);
    };

    const initialValues = {
        name: profile?.name || "",
        website: profile?.website || "",
        founded: profile?.founded ? moment(profile.founded) : null, 
        employeeCount: profile?.employeeCount || "",
        location: {
            country: profile?.location?.country || "",
            city: profile?.location?.city || "",
        },
        industry: profile?.industry || "",
    };

    const handleSubmit = async (values: typeof initialValues, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
        try {
            const image = logoImage ? await uploadToCloudinary(logoImage) : profile?.image;
            const founded = values.founded ? values.founded.toDate() : undefined;
            const employeeCount = typeof values.employeeCount === 'string' ? parseInt(values.employeeCount) : values.employeeCount;
            const response = await updateCompanyProfile({ ...values, image, founded, employeeCount });
            setCompanyProfile(response.profile);
            toast.success(response.message);
            onSucces?.(response.profile);
        } catch (error: any) {
            toast.error(error || "Failed to update profile");
        } finally {
            setSubmitting(false);
        }
    };
    

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={CompanyInfoFormSchema}
            onSubmit={handleSubmit}
        >
            {({ isSubmitting, values, setFieldValue, touched, errors }) => (
                <Form>
                    {/* Image Upload */}
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: { xs: "column", sm: "row" },
                            alignContent: "center",
                            justifyContent: "center",
                            gap: { xs: 0, sm: 2 },
                            mb: 3,
                        }}
                    >
                        <ImagePreviewer
                            onCropped={handleCropped}
                            image={logoImagePreview}
                            shape="circle"
                            styles={{
                                width: "100%",
                                maxWidth: "100px",
                                height: "100px",
                                marginBlock: 1,
                                marginInline: "auto",
                            }}
                        />
                        <Box flexGrow={1}>
                            <ImageUploader onChange={handleImageChange} />
                        </Box>
                    </Box>

                    {/* Title */}
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                        <Typography variant="h6" fontWeight="bold">
                            Edit Intro
                        </Typography>
                    </Box>

                    {/* Company Name */}
                    <Box mb={3}>
                        <Typography variant="body1" fontWeight={500} mb={1}>
                            Company Name
                        </Typography>
                        <Field
                            as={TextField}
                            name="name"
                            fullWidth
                            variant="outlined"
                            error={touched.name && !!errors.name}
                            helperText={touched.name && errors.name}
                        />
                    </Box>

                    {/* Website */}
                    <Box mb={3}>
                        <Typography variant="body1" fontWeight={500} mb={1}>
                            Website link
                        </Typography>
                        <Field
                            as={TextField}
                            name="website"
                            fullWidth
                            variant="outlined"
                            error={touched.website && !!errors.website}
                            helperText={touched.website && errors.website}
                        />
                    </Box>

                    {/* Other Info */}
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                        <Typography variant="h6" fontWeight="bold">
                            Other Info
                        </Typography>
                    </Box>

                    {/* Founded */}
                    <Box mb={3}>
                        <Typography variant="body1" fontWeight={500} mb={1}>
                            Founded
                        </Typography>
                        <DatePicker
                            value={values.founded}
                            onChange={(newValue) => setFieldValue("founded", newValue)}
                        />
                    </Box>

                    {/* Employee Count */}
                    <Box mb={3}>
                        <Typography variant="body1" fontWeight={500} mb={1}>
                            Employees Count
                        </Typography>
                        <Field
                            as={TextField}
                            name="employeeCount"
                            type="number"
                            fullWidth
                            variant="outlined"
                            error={touched.employeeCount && !!errors.employeeCount}
                            helperText={touched.employeeCount && errors.employeeCount}
                        />
                    </Box>

                    {/* Location */}
                    <Box mb={3}>
                        <Typography variant="body1" fontWeight={500} mb={1}>
                            Location
                        </Typography>
                        <Box display="flex" gap={2} sx={{ flexWrap: { xs: "wrap", sm: "nowrap" } }}>
                            {/* Country */}
                            <CountryInput
                                initialValue={values.location.country}
                                onCountryChange={(newCountry) => {
                                    setFieldValue("location.country", newCountry);
                                    setFieldValue("location.city", "");
                                }}
                                error={touched.location?.country && !!errors.location?.country}
                                helperText={touched.location?.country && errors.location?.country}
                            />

                            {/* City */}
                            <CityInput
                                initialValue={values.location.city}
                                country={values.location.country}
                                onCityChange={(newCity) => {
                                    setFieldValue("location.city", newCity);
                                }}
                                error={touched.location?.city && !!errors.location?.city}
                                helperText={touched.location?.city && errors.location?.city}
                            />
                        </Box>
                    </Box>

                    {/* Industry */}
                    <Box mb={3}>
                        <Typography variant="body1" fontWeight={500} mb={1}>
                            Industry/Category
                        </Typography>
                        <Field
                            name="industry"
                            label="Industry/Category"
                            select
                            variant="outlined"
                            fullWidth
                            as={TextField}
                            error={touched.industry && Boolean(errors.industry)}
                            helperText={touched.industry && errors.industry}
                        >
                            {industries.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </Field>
                    </Box>

                    {/* Submit Button */}
                    <Box mt={4}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            disabled={isSubmitting}
                        >
                            Save
                        </Button>
                    </Box>
                </Form>
            )}
        </Formik>
    );
};

export default CompanyInfoForms;
