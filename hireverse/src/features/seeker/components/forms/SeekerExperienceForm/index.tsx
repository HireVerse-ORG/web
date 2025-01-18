import { createSeekerExperience, deleteSeekerExperience, updateSeekerExperience } from "@core/api/seeker/experiencesApi";
import { SeekerExperience } from "@core/types/seeker.interface";
import { Field, Form, Formik } from "formik";
import { useState } from "react";
import { toast } from "sonner";
import { SeekerExperienceFormSchema } from "./schema";
import { Autocomplete, Box, Button, Checkbox, CircularProgress, debounce, FormControl, FormControlLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import CountryInput from "@core/components/ui/LocationInputs/CountryInput";
import CityInput from "@core/components/ui/LocationInputs/CityInput";
import { listPublicCompanies } from "@core/api/shared/companyApi";

type SeekerExperienceFormProps = {
    experience?: SeekerExperience | null;
    onAdded?: (experience: SeekerExperience) => void;
    onUpdated?: (experience: SeekerExperience) => void;
    onDeleted?: (experience: SeekerExperience) => void;
};

const EMPLOYMENT_TYPES = [
    { value: "full-time", label: "Full-Time" },
    { value: "part-time", label: "Part-Time" },
    { value: "internship", label: "Internship" },
    { value: "freelance", label: "Freelance" },
    { value: "contract", label: "Contract" },
];

const SeekerExperienceForm = ({ experience, onAdded, onDeleted, onUpdated }: SeekerExperienceFormProps) => {
    const [companies, setCompanies] = useState<{ companyId: string | null, name: string}[]>([]);  
    const [loadingCompanies, setLoadingCompanies] = useState(false);
    const [company, setCompany] = useState<{ companyId: string | null, name: string}>(experience?.company || { companyId: null, name: "" });  
    const [companyError, setCompanyError] = useState<string>("");  
    const [currentlyWorking, setCurrentlyWorking] = useState<boolean>(experience?.currentlyWorking || false);
    const [deleting, setDeleting] = useState<boolean>(false);

    const fetchCompanies = debounce(async (query: string) => {
        setLoadingCompanies(true);
        try {
            const response = (await listPublicCompanies(1, 10, query)).data;
            const mappedResponse = response.map(cmp => ({
                companyId: cmp.id,
                name: cmp.name,
            }));
            setCompanies(mappedResponse);
        } catch (error) {
            setCompanies([]);
        } finally {
            setLoadingCompanies(false);
        }
    }, 500);

    const handleSubmit = async (
        values: any,
        { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
    ) => {
        if (!company.name) {
            setCompanyError("Company is required");
            return; 
        }

        setCompanyError("");
        try {
            if (experience) {
                const updatedExperience = await updateSeekerExperience(
                    experience.id,
                    {...values, company}
                );
                onUpdated?.(updatedExperience);
                toast.success("Experience updated successfully!");
            } else {
                const newExperience = await createSeekerExperience({...values, company});
                onAdded?.(newExperience);
                toast.success("Experience added successfully!");
            }
        } catch (error) {
            toast.error("Failed to update profile.");
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (experience: SeekerExperience) => {
        setDeleting(true);
        try {
            await deleteSeekerExperience(experience.id);
            toast.info("Experience deleted successfully!");
            onDeleted?.(experience);
        } catch (error) {
            toast.error("Failed to delete experience.");
        } finally {
            setDeleting(false);
        }
    };

    return (
        <Formik
            initialValues={{
                title: experience?.title || "",
                employmentType: experience?.employmentType || "",
                startMonth: experience?.startMonth || "",
                startYear: experience?.startYear || "",
                endMonth: experience?.endMonth || "",
                endYear: experience?.endYear || "",
                currentlyWorking: experience?.currentlyWorking || false,
                location: {
                    city: experience?.location?.city || "",
                    country: experience?.location?.country || "",
                },
                description: experience?.description || "",
            }}
            validationSchema={SeekerExperienceFormSchema}
            onSubmit={handleSubmit}
        >
            {({ values, errors, touched, isSubmitting, setFieldValue }) => (
                <Form>

                    {/* Company Selection */}
                    <Box mb={3}>
                        <Typography variant="body1" fontWeight={500} mb={1}>
                            Company
                        </Typography>
                        <Autocomplete
                            options={companies}
                            getOptionLabel={(option) => {
                                if (typeof option === "string") {
                                    return option;
                                }
                                return option?.name || "";
                            }}
                            loading={loadingCompanies}
                            value={company}
                            onChange={(_, newValue) => {
                                if (typeof newValue === "string") {
                                    setCompany({ name: newValue, companyId: null });
                                } else if (newValue && newValue.companyId) {
                                    setCompany(newValue);
                                } else {
                                    setCompany({ name: "", companyId: null });
                                }
                            }}

                            onInputChange={(_, newInputValue) => {
                                if(newInputValue){
                                    fetchCompanies(newInputValue)
                                    if(experience && newInputValue === experience.company.name){
                                        setCompany({name: experience.company.name, companyId: experience.company.companyId})
                                    } else {
                                        setCompany({ name: newInputValue, companyId: null });
                                    }
                                } else {
                                    setCompany({ name: "", companyId: null });
                                }
                            }}
                            freeSolo
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant="outlined"
                                    placeholder="Search or add a company"
                                    error={!!companyError}
                                    helperText={companyError}
                                />
                            )}
                        />
                    </Box>

                    {/* Title */}
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                        <Typography variant="h6" fontWeight="bold">
                            Experience
                        </Typography>
                    </Box>

                    {/* Job Title */}
                    <Box mb={3}>
                        <Typography variant="body1" fontWeight={500} mb={1}>
                            Title
                        </Typography>
                        <Field
                            as={TextField}
                            fullWidth
                            name="title"
                            variant="outlined"
                            placeholder="Enter your job title"
                            error={touched.title && !!errors.title}
                            helperText={touched.title && errors.title}
                        />
                    </Box>

                    {/* Employment Type */}
                    <Box mb={3}>
                        <Typography variant="body1" fontWeight={500} mb={1}>
                            Employment Type
                        </Typography>
                        <FormControl fullWidth>
                            <Field
                                as={Select}
                                labelId="employment-type-label"
                                name="employmentType"
                                value={values.employmentType}
                                onChange={(e: React.ChangeEvent<{ value: unknown }>) =>
                                    setFieldValue("employmentType", e.target.value)
                                }
                                error={touched.employmentType && !!errors.employmentType}
                            >
                                {EMPLOYMENT_TYPES.map((type) => (
                                    <MenuItem key={type.value} value={type.value}>
                                        {type.label}
                                    </MenuItem>
                                ))}
                            </Field>
                        </FormControl>
                        {touched.employmentType && errors.employmentType && (
                            <Typography variant="body2" color="error">
                                {errors.employmentType}
                            </Typography>
                        )}
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
                                disabled={currentlyWorking}
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
                                disabled={currentlyWorking}
                                error={touched.endYear && !!errors.endYear}
                                helperText={touched.endYear && errors.endYear}
                            />
                        </Box>
                    </Box>

                    {/* Currently Working */}
                    <Box mb={3}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={currentlyWorking}
                                    onChange={(e) => {
                                        setFieldValue("currentlyWorking", e.target.checked);
                                        setFieldValue("endMonth", "")
                                        setFieldValue("endYear", "")
                                        setCurrentlyWorking(e.target.checked);
                                    }}
                                />
                            }
                            label="Currently Working"
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
                        flexDirection: { xs: "column", sm: "row" },
                        justifyContent: "center",
                        gap: 3,
                        mb: { xs: 3, sm: 0 },
                    }}>
                        {/* Delete Button */}
                        {experience && (
                            <Button
                                fullWidth
                                variant="outlined"
                                color="error"
                                size="large"
                                onClick={() => handleDelete(experience)}
                                disabled={isSubmitting || deleting}
                            >
                                Delete Experience
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
}

export default SeekerExperienceForm;
