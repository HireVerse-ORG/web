import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import SeekerPublicProfilePage from "./pages/SeekerPublicProfilePage";
import Layout from "./components/Layout";
import CompanyPublicViewPage from "./pages/CompanyPublicViewPage";

const LandingRoutes = () => {
    return (
        <Routes>
          <Route element={<Layout/>}>
            <Route path="/" element={<LandingPage />} />
          </Route>
          <Route path=":name" element={<SeekerPublicProfilePage />} />
          <Route path="/company-view/:companyId" element={<CompanyPublicViewPage />} />
        </Routes>
      );
}

export default LandingRoutes;
