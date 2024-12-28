import { Route, Routes } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import VerifyPage from "./pages/VerifyPage";

const AuthRoutes = () => {
    return (
        <Routes>
          <Route path="/" element={<AuthPage/>} />
          <Route path='/forgot-password' element={<ForgotPasswordPage/>}/>
          <Route path='/verify' element={<VerifyPage/>}/>
        </Routes>
      );
}

export default AuthRoutes;
