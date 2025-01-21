import CustomStepper from '@core/components/ui/CustomStepper';
import { useCompanyContext } from '@core/contexts/CompanyContext';
import { useCompanySubscription } from '@core/contexts/CompanySubscriptionContext';
import { Box, Button, Typography } from '@mui/material';
import { useRef, useState } from 'react';
import JobBasicInfoForm, { JobBasicInfoFormValues } from './forms/JobBasicInfoForm';
import JobDescriptionForm, { JobDescriptionFormValues } from './forms/JobDescriptionForm';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { createJob, updateJob } from '@core/api/company/jobApi';
import { Business, Description } from '@mui/icons-material';
import { IJob } from '@core/types/job.interface';

type JobStepperProps = {
    job?: IJob;
}

type FormValues = {
    basicInfo: JobBasicInfoFormValues;
    descriptions: JobDescriptionFormValues;
}

const JobStepper = ({ job }: JobStepperProps) => {
    const { companyProfile } = useCompanyContext();
    const { usage, setUsage, jobPostLimitExceeded } = useCompanySubscription()
    const [activeStep, setActiveStep] = useState(0);
    const [finishing, setFinishing] = useState(false);
    const [formValues, setFormValues] = useState<FormValues>({
        basicInfo: {
            title: job?.title || "",
            employmentTypes: job?.employmentTypes || [],
            salaryRange: job?.salaryRange || null,
            skills: job?.skills
                ? job.skills
                    .filter((skill) => typeof skill !== "string")
                    .map((skill) => ({ id: skill.id, name: skill.name }))
                : [],

            categories: job?.categories
                ? job.categories
                    .filter((category) => typeof category !== "string")
                    .map((category) => ({ id: category.id, name: category.name }))
                : [],
        },
        descriptions: {
            description: job?.description || "",
            responsibilities: job?.responsibilities || "",
            whoYouAre: job?.whoYouAre || "",
            niceToHaves: job?.niceToHaves || "",
        },
    });

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

    const handleFinish = async (values: FormValues) => {
        if (!job && jobPostLimitExceeded) {
            toast.warning("You Job post limit finished")
            return;
        }
        setFinishing(true);
        try {
            const data = {
                ...values.basicInfo,
                ...values.descriptions,
                skills: values.basicInfo.skills.map(v => v.id),
                categories: values.basicInfo.categories.map(v => v.id),
            }
            if (job) {
                await updateJob({
                    ...data,
                    userId: companyProfile!.userId,
                    id: job.id
                })
            } else {
                await createJob({
                    ...data,
                    companyProfileId: companyProfile!.id,
                })
                if (usage) {
                    setUsage({ ...usage, jobsPosted: usage.jobsPosted + 1 });
                }
            }
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        } catch (error: any) {
            toast.error(error || `Failed to ${job ? "update" : "post"} job`)
        } finally {
            setFinishing(false)
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
        <Box sx={{ width: "100%", pb: 5 }}>
            <CustomStepper
                steps={steps}
                activeStep={activeStep}
                finishing={finishing}
                onNext={handleNext}
                onBack={handleBack}
                onReset={handleReset}
                disabled={jobPostLimitExceeded && !job}
                renderCompletion={() => (
                    <Box sx={{ textAlign: 'center', padding: 4 }}>
                        <Typography variant="h5" fontWeight={600} gutterBottom>
                            {`🎉 Job ${job ? "Updated" : "Posted"} Successfully!`}
                        </Typography>
                        <Typography variant="body1" color="text.secondary" gutterBottom>
                            {job ? "Your job has been updated successfully." : "Your job will be live soon."}
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
                                View Jobs
                            </Button>
                        </Box>
                    </Box>
                )}
            />
        </Box>
    );
}

export default JobStepper;
