import { Box } from "@mui/material";
import CompanyInfoCard from "../components/profile/CompanyInfoCard";
import AboutCompanyCard from "../components/profile/AboutCompanyCard";
import ContactCard from "../components/profile/ContactCard";
import CompanyImagesCard from "../components/profile/CompanyImagesCard";
import CompanyBenifitList from "../components/profile/CompanyBenifitList";

type CompanyProfilePageProps = {
    mode: "read" | "edit";
    companyId?: string;
}

const CompanyProfilePage = ({mode, companyId}: CompanyProfilePageProps) => {
    return (
        <Box sx={{display: "flex", flexDirection: "column", gap: 3, pb: 3}}>
            <CompanyInfoCard mode={mode} companyId={companyId}/>
            <AboutCompanyCard mode={mode} />
            <ContactCard mode={mode} />
            <CompanyImagesCard mode={mode}/>
            <CompanyBenifitList mode={mode} />
        </Box>
    );
}

export default CompanyProfilePage;
