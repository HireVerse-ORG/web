import { Navigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import { Box, Container } from "@mui/material";
import CompanyInfoCard from "../../company/components/profile/CompanyInfoCard";
import AboutCompanyCard from "../..//company/components/profile/AboutCompanyCard";
import ContactCard from "../..//company/components/profile/ContactCard";
import CompanyImagesCard from "../..//company/components/profile/CompanyImagesCard";
import CompanyBenifitList from "../..//company/components/profile/CompanyBenifitList";
import useGet from "@core/hooks/useGet";
import { getCompanyProfile } from "@core/api/company/profileApi";
import PageLoader from "@core/components/ui/PageLoader";

const CompanyPublicViewPage = () => {
    const {data: profile, loading: profileLoading, error: profileError} = useGet(() => getCompanyProfile(companyId));
    const { companyId } = useParams();

    const mode = "read";

    if(profileLoading){
        return <PageLoader />
    }

    if(profileError || (!profileLoading && !profile) ){
        return <Navigate to={'/not-found'} />
    }


    return (
        <>
            <Header />
            <Container>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 3, pb: 3 }}>
                    <CompanyInfoCard mode={mode} profile={profile!}/>
                    <AboutCompanyCard mode={mode} data={{about: profile?.bio || ""}} />
                    <ContactCard mode={mode} data={{
                        email: profile?.email,
                        phone: profile?.phone,
                        linkedin: profile?.socialLinks.linkedin,
                        instagram: profile?.socialLinks.instagram,
                        facebook: profile?.socialLinks.facebook,
                        twitter: profile?.socialLinks.twitter,
                    }}/>
                    <CompanyImagesCard mode={mode} />
                    <CompanyBenifitList mode={mode} />
                </Box>
            </Container>
        </>
    );
}

export default CompanyPublicViewPage;
