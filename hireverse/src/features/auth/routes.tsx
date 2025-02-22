import PageLoader from "@core/components/ui/PageLoader";
import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

const AuthPage = lazy(() => import("./pages/AuthPage"));
const ForgotPasswordPage = lazy(() => import("./pages/ForgotPasswordPage"));
const ResetPasswordPage = lazy(() => import("./pages/ResetPasswordPage"));
const VerifyPage = lazy(() => import("./pages/VerifyPage"));

const AuthRoutes = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/verify" element={<VerifyPage />} />
        <Route path="*" element={<Navigate to="/auth" />} />
      </Routes>
    </Suspense>
  );
};

export default AuthRoutes;
