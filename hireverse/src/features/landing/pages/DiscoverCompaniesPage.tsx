import { Box } from "@mui/material";
import RecruiterBanner from "../components/RecruiterBanner";
import FindCompanies from "../../shared/FindCompanies";


const DiscoverCompaniesPage = () => {
    return (
        <Box>
            <FindCompanies />
            <RecruiterBanner/>
        </Box>
    );
}

export default DiscoverCompaniesPage;
