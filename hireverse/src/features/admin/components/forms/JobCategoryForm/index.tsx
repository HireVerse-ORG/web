import { Box, Button, CircularProgress, TextField, Typography, Chip } from "@mui/material";
import { Formik, Form, Field } from "formik";
import { toast } from "sonner";
import { JobCategorySchema } from "./schema";
import { IJobCategory } from "@core/types/jobCategory.interface";
import { createJobCategory, updateJobCategory } from "@core/api/admin/jobCategoryApi";

type JobCategoryFormProps = { 
    category?: IJobCategory | null; 
    onSuccess: () => void;
}

const JobCategoryForm = ({ category, onSuccess }: JobCategoryFormProps) => {
    const handleSubmit = async (
        values: { name: string; isActive: boolean },
        { setErrors }: { setErrors: (errors: { [key: string]: string }) => void }
    ) => {
        try {
            if (category) {
                await updateJobCategory({...values, id: category.id});
                toast.success("Category updated successfully!");
            } else {
                // Adding a new category
                await createJobCategory(values);
                toast.success("Category created successfully!");
            }
            onSuccess();
        } catch (error: any) {
            setErrors({ name: error || `Failed to ${category ? 'update' : 'add'} category` });
        }
    };

    return (
        <Formik
            initialValues={{
                name: category?.name || "",
                isActive: category?.isActive || false,
            }}
            validationSchema={JobCategorySchema}
            onSubmit={handleSubmit}
        >
            {({ errors, touched, isSubmitting, setFieldValue, values }) => (
                <Form>
                    {/* category Name */}
                    <Box mb={3}>
                        <Typography variant="body1" fontWeight={500} textAlign="left" mb={1}>
                            Category Name
                        </Typography>
                        <Field
                            as={TextField}
                            fullWidth
                            name="name"
                            variant="outlined"
                            placeholder="Enter category name"
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
                        {isSubmitting ? <CircularProgress size={20} /> : category ? "Update category" : "Add category"}
                    </Button>
                </Form>
            )}
        </Formik>
    );
};

export default JobCategoryForm;
