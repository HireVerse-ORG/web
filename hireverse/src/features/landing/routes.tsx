import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";

const LandingRoutes = () => {
    return (
        <Routes>
          <Route path="/" element={<LandingPage />} />
        </Routes>
      );
}

export default LandingRoutes;
