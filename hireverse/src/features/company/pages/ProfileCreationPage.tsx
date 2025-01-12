import { useEffect, useRef, useState } from "react";
import BlankLayout from "@core/components/layouts/BlankLayout";
import CustomStepper from "@core/components/ui/CustomStepper";
import { Business, Description, People } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import ProfileCreationSteppperLayout from "../components/layouts/ProfileCreationSteppperLayout";
import BasicInfoForm, { BasicInfoFormValues } from "../components/forms/BasicInforForm";
import CompanyContactForm, { CompanyContactFormValues } from "../components/forms/CompanyContactForm";
import CompanyProfileForm, { CompanyProfileValues } from "../components/forms/CompanyProfieForm";
import { useNavigate } from "react-router-dom";
import { getUserDashboardPath } from "@core/utils/helper";
import { useCompanyContext } from "@core/contexts/CompanyContext";
import { toast } from "sonner";
import { createCompanyProfile } from "@core/api/company/profileApi";

const ProfileCreationPage = () => {
    const { companyProfile, setCompanyProfile } = useCompanyContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (companyProfile) {
            navigate(getUserDashboardPath("company"));
        }
    }, []);

    const [activeStep, setActiveStep] = useState(0);
    const [finishing, setFinishing] = useState(false);
    const [logo, setLogo] = useState<File | null>(null);
    const [formValues, setFormValues] = useState({
        basicInfo: {} as BasicInfoFormValues,
        contactInfo: {} as CompanyContactFormValues,
        companyProfile: {} as CompanyProfileValues,
    });

    const basicInfoFormRef = useRef<any>(null);
    const contactFormRef = useRef<any>(null);
    const companyProfileFormRef = useRef<any>(null);


    const handleNext = () => {
        if (activeStep === 0) {
            basicInfoFormRef.current.submitForm();
        } else if (activeStep === 1) {
            contactFormRef.current.submitForm();
        } else if (activeStep === 2) {
            companyProfileFormRef.current.submitForm();
        }
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    const handleBasicInfoSubmit = (values: BasicInfoFormValues, logo: File) => {
        setFormValues((prev) => ({ ...prev, basicInfo: values }));
        setLogo(logo);
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleContactFormSubmit = (values: CompanyContactFormValues) => {
        setFormValues((prev) => ({ ...prev, contactInfo: values }));
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleCompanyProfileFormSubmit = (values: CompanyProfileValues) => {
        setFormValues((prev) => ({ ...prev, companyProfile: values }));
        handleFinish();
    };

    const handleFinish = async () => {
        setFinishing(true)
        try {
            const reponse = await createCompanyProfile({
                name: formValues.basicInfo.companyName,
                companyType: formValues.basicInfo.companyType,
                industry: formValues.basicInfo.industry,
                location: formValues.basicInfo.location,
                email: formValues.contactInfo.email,
                phone: formValues.contactInfo.phoneNumber,
                website: formValues.contactInfo.website,
                socialLinks: formValues.contactInfo.socialMedia,
                employeeCount: parseInt(formValues.companyProfile.employeeCount),
                bio: formValues.companyProfile.aboutCompany
            });
            setCompanyProfile(reponse.profile)
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        } catch (error: any) {
            toast.error(error || "Failed to create profile")
        } finally {
            setFinishing(false)
        }
    };

    const steps = [
        {
            title: "Basic Information",
            icon: <Business />,
            content: (
                <BasicInfoForm
                    ref={basicInfoFormRef}
                    data={formValues.basicInfo}
                    image={logo}
                    onSubmit={handleBasicInfoSubmit}
                />
            ),
        },
        {
            title: "Contact Details",
            icon: <People />,
            content: (
                <CompanyContactForm
                    ref={contactFormRef}
                    data={formValues.contactInfo}
                    onSubmit={handleContactFormSubmit}
                />
            ),
        },
        {
            title: "Company Profile",
            icon: <Description />,
            content: (
                <CompanyProfileForm
                    ref={companyProfileFormRef}
                    data={formValues.companyProfile}
                    onSubmit={handleCompanyProfileFormSubmit}
                />
            ),
        },
    ];

    return (
        <BlankLayout>
            <Box sx={{ width: "100%", pb: 5 }}>
                <CustomStepper
                    steps={steps}
                    activeStep={activeStep}
                    finishing={finishing}
                    onNext={handleNext}
                    onBack={handleBack}
                    onReset={handleReset}
                    ContentLayout={ProfileCreationSteppperLayout}
                    renderCompletion={() => (
                        <Box sx={{ textAlign: 'center', padding: 3 }}>
                            <Typography variant="h5" fontWeight={500} gutterBottom>
                                Profile Created Successfully!
                            </Typography>
                            <Typography variant="body1" >
                                Your profile is now created. Our team will verify it shortly.
                            </Typography>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => navigate(getUserDashboardPath("company"))}
                                sx={{ marginTop: 2 }}
                            >
                                Go to Dashboard
                            </Button>
                        </Box>
                    )}
                />
            </Box>
        </BlankLayout>
    );
};

export default ProfileCreationPage;
