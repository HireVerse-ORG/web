import { Box, Button, TextField, Typography, CircularProgress } from "@mui/material";
import { useFormik } from "formik";
import colors from "@core/theme/colors";
import { JobApplicationFormSchema } from "./schema";
import ResumeUploader from "../../ResumeUploader";
import { useState } from "react";

type JobApplicationFormProps = {
    jobData: {
        jobid: string;
        jobTitle: string;
        companyName: string;
        companyLogo: string;
        location: {
            city: string;
            country: string;
        };
    };
};

interface JobApplicationFormValues {
    fullName: string;
    email: string;
    phoneNo: string;
    coverLetter: string;
}

const JobApplicationForm = ({ jobData }: JobApplicationFormProps) => {
    const [resume, setResume] = useState<File | null>(null);
    const [resumeError, setResumeError] = useState<string | null>(null);

    const { jobTitle, companyLogo, companyName, location } = jobData;

    const handleResumeUploader = (file: File | null) => {
        setResume(file);
        setResumeError(null); 
    };

    const handleSubmit = (values: JobApplicationFormValues, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
        if (!resume) {
            setResumeError("Resume is required");
            setSubmitting(false);
            return;
        }

        console.log("Submitted Values:", values);
        console.log("Resume:", resume);
        setSubmitting(false); // Reset submission state
    };

    const formik = useFormik<JobApplicationFormValues>({
        initialValues: {
            fullName: "",
            email: "",
            phoneNo: "",
            coverLetter: "",
        },
        validationSchema: JobApplicationFormSchema,
        onSubmit: handleSubmit,
    });

    return (
        <Box sx={{ mt: 2 }} component="form" onSubmit={formik.handleSubmit}>
            {/* Job Details */}
            <Box
                sx={{
                    borderBottom: `1px solid ${colors.borderColour}`,
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    backgroundColor: "white",
                    py: 2,
                }}
            >
                <Box
                    sx={{
                        flex: "0 0 100px",
                        height: "auto",
                        backgroundImage: `url(${companyLogo})`,
                        backgroundSize: "contain",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        mr: { xs: 0, sm: 2 },
                        mb: { xs: 2, sm: 0 },
                    }}
                />
                <Box
                    sx={{
                        flex: 1,
                        display: "flex",
                        flexDirection: { xs: "column", sm: "row" },
                        flexWrap: "wrap",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 2,
                    }}
                >
                    <Box sx={{ minWidth: 200, flex: 1 }}>
                        <Typography
                            variant="h6"
                            fontWeight="bold"
                            sx={{
                                mb: 0.5,
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                            }}
                        >
                            {jobTitle}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                            <span style={{ fontWeight: "bold" }}>{companyName}</span>
                            {companyName && location?.city && location?.country
                                ? ` . ${location.city}, ${location.country}`
                                : ""}
                        </Typography>
                    </Box>
                </Box>
            </Box>

            {/* Application Form */}
            <Box sx={{ mt: 2 }}>
                <Typography variant="h6" fontWeight="bold" mb={3}>
                    Submit your application
                </Typography>

                {/* Full Name */}
                <Box mb={3}>
                    <Typography variant="body1" fontWeight={500} mb={1}>
                        Full Name
                    </Typography>
                    <TextField
                        fullWidth
                        name="fullName"
                        variant="outlined"
                        placeholder="Enter your full name"
                        value={formik.values.fullName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.fullName && Boolean(formik.errors.fullName)}
                        helperText={formik.touched.fullName && formik.errors.fullName}
                    />
                </Box>

                {/* Email */}
                <Box mb={3}>
                    <Typography variant="body1" fontWeight={500} mb={1}>
                        Email
                    </Typography>
                    <TextField
                        fullWidth
                        name="email"
                        placeholder="Enter your email"
                        variant="outlined"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                    />
                </Box>

                {/* Phone Number */}
                <Box mb={3}>
                    <Typography variant="body1" fontWeight={500} mb={1}>
                        Phone Number
                    </Typography>
                    <TextField
                        fullWidth
                        name="phoneNo"
                        placeholder="Enter your phone number"
                        variant="outlined"
                        value={formik.values.phoneNo}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.phoneNo && Boolean(formik.errors.phoneNo)}
                        helperText={formik.touched.phoneNo && formik.errors.phoneNo}
                    />
                </Box>

                {/* Cover Letter */}
                <Box mb={3}>
                    <Typography variant="body1" fontWeight={500} mb={1}>
                        Cover Letter
                    </Typography>
                    <TextField
                        fullWidth
                        name="coverLetter"
                        placeholder="Add a cover letter"
                        multiline
                        rows={4}
                        variant="outlined"
                        value={formik.values.coverLetter}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.coverLetter && Boolean(formik.errors.coverLetter)}
                        helperText={formik.touched.coverLetter && formik.errors.coverLetter}
                    />
                </Box>

                {/* Resume */}
                <Box mb={3}>
                    <Typography variant="body1" fontWeight={500} mb={1}>
                        Resume (PDF/DOC)
                    </Typography>
                    <ResumeUploader onFileUpload={handleResumeUploader} error={resumeError || ""} />
                </Box>

                {/* Submit Button */}
                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    size="large"
                    type="submit"
                    disabled={formik.isSubmitting}
                >
                    {formik.isSubmitting ? <CircularProgress size={20} /> : "Submit Application"}
                </Button>
            </Box>
        </Box>
    );
};

export default JobApplicationForm;
