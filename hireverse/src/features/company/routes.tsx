import { Route, Routes } from "react-router-dom";
import CompanyDashboard from "./components/CompanyDashboard";

const CompanyRoutes = () => {
    return (
        <Routes>
          <Route path="/" element={<CompanyDashboard />} />
        </Routes>
      );
}

export default CompanyRoutes;
