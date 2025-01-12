import { useRef, useState } from "react";
import BlankLayout from "@core/components/layouts/BlankLayout";
import CustomStepper from "@core/components/ui/CustomStepper";
import { Business, Description, People } from "@mui/icons-material";
import { Box } from "@mui/material";
import ProfileCreationSteppperLayout from "../components/layouts/ProfileCreationSteppperLayout";
import BasicInfoForm, { BasicInfoFormValues } from "../components/forms/BasicInforForm";
import CompanyContactForm, { CompanyContactFormValues } from "../components/forms/CompanyContactForm";
import CompanyProfileForm, { CompanyProfileValues } from "../components/forms/CompanyProfieForm";

const ProfileCreationPage = () => {
    const [activeStep, setActiveStep] = useState(0);
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

    const handleFinish = () => {
        // Submit the entire form data
        console.log("Logo: ", logo);
        console.log("Form Data Submitted:", formValues);
        // Handle the final submission here
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
            <Box sx={{ width: "100%", pb: 5}}>
                <CustomStepper
                    steps={steps}
                    activeStep={activeStep}
                    onNext={handleNext}
                    onBack={handleBack}
                    onReset={handleReset}
                    ContentLayout={ProfileCreationSteppperLayout}
                />
            </Box>
        </BlankLayout>
    );
};

export default ProfileCreationPage;
