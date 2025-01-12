import { TextField, Box, Typography } from "@mui/material";
import { Formik, Field, Form, FormikProps } from "formik";
import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import FormLayout from "@core/components/layouts/FormLayout";
import * as Yup from "yup";
import Quill from "quill";
import QuillEditor from "@core/components/ui/QuillEditor";
import { sanitizeHtml } from "@core/utils/helper";

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
        const quillRef = useRef<Quill | null>(null);
        const aboutCompany = useRef<string>(data?.aboutCompany || "");

        const toolbarOptions = [
            [{ 'header': '2' }],
            ["bold", "italic", "underline"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["clean"],
        ];

        useEffect(() => {
            if (quillRef.current && data?.aboutCompany) {
                quillRef.current.clipboard.dangerouslyPasteHTML(data.aboutCompany);
            }
        }, [data?.aboutCompany]);

        useImperativeHandle(ref, () => ({
            submitForm: () => formikRef.current?.submitForm(),
        }));

        const handleTextChange = () => {
            if (quillRef.current) {
                const textContent = quillRef.current.getText();
                const htmlContent = quillRef.current.getSemanticHTML();
                if (textContent.length > 0) {
                    aboutCompany.current = sanitizeHtml(htmlContent);
                }
            }
        }

        const handleSubmit = (values: CompanyProfileFormValues) => {
            onSubmit({
                aboutCompany: aboutCompany.current,
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
                                <QuillEditor
                                    ref={quillRef}
                                    modules={{
                                        toolbar: toolbarOptions,
                                    }}
                                    placeholder="Write about your company"
                                    style={{ height: "200px" }}
                                    maxLength={700}
                                    onTextChange={handleTextChange}
                                />
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
