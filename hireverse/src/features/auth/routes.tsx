import { Navigate, Route, Routes } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import VerifyPage from "./pages/VerifyPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";

const AuthRoutes = () => {
    return (
        <Routes>
          <Route path="/" element={<AuthPage/>} />
          <Route path='/forgot-password' element={<ForgotPasswordPage/>}/>
          <Route path='/reset-password' element={<ResetPasswordPage/>}/>
          <Route path='/verify' element={<VerifyPage/>}/>

          <Route path='*' element={<Navigate to={"/auth"}/>}/>
        </Routes>
      );
}

export default AuthRoutes;
