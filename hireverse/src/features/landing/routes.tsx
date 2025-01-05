import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import SeekerPublicProfilePage from "./SeekerPublicProfilePage";
import Layout from "./components/Layout";

const LandingRoutes = () => {
    return (
        <Routes>
          <Route element={<Layout/>}>
            <Route path="/" element={<LandingPage />} />
          </Route>
          <Route path=":name" element={<SeekerPublicProfilePage />} />
        </Routes>
      );
}

export default LandingRoutes;
