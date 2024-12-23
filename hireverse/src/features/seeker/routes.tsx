import { Route, Routes } from "react-router-dom";
import SeekerDashboard from "./components/SeekerDashboard";

const AdminRoutes = () => {
    return (
        <Routes>
          <Route path="/" element={<SeekerDashboard />} />
        </Routes>
      );
}

export default AdminRoutes;
