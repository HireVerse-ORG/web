import { Box } from "@mui/material";
import CompanyInfoCard from "../components/profile/CompanyInfoCard";
import AboutCompanyCard from "../components/profile/AboutCompanyCard";
import ContactCard from "../components/profile/ContactCard";
import CompanyImagesCard from "../components/profile/CompanyImagesCard";
import { useCompanyContext } from "@core/contexts/CompanyContext";

const CompanyProfilePage = () => {
    const { companyProfile, setCompanyProfile } = useCompanyContext();
    const mode = "edit";

    const handleImageRemove = async (imageUrl: string) => {
        setCompanyProfile({
            ...companyProfile!,
            workplaceImages: companyProfile!.workplaceImages.filter(image => image !== imageUrl),
        })
    }

    if(!companyProfile){
        return null;
    }

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
            <CompanyImagesCard mode={mode} companyName={companyProfile.name} images={companyProfile.workplaceImages} onImageRemove={handleImageRemove}/>
            {/* <CompanyBenifitList mode={mode} /> */}
        </Box>
    );
}

export default CompanyProfilePage;
