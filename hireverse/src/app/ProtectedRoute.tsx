import { Navigate } from 'react-router-dom';

import useAppSelector from "@core/hooks/useSelector";
import { UserRoles } from "@core/types/user.interface";

interface ProtectedRouteProps {
    allowedRoles: (UserRoles)[];
    children: React.ReactNode;
}

const ProtectedRoute = ({ allowedRoles, children }: ProtectedRouteProps) => {
  const user = useAppSelector((state) => state.auth.user);

  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/auth?page=login" replace/>;
  }

  return children;
};

export default ProtectedRoute;
