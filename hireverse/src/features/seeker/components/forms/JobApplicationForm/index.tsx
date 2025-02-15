import { Box, Button, TextField, Typography, CircularProgress, FormControlLabel, Checkbox } from "@mui/material";
import { useFormik } from "formik";
import colors from "@core/theme/colors";
import { JobApplicationFormSchema } from "./schema";
import ResumeUploader from "@core/components/ui/DocUploader";
import { useState, useEffect } from "react";
import { setUserApplicationInfo, getUserApplicationInfo } from "@core/utils/storage";
import { cloudinaryResumeUploader } from "@core/api/external/cloudinaryApi";
import { toast } from "sonner";
import { applyJob } from "@core/api/seeker/jobApplicationApi";
import { useNavigate } from "react-router-dom";
import { CheckCircle } from "@mui/icons-material";

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
    const [existingResume, setExistingResume] = useState<string | null>(null);
    const [saveInfo, setSaveInfo] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false); 
    const navigate = useNavigate();

    const { jobTitle, companyLogo, companyName, location } = jobData;

    useEffect(() => {
        const savedData = getUserApplicationInfo();
        if (savedData) {
            formik.setValues({
                fullName: savedData.fullName || "",
                email: savedData.email || "",
                phoneNo: savedData.phoneNo || "",
                coverLetter: savedData.coverLetter || "",
            });

            if (savedData.resumeLink) {
                setResumeError(null);
                setExistingResume(savedData.resumeLink);
            }
        }
    }, []);

    const handleResumeUploader = (file: File | null) => {
        setResume(file);
        setResumeError(null);
    };

    const handleSubmit = async (values: JobApplicationFormValues, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
        if (!resume && !existingResume) {
            setResumeError("Resume is required");
            setSubmitting(false);
            return;
        }

        try {
            const resumeLink = resume ? await cloudinaryResumeUploader(resume) : existingResume;

            if (saveInfo) {
                const userData = {
                    fullName: values.fullName,
                    email: values.email,
                    phoneNo: values.phoneNo,
                    coverLetter: values.coverLetter,
                    resumeLink: resumeLink || "",
                };
                setUserApplicationInfo(userData);
            }

            await applyJob({
                jobId: jobData.jobid,
                email: values.email,
                fullName: values.fullName,
                coverLetter: values.coverLetter,
                phone: values.phoneNo,
                resume: resumeLink || ""
            });

            setSuccess(true);
        } catch (error: any) {
            toast.error(error?.message || error || "Failed to apply for job");
        } finally {
            setSubmitting(false);
        }
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
            {success ? (
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        mt: 4,
                        p: 3,
                    }}
                >
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                        <CheckCircle sx={{ color: "success.main", fontSize: 40, mr: 1 }} />
                        <Typography variant="h5" color="success.main" fontWeight="bold">
                            Application Submitted Successfully!
                        </Typography>
                    </Box>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 3, textAlign: "center" }}>
                        You can track the status of your job applications anytime from your dashboard.
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        sx={{
                            px: 4,
                            py: 1.5,
                            textTransform: "none",
                            fontSize: "1rem",
                        }}
                        onClick={() => navigate("/seeker/my-applications")}
                    >
                        Track Your Jobs
                    </Button>
                </Box>

            ) : (
                <>
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
                            <TextField
                                fullWidth
                                name="fullName"
                                label="Full Name"
                                variant="outlined"
                                value={formik.values.fullName}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.fullName && Boolean(formik.errors.fullName)}
                                helperText={formik.touched.fullName && formik.errors.fullName}
                            />
                        </Box>

                        {/* Email */}
                        <Box mb={3}>
                            <TextField
                                fullWidth
                                name="email"
                                label="Email"
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
                            <TextField
                                fullWidth
                                name="phoneNo"
                                label="Phone Number"
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
                            <TextField
                                fullWidth
                                name="coverLetter"
                                label="Cover Letter"
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
                            <ResumeUploader
                                onFileUpload={handleResumeUploader}
                                error={resumeError || ""}
                                existingDocUrl={existingResume || ""}
                            />
                        </Box>

                        {/* Save Info Checkbox */}
                        <Box mb={3}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={saveInfo}
                                        onChange={(e) => setSaveInfo(e.target.checked)}
                                        color="primary"
                                    />
                                }
                                label="Save this information"
                            />
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
                </>
            )}
        </Box>
    );
};

export default JobApplicationForm;
