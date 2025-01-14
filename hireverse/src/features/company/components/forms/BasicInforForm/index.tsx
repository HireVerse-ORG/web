import { TextField, Box, MenuItem, Typography } from "@mui/material";
import { Formik, Field, Form, FormikProps } from "formik";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import FormLayout from "@core/components/layouts/FormLayout";
import ImagePreviewer from "@core/components/ui/ImagePreviewer";
import ImageUploader from "@core/components/ui/ImageUploader";
import CountryInput from "@core/components/ui/LocationInputs/CountryInput";
import CityInput from "@core/components/ui/LocationInputs/CityInput";
import { BasicInfoFormSchema } from "./schema";
import { companyTypes, industries } from "@core/data/companyFormData";

interface Location {
    city: string;
    country: string;
}

export interface BasicInfoFormValues {
    companyName: string;
    companyType: string;
    industry: string;
    location: Location;
}

type BasicInfoFormProps = {
    image?: File | null;
    data?: BasicInfoFormValues;
    onSubmit: (values: BasicInfoFormValues, logo: File) => void; 
}

const BasicInfoForm = forwardRef(({ image, data, onSubmit }: BasicInfoFormProps, ref) => {
    const formikRef = useRef<FormikProps<BasicInfoFormValues> | null>(null);

    const [logo, setLogo] = useState<File | null>(image || null);
    const [logoError, setLogoError] = useState<string | null>(null);
    const [logoPreview, setLogoPreview] = useState<File | string>(image || "");

    const handleImageChange = (image: File | null) => {
        if (image) {
            setLogo(image);
            setLogoPreview(image);
        }
    };

    const handleCropped = (croppedImage: File, url: string) => {
        setLogo(croppedImage);
        setLogoPreview(url);
    }

    useImperativeHandle(ref, () => ({
        submitForm: () => formikRef.current?.submitForm(),
    }));

    const handleSubmit = (values: BasicInfoFormValues) => {
        if (!logo) {
            setLogoError("Logo is required");
            return;
        }
        onSubmit(values, logo);
    }

    const formboxstyle = { width: "100%", maxWidth: "400px", mx: {xs: "auto", sm: 0} }
    return (
        <Formik
            initialValues={{
                companyName: data?.companyName || "",
                companyType: data?.companyType || "",
                industry: data?.industry || "",
                location: {
                    country: data?.location?.country || "",
                    city: data?.location?.city || "",
                }
            }}
            validationSchema={BasicInfoFormSchema}
            onSubmit={handleSubmit}
            innerRef={formikRef}
        >
            {({ values, errors, touched, setFieldValue }) => (
                <Form>
                    <FormLayout title="Company Logo" description="This image will be shown publicly as company logo.">
                        <Box sx={{
                            display: "flex",
                            flexDirection: { xs: "column", sm: "row" },
                            alignContent: "center",
                            justifyContent: "center",
                            gap: { xs: 0, sm: 2 },
                        }}>
                            <ImagePreviewer
                                onCropped={handleCropped}
                                image={logoPreview}
                                shape="circle"
                                styles={{ width: "100%", maxWidth: "100px", height: "100px", marginBlock: 2, marginInline: "auto" }} />
                            <Box flexGrow={1}>
                                <ImageUploader onChange={handleImageChange} error={logoError} />
                            </Box>
                        </Box>
                    </FormLayout>

                    <FormLayout title="Company Details" description="Introduce your company core info quickly to users by filling up company details.">
                        <Box sx={formboxstyle}>
                            <Typography variant="body1" fontWeight={500} mb={1}>
                                Company Name
                            </Typography>
                            <Field
                                name="companyName"
                                variant="outlined"
                                fullWidth
                                placeholder="Enter your company's name"
                                as={TextField}
                                error={touched.companyName && Boolean(errors.companyName)}
                                helperText={touched.companyName && errors.companyName}
                            />
                        </Box>

                        <Box sx={formboxstyle}>
                            <Typography variant="body1" fontWeight={500} mb={1}>
                                Company Type
                            </Typography>
                            <Field
                                name="companyType"
                                label="Company Type"
                                select
                                variant="outlined"
                                fullWidth
                                as={TextField}
                                error={touched.companyType && Boolean(errors.companyType)}
                                helperText={touched.companyType && errors.companyType}
                            >
                                {companyTypes.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </Field>
                        </Box>

                        <Box sx={formboxstyle}>
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

                        <Box sx={{ ...formboxstyle, mb: {xs: 6, sm: 0} }}>
                            <Typography variant="body1" fontWeight={500} mb={1}>
                                Location
                            </Typography>
                            <Box display="flex" gap={2} mb={3} flexWrap={"wrap"}>
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
                    </FormLayout>
                </Form>
            )}
        </Formik>
    );
});

export default BasicInfoForm;
