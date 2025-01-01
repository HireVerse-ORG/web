import { Box, Button, CircularProgress, TextField, Typography, Chip } from "@mui/material";
import { Formik, Form, Field } from "formik";
import { createSkill, updateSkill } from "@core/api/admin/skillapi";  
import { toast } from "sonner";
import { SkillSchema } from "./schema";
import { ISkill } from "@core/types/skill.interface";

type SkillFormProps = { 
    skill?: ISkill | null; 
    onSuccess: () => void;
}

const SkillForm = ({ skill, onSuccess }: SkillFormProps) => {
    const handleSubmit = async (
        values: { name: string; isActive: boolean },
        { setErrors }: { setErrors: (errors: { [key: string]: string }) => void }
    ) => {
        try {
            if (skill) {
                // Editing an existing skill
                await updateSkill({...values, id: skill.id});
                toast.success("Skill updated successfully!");
            } else {
                // Adding a new skill
                await createSkill(values);
                toast.success("Skill created successfully!");
            }
            onSuccess();
        } catch (error: any) {
            setErrors({ name: error || `Failed to ${skill ? 'update' : 'add'} skill` });
        }
    };

    return (
        <Formik
            initialValues={{
                name: skill?.name || "",
                isActive: skill?.isActive || false,
            }}
            validationSchema={SkillSchema}
            onSubmit={handleSubmit}
        >
            {({ errors, touched, isSubmitting, setFieldValue, values }) => (
                <Form>
                    {/* Skill Name */}
                    <Box mb={3}>
                        <Typography variant="body1" fontWeight={500} textAlign="left" mb={1}>
                            Skill Name
                        </Typography>
                        <Field
                            as={TextField}
                            fullWidth
                            name="name"
                            variant="outlined"
                            placeholder="Enter skill name"
                            error={touched.name && !!errors.name}
                            helperText={touched.name && errors.name}
                        />
                    </Box>

                    {/* Status */}
                    <Box mb={3}>
                        <Typography variant="body1" fontWeight={500} textAlign="left" mb={1}>
                            Status
                        </Typography>
                        <Chip
                            label={values.isActive ? "Active" : "Inactive"}
                            color={values.isActive ? "success" : "error"}
                            onClick={() => setFieldValue("isActive", !values.isActive)}  
                            sx={{ cursor: "pointer", marginTop: 1 }}
                        />
                    </Box>

                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        size="large"
                        type="submit"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? <CircularProgress size={20} /> : skill ? "Update Skill" : "Add Skill"}
                    </Button>
                </Form>
            )}
        </Formik>
    );
};

export default SkillForm;
