import { useEffect, useRef, useState } from "react";
import BlankLayout from "@core/components/layouts/BlankLayout";
import CustomStepper from "@core/components/ui/CustomStepper";
import { Business, Description, People } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import ProfileCreationSteppperLayout from "../components/layouts/ProfileCreationSteppperLayout";
import BasicInfoForm, { BasicInfoFormValues } from "../components/forms/BasicInforForm";
import CompanyContactForm, { CompanyContactFormValues } from "../components/forms/CompanyContactForm";
import CompanyProfileForm, { CompanyProfileValues } from "../components/forms/CompanyProfieForm";
import { useLocation, useNavigate } from "react-router-dom";
import { getUserDashboardPath } from "@core/utils/helper";
import { useCompanyContext } from "@core/contexts/CompanyContext";
import { toast } from "sonner";
import { createCompanyProfile } from "@core/api/company/profileApi";
import { uploadToCloudinary } from "@core/api/external/cloudinaryApi";
import PageLoader from "@core/components/ui/PageLoader";

const ProfileCreationPage = () => {
    const { companyProfile, setCompanyProfile } = useCompanyContext();
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (companyProfile) {
            navigate(location.state.from || getUserDashboardPath("company"));
        }
        setLoading(false);
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

    if (loading) {
        return <PageLoader />;
    }

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
        handleFinish({ ...formValues, companyProfile: values });
    };

    const handleFinish = async (values: {
        basicInfo: BasicInfoFormValues;
        contactInfo: CompanyContactFormValues;
        companyProfile: CompanyProfileValues;
    }) => {
        setFinishing(true)
        try {
            const imageurl = logo ? await uploadToCloudinary(logo) : "";
            const reponse = await createCompanyProfile({
                image: imageurl,
                name: values.basicInfo.companyName,
                companyType: values.basicInfo.companyType,
                industry: values.basicInfo.industry,
                location: values.basicInfo.location,
                email: values.contactInfo.email,
                phone: values.contactInfo.phoneNumber,
                website: values.contactInfo.website,
                socialLinks: {
                    facebook: values.contactInfo.socialMedia.facebook,
                    instagram: values.contactInfo.socialMedia.instagram,
                    twitter: values.contactInfo.socialMedia.twitter,
                    linkedin: values.contactInfo.socialMedia.linkedIn,
                },
                employeeCount: parseInt(values.companyProfile.employeeCount),
                bio: values.companyProfile.aboutCompany
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
        companyProfile ? null : (
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
        )
    );
};

export default ProfileCreationPage;
