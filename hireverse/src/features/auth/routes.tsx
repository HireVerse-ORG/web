import { Route, Routes } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import PasswordResetPage from "./pages/PasswordResetPage";

const AuthRoutes = () => {
    return (
        <Routes>
          <Route path="/" element={<AuthPage/>} />
          <Route path='/forgot-password' element={<PasswordResetPage/>}/>
        </Routes>
      );
}

export default AuthRoutes;
