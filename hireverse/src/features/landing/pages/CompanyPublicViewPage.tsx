import { useParams } from "react-router-dom";
import Header from "../components/Header";
import { Container } from "@mui/material";
import CompanyProfilePage from "../../company/pages/CompanyProfilePage";

const CompanyPublicViewPage = () => {
    const { companyId } = useParams();

    return (
        <>  
            <Header/>
            <Container>
                <CompanyProfilePage mode="read" companyId={companyId}/>
            </Container>
        </>
    );
}

export default CompanyPublicViewPage;
