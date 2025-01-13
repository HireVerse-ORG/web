import { TextField, Box, Typography } from "@mui/material";
import { Formik, Field, Form, FormikProps } from "formik";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import FormLayout from "@core/components/layouts/FormLayout";
import * as Yup from "yup";
import AboutCompanyEditor from "../AboutCompanyEditor";

interface CompanyProfileFormValues {
    employeeCount: string;
}

export interface CompanyProfileValues extends CompanyProfileFormValues {
    aboutCompany: string;
}

const CompanyProfileFormSchema = Yup.object({
    employeeCount: Yup.number()
        .notRequired()
        .typeError('Employee count must be a number')
        .integer('Employee count must be a whole number')
        .min(0, 'Employee count cannot be negative'),
});

type CompanyProfileFormProps = {
    data?: CompanyProfileValues;
    onSubmit: (values: CompanyProfileValues) => void;
};

const CompanyProfileForm = forwardRef(
    ({ data, onSubmit }: CompanyProfileFormProps, ref) => {
        const formikRef = useRef<FormikProps<CompanyProfileFormValues> | null>(null);
        const [aboutCompany, setAboutCompany] = useState<string>(data?.aboutCompany || "");

        useImperativeHandle(ref, () => ({
            submitForm: () => formikRef.current?.submitForm(),
        }));


        // Formik submit handler
        const handleSubmit = (values: CompanyProfileFormValues) => {
            onSubmit({
                aboutCompany: aboutCompany,
                employeeCount: values.employeeCount,
            });
        };

        return (
            <Formik
                innerRef={formikRef}
                initialValues={{
                    employeeCount: data?.employeeCount || "",
                }}
                validationSchema={CompanyProfileFormSchema}
                onSubmit={handleSubmit}
            >
                {({ errors, touched }) => (
                    <Form>
                        <FormLayout title="Company Information" description="Update your company details.">
                            <Box sx={{ width: "100%", maxWidth: "400px", mx: { xs: "auto", sm: 0 } }}>
                                <Typography variant="body1" fontWeight={500} mb={1}>
                                    About Company
                                </Typography>
                                <AboutCompanyEditor value={data?.aboutCompany} onData={(data) => {setAboutCompany(data)}} />
                            </Box>

                            <Box sx={{ width: "100%", maxWidth: "400px", mx: { xs: "auto", sm: 0 }, mb: 6 }}>
                                <Typography variant="body1" fontWeight={500} mb={1}>
                                    Employee Count
                                </Typography>
                                <Field
                                    name="employeeCount"
                                    variant="outlined"
                                    fullWidth
                                    placeholder="Enter the number of employees"
                                    as={TextField}
                                    error={touched.employeeCount && Boolean(errors.employeeCount)}
                                    helperText={touched.employeeCount && errors.employeeCount}
                                />
                            </Box>
                        </FormLayout>
                    </Form>
                )}
            </Formik>
        );
    }
);

export default CompanyProfileForm;
