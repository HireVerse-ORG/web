import FormLayout from "@core/components/layouts/FormLayout";
import QuillEditor2 from "@core/components/ui/QuillEditor2";
import colors from "@core/theme/colors";
import { Box, Typography } from "@mui/material";
import { Form, Formik, FormikProps } from "formik";
import { forwardRef, useImperativeHandle, useRef } from "react";
import * as Yup from "yup";

export interface JobDescriptionFormValues {
  description: string;
  responsibilities: string;
  whoYouAre: string;
  niceToHaves: string;
}

type JobDescriptionFormProps = {
  data?: Partial<JobDescriptionFormValues>;
  onSubmit: (values: JobDescriptionFormValues) => void;
};

const JobDescriptionForm = forwardRef(
  ({ data, onSubmit }: JobDescriptionFormProps, ref) => {
    const formikRef = useRef<FormikProps<JobDescriptionFormValues> | null>(null);

    useImperativeHandle(ref, () => ({
      submitForm: () => formikRef.current?.submitForm(),
      getValues: () => formikRef.current?.values,
    }));

    const handleSubmit = (values: JobDescriptionFormValues) => {
      onSubmit(values);
    };

    // Quill toolbar options
    const toolbarOptions = [
      // [{ header: "2" }],
      ["bold", "italic", "underline"],
      [{ list: "bullet" }],
    ];

    const formboxstyle = { width: "100%", maxWidth: "400px", mx: { xs: "auto", sm: 0 } };
    const formLayoutstyle = {
      borderTop: `1px solid ${colors.borderColour}`,
      pt: 3,
    };

    // Validation Schema with Yup
    const JobDescriptionFormSchema = Yup.object().shape({
      description: Yup.string().required("Job description is required"),
      responsibilities: Yup.string(),
      whoYouAre: Yup.string(),
      niceToHaves: Yup.string(),
    });

    return (
      <Formik
        initialValues={{
          description: data?.description || "",
          responsibilities: data?.responsibilities || "",
          whoYouAre: data?.whoYouAre || "",
          niceToHaves: data?.niceToHaves || "",
        }}
        validationSchema={JobDescriptionFormSchema}
        onSubmit={handleSubmit}
        innerRef={formikRef}
      >
        {({ values, errors, touched, setFieldValue }) => (
          <Form>
            <Typography variant="h6" gutterBottom>
              Job Information
            </Typography>
            <Typography variant="body2" color="textDisabled" gutterBottom mb={3}>
              Add the description of the job, responsibilities, who you are, and nice-to-haves.
            </Typography>

            {/* Job Descriptions */}
            <FormLayout
              title="Job Descriptions"
              description="Job titles must describe one position"
              sx={formLayoutstyle}
            >
              <Box sx={formboxstyle}>
                <QuillEditor2
                  editorId="job-description-editor"
                  value={values.description}
                  toolbarOptions={toolbarOptions}
                  placeholder="Enter Job Description"
                  onData={(data: string) => setFieldValue("description", data)}
                />
                {touched.description && errors.description && (
                  <Typography variant="body2" color="error">
                    {errors.description}
                  </Typography>
                )}
              </Box>
            </FormLayout>

            {/* Responsibilities */}
            <FormLayout
              title="Responsibilities"
              description="Outline the core responsibilities of the position"
              sx={formLayoutstyle}
            >
              <Box sx={formboxstyle}>
                <QuillEditor2
                  editorId="job-responsibility-editor"
                  value={values.responsibilities}
                  toolbarOptions={toolbarOptions}
                  placeholder="Enter Responsibilities"
                  onData={(data: string) => setFieldValue("responsibilities", data)}
                />
              </Box>
            </FormLayout>

            {/* Who You Are */}
            <FormLayout
              title="Who You Are"
              description="Add your preferred candidates qualifications"
              sx={formLayoutstyle}
            >
              <Box sx={formboxstyle}>
                <QuillEditor2
                  editorId="who-are-you-editor"
                  value={values.whoYouAre}
                  toolbarOptions={toolbarOptions}
                  placeholder="Enter Who You Are"
                  onData={(data: string) => setFieldValue("whoYouAre", data)}
                />
              </Box>
            </FormLayout>

            {/* Nice-To-Haves */}
            <FormLayout
              title="Nice-To-Haves"
              description="Add nice-to-have skills and qualifications for the role to encourage a more diverse set of candidates to apply"
              sx={formLayoutstyle}
            >
              <Box sx={formboxstyle}>
                <QuillEditor2
                  editorId="nice-to-have-editor"
                  value={values.niceToHaves}
                  toolbarOptions={toolbarOptions}
                  placeholder="Enter Nice-To-Haves"
                  onData={(data: string) => setFieldValue("niceToHaves", data)}
                />
              </Box>
            </FormLayout>
          </Form>
        )}
      </Formik>
    );
  }
);

export default JobDescriptionForm;
