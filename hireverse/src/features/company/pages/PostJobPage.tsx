import CustomStepper from "@core/components/ui/CustomStepper";
import { ArrowBack, Business, Description } from "@mui/icons-material";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import JobBasicInfoForm, { JobBasicInfoFormValues } from "../components/forms/JobBasicInfoForm";
import JobDescriptionForm, { JobDescriptionFormValues } from "../components/forms/JobDescriptionForm";
import { createJob } from "@core/api/company/jobApi";
import { toast } from "sonner";
import { useCompanyContext } from "@core/contexts/CompanyContext";
import { useCompanySubscription } from "@core/contexts/CompanySubscriptionContext";

const PostJobPage = () => {
    const {companyProfile} = useCompanyContext();
    const {usage, setUsage, subscription} = useCompanySubscription()
    const [activeStep, setActiveStep] = useState(0);
    const [finishing, setFinishing] = useState(false);
    const [formValues, setFormValues] = useState({
        basicInfo: {} as JobBasicInfoFormValues,
        descriptions: {} as JobDescriptionFormValues,
    });

    const jobPostLimitExceeded = (usage && subscription) && (usage.jobsPosted + 1 > subscription.jobPostLimit) ? true : false; 

    const basicInfoFormRef = useRef<any>(null);
    const descriptionFormRef = useRef<any>(null);

    const navigate = useNavigate();

    const handleNext = () => {
        if (activeStep === 0) {
            basicInfoFormRef.current.submitForm();
        } else {
            descriptionFormRef.current.submitForm();
        }
    };

    const handleBack = () => {
        if (activeStep === 1) {
            const values = descriptionFormRef.current.getValues() as JobDescriptionFormValues;
            setFormValues((prev) => ({ ...prev, descriptions: values }));
        }
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    const handleBasicInfoSubmit = (values: JobBasicInfoFormValues) => {
        setFormValues((prev) => ({ ...prev, basicInfo: values }));
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleDesciptionFormSubmit = (values: JobDescriptionFormValues) => {
        setFormValues((prev) => ({ ...prev, descriptions: values }));
        handleFinish({ ...formValues, descriptions: values })
    };

    const handleFinish = async (values: typeof formValues) => {
        if(usage && subscription){
            if(jobPostLimitExceeded){
                toast.warning("You Job post limit finished")
                return;
            }
            console.log("finish Values: ", values);
            setFinishing(true);
            try {
                await createJob({
                    ...values.basicInfo,
                    ...values.descriptions,
                    skills: values.basicInfo.skills.map(v => v.id),
                    categories: values.basicInfo.skills.map(v => v.id),
                    status: "active",
                    companyProfileId: companyProfile!.id,
                })
                setActiveStep((prevActiveStep) => prevActiveStep + 1);
                setUsage({...usage, jobsPosted: usage.jobsPosted + 1});
            } catch (error: any) {
                toast.error(error || "Failed to post job")
            } finally {
                setFinishing(false)
            }
        }
    }

    const steps = [
        {
            title: "Job Information",
            icon: <Business />,
            content: (
                <JobBasicInfoForm
                    ref={basicInfoFormRef}
                    data={formValues.basicInfo}
                    onSubmit={handleBasicInfoSubmit}
                />
            ),
        },
        {
            title: "Job Description",
            icon: <Description />,
            content: (
                <JobDescriptionForm
                    ref={descriptionFormRef}
                    data={formValues.descriptions}
                    onSubmit={handleDesciptionFormSubmit}
                />
            ),
        },
    ];

    return (
        <Box>
            <Box display="flex" alignItems="center" sx={{ mb: { xs: 0.5, md: 1 } }}>
                <IconButton onClick={() => navigate(-1)} aria-label="Go back">
                    <ArrowBack />
                </IconButton>
                <Typography variant="h5" fontWeight={600}>
                    Post a Job
                </Typography>
            </Box>

            {/* stepper */}
            <Box sx={{ width: "100%", pb: 5 }}>
                <CustomStepper
                    steps={steps}
                    activeStep={activeStep}
                    finishing={finishing}
                    onNext={handleNext}
                    onBack={handleBack}
                    onReset={handleReset}
                    disabled={jobPostLimitExceeded}
                    renderCompletion={() => (
                        <Box sx={{ textAlign: 'center', padding: 4}}>
                            <Typography variant="h5" fontWeight={600} gutterBottom>
                                🎉 Job Posted Successfully!
                            </Typography>
                            <Typography variant="body1" color="text.secondary" gutterBottom>
                                Your job posting is now live. Candidates can start applying for this job.
                            </Typography>
                            <Typography variant="body2" color="text.disabled" sx={{ mt: 1 }}>
                                You can always track and manage your job applications.
                            </Typography>
                            <Box sx={{ marginTop: 3 }}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    sx={{ marginRight: 2 }}
                                    onClick={() => navigate('/company/jobs')} 
                                >
                                    View Job
                                </Button>
                            </Box>
                        </Box>
                    )}
                />
            </Box>
        </Box>
    );
}

export default PostJobPage;