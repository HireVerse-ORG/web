// import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
    allowedRoles: ('seeker' | 'company' | 'admin')[];
    children: React.ReactNode;
}

const ProtectedRoute = ({ allowedRoles, children }: ProtectedRouteProps) => {
//   const user = JSON.parse(localStorage.getItem('user') || '{}'); 

//   if (!user || !allowedRoles.includes(user.role)) {
//     return <Navigate to="/login" replace />;
//   }

  return children;
};

export default ProtectedRoute;
