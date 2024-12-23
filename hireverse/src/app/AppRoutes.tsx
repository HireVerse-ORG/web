import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from '../pages/LandingPage';
import { lazy, Suspense } from 'react';
import ProtectedRoute from './ProtectedRoute';
import NotFoundPage from '../pages/NotFoundPage';

const AdminRoutes = lazy(() => import('../features/admin/routes'));
const CompanyRoutes = lazy(() => import('../features/company/routes'));
const SeekerRoutes = lazy(() => import('../features/seeker/routes')); 


const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route
                        path="/admin/*"
                        element={
                            <ProtectedRoute allowedRoles={['admin']}>
                                <AdminRoutes />
                            </ProtectedRoute>
                        }
                    />
                    <Route path="/company/*" element={
                        <ProtectedRoute allowedRoles={['company']}>
                            <CompanyRoutes />
                        </ProtectedRoute>
                    } />
                    <Route path="/seeker/*" element={
                        <ProtectedRoute allowedRoles={['seeker']}>
                            <SeekerRoutes />
                        </ProtectedRoute>
                    } />
                    <Route path="*" element={<NotFoundPage/>} />
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
}

export default AppRoutes;
