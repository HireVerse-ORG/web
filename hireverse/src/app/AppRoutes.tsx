import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { lazy, Suspense, useEffect } from 'react';
import ProtectedRoute from './ProtectedRoute';
import NotFoundPage from '../pages/NotFoundPage';
import { getUser } from '@core/api/auth/authapi';
import useAppDispatch from '@core/hooks/useDispatch';
import { setUser } from '@core/store/authslice';
import { getUser as getStoredUser } from '@core/utils/storage';
import PageLoader from '@core/components/ui/PageLoader';

const LandingRoutes = lazy(() => import('../features/landing/routes'))
const AuthPage = lazy(() => import('../features/auth/routes'))
const AdminRoutes = lazy(() => import('../features/admin/routes'));
const CompanyRoutes = lazy(() => import('../features/company/routes'));
const SeekerRoutes = lazy(() => import('../features/seeker/routes')); 


const AppRoutes = () => {
    const dispatch = useAppDispatch();
    const user = getStoredUser();

    useEffect(() => {
        if(user){
            getUser().then((res) => {
                dispatch(setUser({user: res}))
            }).catch((_) => {})
        }
    }, []);
    

    return (
        <BrowserRouter>
            <Suspense fallback={<PageLoader/>}>
                <Routes>
                    <Route path="/*" element={<LandingRoutes />} />

                    <Route path='/auth/*' element={<AuthPage/>}/>

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
                    <Route path="/not-found" element={<NotFoundPage/>} />
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
}

export default AppRoutes;
