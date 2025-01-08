import { SeekerEducation } from "@core/types/seeker.interface";
import { Box, TextField, Typography, Checkbox, FormControlLabel, Button, CircularProgress } from "@mui/material";
import { Formik, Form, Field } from "formik";
import { useState } from "react";
import CountryInput from "@core/components/ui/LocationInputs/CountryInput";
import CityInput from "@core/components/ui/LocationInputs/CityInput";
import { SeekerEducationFormSchema } from "./schema";
import { toast } from "sonner";
import { createSeekerEducation, deleteSeekerEducation, updateSeekerEducation } from "@core/api/seeker/educationApi";

type SeekerEducationFormProps = {
    education?: SeekerEducation | null;
    onAdded?: (education: SeekerEducation) => void;
    onUpdated?: (education: SeekerEducation) => void;
    onDeleted?: (education: SeekerEducation) => void;
};

const SeekerEducationForm = ({ education, onAdded, onUpdated, onDeleted }: SeekerEducationFormProps) => {
    const [currentlyPursuing, setCurrentlyPursuing] = useState<boolean>(education?.currentlyPursuing || false);
    const [deleting, setDeleting] = useState<boolean>(false);

    const handleSubmit = async (
        values: any,
        { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void; }
    ) => {
        try {
            if (education) {
                const updatedEducation = await updateSeekerEducation(education.id, values);
                onUpdated?.(updatedEducation);
                toast.success("Education updated successfully!");
            } else {
                const newEducation = await createSeekerEducation(values);
                onAdded?.(newEducation);
                toast.success("Education added successfully!");
            }
        } catch (error) {
            toast.error("Failed to update profile.");
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (education: SeekerEducation) => {
        setDeleting(true);
        try {
            await deleteSeekerEducation(education.id);
            toast.info("Education deleted successfully!!");
            onDeleted?.(education)
        } catch (error) {
            toast.error("Failed to update profile.");
        } finally {
            setDeleting(false);
        }
    }

    return (
        <Formik
            initialValues={{
                school: education?.school || "",
                fieldOfStudy: education?.fieldOfStudy || "",
                startMonth: education?.startMonth || "",
                startYear: education?.startYear || "",
                endMonth: education?.endMonth || "",
                endYear: education?.endYear || "",
                currentlyPursuing: education?.currentlyPursuing || false,
                location: {
                    city: education?.location?.city || "",
                    country: education?.location?.country || "",
                },
                description: education?.description || "",
            }}
            validationSchema={SeekerEducationFormSchema}
            onSubmit={handleSubmit}
        >
            {({ values, errors, touched, isSubmitting, setFieldValue }) => (
                <Form>
                    {/* Title */}
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                        <Typography variant="h6" fontWeight="bold">
                            Education
                        </Typography>
                    </Box>

                    {/* School */}
                    <Box mb={3}>
                        <Typography variant="body1" fontWeight={500} mb={1}>
                            School
                        </Typography>
                        <Field
                            as={TextField}
                            fullWidth
                            name="school"
                            variant="outlined"
                            placeholder="Enter your school or organisation"
                            error={touched.school && !!errors.school}
                            helperText={touched.school && errors.school}
                        />
                    </Box>

                    {/* Field of Study */}
                    <Box mb={3}>
                        <Typography variant="body1" fontWeight={500} mb={1}>
                            Field of Study
                        </Typography>
                        <Field
                            as={TextField}
                            fullWidth
                            name="fieldOfStudy"
                            variant="outlined"
                            placeholder="Enter your field of study"
                            error={touched.fieldOfStudy && !!errors.fieldOfStudy}
                            helperText={touched.fieldOfStudy && errors.fieldOfStudy}
                        />
                    </Box>

                    {/* Start Month and Year */}
                    <Box mb={3} display="flex" gap={2}>
                        <Box flex={1}>
                            <Typography variant="body1" fontWeight={500} mb={1}>
                                Start Month
                            </Typography>
                            <Field
                                as={TextField}
                                fullWidth
                                name="startMonth"
                                type="number"
                                variant="outlined"
                                placeholder="MM"
                                error={touched.startMonth && !!errors.startMonth}
                                helperText={touched.startMonth && errors.startMonth}
                            />
                        </Box>
                        <Box flex={1}>
                            <Typography variant="body1" fontWeight={500} mb={1}>
                                Start Year
                            </Typography>
                            <Field
                                as={TextField}
                                fullWidth
                                name="startYear"
                                type="number"
                                variant="outlined"
                                placeholder="YYYY"
                                error={touched.startYear && !!errors.startYear}
                                helperText={touched.startYear && errors.startYear}
                            />
                        </Box>
                    </Box>

                    {/* End Month and Year */}
                    <Box mb={3} display="flex" gap={2}>
                        <Box flex={1}>
                            <Typography variant="body1" fontWeight={500} mb={1}>
                                End Month
                            </Typography>
                            <Field
                                as={TextField}
                                fullWidth
                                name="endMonth"
                                type="number"
                                variant="outlined"
                                placeholder="MM"
                                disabled={currentlyPursuing}
                                error={touched.endMonth && !!errors.endMonth}
                                helperText={touched.endMonth && errors.endMonth}
                            />
                        </Box>
                        <Box flex={1}>
                            <Typography variant="body1" fontWeight={500} mb={1}>
                                End Year
                            </Typography>
                            <Field
                                as={TextField}
                                fullWidth
                                name="endYear"
                                type="number"
                                variant="outlined"
                                placeholder="YYYY"
                                disabled={currentlyPursuing}
                                error={touched.endYear && !!errors.endYear}
                                helperText={touched.endYear && errors.endYear}
                            />
                        </Box>
                    </Box>

                    {/* Currently Pursuing */}
                    <Box mb={3}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={currentlyPursuing}
                                    onChange={(e) => {
                                        setFieldValue("currentlyPursuing", e.target.checked);
                                        setFieldValue("endMonth", "")
                                        setFieldValue("endYear", "")
                                        setCurrentlyPursuing(e.target.checked);
                                    }}
                                />
                            }
                            label="Currently Pursuing"
                        />
                    </Box>

                    {/* Location */}
                    <Box mb={3}>
                        <Typography variant="body1" fontWeight={500} mb={1}>
                            Location
                        </Typography>
                        <Box display="flex" gap={2} mb={3}>
                            {/* Country */}
                            <CountryInput
                                initialValue={values.location.country}
                                onCountryChange={(newCountry) => {
                                    setFieldValue("location.country", newCountry);
                                    setFieldValue("location.city", null);
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

                    {/* Description */}
                    <Box mb={3}>
                        <Typography variant="body1" fontWeight={500} mb={1}>
                            Description
                        </Typography>
                        <Field
                            as={TextField}
                            fullWidth
                            name="description"
                            variant="outlined"
                            multiline
                            rows={3}
                            placeholder="Enter a description"
                            error={touched.description && !!errors.description}
                            helperText={touched.description && errors.description}
                        />
                    </Box>

                    <Box sx={{
                        display: "flex",
                        flexDirection: {xs: "column", sm: "row"},
                        justifyContent: "center",
                        gap: 3,
                        mb: { xs: 3, sm: 0 }, 
                    }}>
                        {/* Delete Button */}
                        {education && (
                            <Button
                                fullWidth
                                variant="outlined"
                                color="error"
                                size="large"
                                onClick={() => handleDelete(education)}
                                disabled={isSubmitting || deleting}
                            >
                                Delete Education
                            </Button>
                        )}

                        {/* Save Button */}
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            size="large"
                            type="submit"
                            disabled={isSubmitting || deleting}
                        >
                            {isSubmitting ? <CircularProgress size={20} /> : "Save"}
                        </Button>

                    </Box>
                </Form>
            )}
        </Formik>
    );
};

export default SeekerEducationForm;
