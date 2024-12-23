import { Route, Routes } from "react-router-dom";
import SeekerDashboard from "./components/SeekerDashboard";

const SeekerRoutes = () => {
    return (
        <Routes>
          <Route path="/" element={<SeekerDashboard />} />
        </Routes>
      );
}

export default SeekerRoutes;
