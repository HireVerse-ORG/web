import { Box } from "@mui/material";
import CompanyInfoCard from "../components/profile/CompanyInfoCard";
import AboutCompanyCard from "../components/profile/AboutCompanyCard";
import ContactCard from "../components/profile/ContactCard";
import CompanyImagesCard from "../components/profile/CompanyImagesCard";
import CompanyBenifitList from "../components/profile/CompanyBenifitList";
import { useCompanyContext } from "@core/contexts/CompanyContext";


const CompanyProfilePage = () => {
    const { companyProfile } = useCompanyContext();
    const mode = "edit";

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3, pb: 3 }}>
            <CompanyInfoCard mode={mode} profile={companyProfile!} />
            <AboutCompanyCard mode={mode} data={{ about: companyProfile?.bio || "" }} />
            <ContactCard mode={mode} data={{
                email: companyProfile?.email,
                phone: companyProfile?.phone,
                linkedin: companyProfile?.socialLinks.linkedin,
                instagram: companyProfile?.socialLinks.instagram,
                facebook: companyProfile?.socialLinks.facebook,
                twitter: companyProfile?.socialLinks.twitter,
            }} />
            <CompanyImagesCard mode={mode} />
            <CompanyBenifitList mode={mode} />
        </Box>
    );
}

export default CompanyProfilePage;
