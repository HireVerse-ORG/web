import { Route, Routes } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import PasswordResetPage from "./pages/PasswordResetPage";
import VerifyPage from "./pages/VerifyPage";

const AuthRoutes = () => {
    return (
        <Routes>
          <Route path="/" element={<AuthPage/>} />
          <Route path='/forgot-password' element={<PasswordResetPage/>}/>
          <Route path='/verify' element={<VerifyPage/>}/>
        </Routes>
      );
}

export default AuthRoutes;
