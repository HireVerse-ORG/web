import FormLayout from "@core/components/layouts/FormLayout";
import colors from "@core/theme/colors";
import { Autocomplete, Box, Button, Checkbox, debounce, FormControlLabel, Slider, TextField, Typography } from "@mui/material";
import { Field, Form, Formik, FormikProps } from "formik";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { JobBasicInfoFormSchema } from "./schema";
import { Add } from "@mui/icons-material";
import { searchJobCategories } from "@core/api/shared/jobCategoryApi";
import { searchSkills } from "@core/api/shared/skillApi";
import CustomDialog from "@core/components/ui/CustomDialog";
import JobSkillForm from "../JobSkillForm";
import { ISkill } from "@core/types/skill.interface";
import { EMPLOYMENT_TYPES } from "@core/data/companyFormData";

export interface JobBasicInfoFormValues {
    title: string;
    employmentTypes: string[];
    salaryRange: number[] | null;
    categories: { id: string, name: string }[];
    skills: { id: string, name: string }[];
}

type JobBasicInfoFormProps = {
    data?: Partial<JobBasicInfoFormValues>;
    onSubmit: (values: JobBasicInfoFormValues) => void;
};

const JobBasicInfoForm = forwardRef(({ data, onSubmit }: JobBasicInfoFormProps, ref) => {
    const formikRef = useRef<FormikProps<JobBasicInfoFormValues> | null>(null);
    const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);
    const [categoriesLoading, setCategoriesLoading] = useState(false);
    const [skills, setSkills] = useState<{ id: string; name: string }[]>([]);
    const [skillsLoading, setSkillsLoading] = useState(false);
    const [salaryRange, setSalaryRange] = useState<number[] | null>(data?.salaryRange || null);
    const [modelOpen, setModelOpen] = useState(false);


    const fetchCategories = debounce(async (query: string) => {
        setCategoriesLoading(true);
        try {
            const response = await searchJobCategories(query);
            const mappedCategories = response.map(ct => ({ id: ct.id, name: ct.name }));
            setCategories(mappedCategories);
        } catch (error) {
            setCategories([]);
        } finally {
            setCategoriesLoading(true);
        }
    }, 500)

    const fetchSkills = debounce(async (query: string) => {
        setSkillsLoading(true);
        try {
            const response = await searchSkills(query);
            const mappedSkills = response.map(data => ({ id: data.id, name: data.name }));
            setSkills(mappedSkills);
        } catch (error) {
            setSkills([]);
        } finally {
            setSkillsLoading(true);
        }
    }, 500)

    useImperativeHandle(ref, () => ({
        submitForm: () => formikRef.current?.submitForm(),
        getValues: () => formikRef.current?.values,
    }));

    const handleSubmit = (values: JobBasicInfoFormValues) => {
        onSubmit(values);
    };

    const formboxstyle = { width: "100%", maxWidth: "400px", mx: { xs: "auto", sm: 0 } };
    const formLayoutstyle = {
        borderTop: `1px solid ${colors.borderColour}`,
        pt: 3,
    };

    const handleModelClose = () => setModelOpen(false);

    const handleAddSkillSuccess = (skill: ISkill) => {
        setSkills((prevSkills) => [...prevSkills, {id: skill.id, name: skill.name}]); 
        setModelOpen(false); 
    };

    return (
        <>
            <Formik
                initialValues={{
                    title: data?.title || "",
                    employmentTypes: data?.employmentTypes || [],
                    salaryRange: salaryRange,
                    categories: data?.categories || [],
                    skills: data?.skills || [],
                }}
                validationSchema={JobBasicInfoFormSchema}
                onSubmit={handleSubmit}
                innerRef={formikRef}
            >
                {({ errors, touched }) => (
                    <Form>
                        <Typography variant="h6" gutterBottom>
                            Basic Information
                        </Typography>
                        <Typography variant="body2" color="textDisabled" gutterBottom mb={3}>
                            This information will be displayed publicly
                        </Typography>
                        {/* Job Title */}
                        <FormLayout title="Job Title" description="Job titles must describe one position" sx={formLayoutstyle}>
                            <Box sx={formboxstyle}>
                                <Field
                                    name="title"
                                    variant="outlined"
                                    fullWidth
                                    placeholder="e.g. Software Engineer"
                                    as={TextField}
                                    error={touched.title && Boolean(errors.title)}
                                    helperText={touched.title && errors.title}
                                />
                            </Box>
                        </FormLayout>
                        {/* Employment Types */}
                        <FormLayout title="Type of Employment" description="You can select multiple types of employment" sx={formLayoutstyle}>
                            <Box sx={formboxstyle}>
                                {EMPLOYMENT_TYPES.map((type) => (
                                    <Field
                                        type="checkbox"
                                        name="employmentTypes"
                                        value={type.value}
                                        key={type.value}
                                        as={Checkbox}
                                        render={({ field }: { field: any }) => (
                                            <FormControlLabel control={<Checkbox {...field} />} label={type.label} />
                                        )}
                                    />
                                ))}

                                {touched.employmentTypes && errors.employmentTypes && (
                                    <Typography variant="body2" color="error">
                                        {errors.employmentTypes}
                                    </Typography>
                                )}
                            </Box>
                        </FormLayout>
                        {/* Salary Range */}
                        <FormLayout
                            title="Salary"
                            description="Please specify the estimated salary range for the role. *You can leave this blank"
                            sx={formLayoutstyle}
                        >
                            <Box sx={formboxstyle}>
                                <Field name="salaryRange">
                                    {({ field, form }: { field: any; form: any }) => (
                                        <>
                                            <Box
                                                display="flex"
                                                alignItems="center"
                                                gap={2}
                                                sx={{ flexWrap: { xs: "wrap", sm: "nowrap" }, mb: 2 }}
                                            >
                                                {/* Start Range */}
                                                <TextField
                                                    label="Start Range"
                                                    type="number"
                                                    size="small"
                                                    value={field.value?.[0] || 0}
                                                    onChange={(e) => {
                                                        const newValue = [Number(e.target.value), field.value?.[1] || 0];
                                                        setSalaryRange(newValue);
                                                        form.setFieldValue("salaryRange", newValue);
                                                    }}
                                                    slotProps={{
                                                        htmlInput: { min: 0, max: 200000 }
                                                    }}
                                                />
                                                <Typography>to</Typography>
                                                {/* End Range */}
                                                <TextField
                                                    label="End Range"
                                                    type="number"
                                                    size="small"
                                                    value={field.value?.[1] || 0}
                                                    onChange={(e) => {
                                                        const newValue = [field.value?.[0] || 0, Number(e.target.value)];
                                                        setSalaryRange(newValue);
                                                        form.setFieldValue("salaryRange", newValue);
                                                    }}
                                                    slotProps={{
                                                        htmlInput: { min: 0, max: 200000 }
                                                    }}
                                                />
                                            </Box>
                                            {/* Slider */}
                                            <Slider
                                                value={field.value || [0, 0]}
                                                onChange={(_, newValue) => {
                                                    setSalaryRange(newValue as number[]);
                                                    form.setFieldValue("salaryRange", newValue);
                                                }}
                                                valueLabelDisplay="auto"
                                                min={0}
                                                max={200000}
                                            />

                                            {touched.salaryRange && errors.salaryRange && (
                                                <Typography variant="body2" color="error">
                                                    {errors.salaryRange}
                                                </Typography>
                                            )}
                                        </>
                                    )}
                                </Field>
                            </Box>
                        </FormLayout>
                        {/* Categories Field */}
                        <FormLayout
                            title="Categories"
                            description="You can select multiple job categories"
                            sx={formLayoutstyle}
                        >
                            <Box sx={formboxstyle}>
                                <Field name="categories">
                                    {({ field, form }: { field: any; form: any }) => (
                                        <Autocomplete
                                            multiple
                                            options={categories}
                                            loading={categoriesLoading}
                                            getOptionLabel={(option) => option.name}
                                            value={field.value || []}
                                            onChange={(_, selectedOptions) => {
                                                form.setFieldValue("categories", selectedOptions);
                                            }}
                                            onInputChange={(_, newValue) => {
                                                if (newValue) {
                                                    fetchCategories(newValue);
                                                }
                                            }}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    placeholder="Select categories"
                                                    variant="outlined"
                                                    error={touched.title && Boolean(errors.skills)}
                                                />
                                            )}
                                        />
                                    )}
                                </Field>

                                {touched.categories && errors.categories && (
                                    <Typography variant="body2" color="error">
                                        {errors.categories.toString()}
                                    </Typography>
                                )}
                            </Box>
                        </FormLayout>


                        <FormLayout title="Required Skills"
                            description="Add required skills for the job"
                            sx={formLayoutstyle}>
                            <Box sx={formboxstyle}>
                                <Field name="skills">
                                    {({ field, form }: { field: any; form: any }) => (
                                        <>
                                            <Button
                                                variant="outlined"
                                                startIcon={<Add />}
                                                sx={{ mb: 1 }}
                                                onClick={() => setModelOpen(true)}
                                            >
                                                Add Skill
                                            </Button>
                                            <Autocomplete
                                                multiple
                                                options={skills}
                                                loading={skillsLoading}
                                                getOptionLabel={(option) => option.name}
                                                value={field.value || []}
                                                onChange={(_, selectedOptions) => {
                                                    form.setFieldValue("skills", selectedOptions);
                                                }}
                                                onInputChange={(_, newValue) => {
                                                    if (newValue) {
                                                        fetchSkills(newValue);
                                                    }
                                                }}
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        placeholder="Select skills"
                                                        variant="outlined"
                                                        error={touched.categories && Boolean(errors.categories)}
                                                    />
                                                )}
                                            />
                                        </>

                                    )}
                                </Field>

                                {touched.skills && errors.skills && (
                                    <Typography variant="body2" color="error">
                                        {errors.skills.toString()}
                                    </Typography>
                                )}
                            </Box>
                        </FormLayout>
                    </Form>
                )}
            </Formik>
            <CustomDialog open={modelOpen} onClose={handleModelClose} title="Add a New Skill">
                <JobSkillForm onAdded={handleAddSkillSuccess}/>
            </CustomDialog>
        </>
    );
});

export default JobBasicInfoForm;
