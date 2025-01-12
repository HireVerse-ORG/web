import { useCompanyContext } from "@core/contexts/CompanyContext";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
    const { hasProfile } = useCompanyContext();

    if (!hasProfile) {
        return <Navigate to="/company/profile-creation" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
