import { CssBaseline, ThemeProvider } from "@mui/material"
import AppRoutes from "./AppRoutes"
import theme from "../core/theme/theme"
import { Provider } from "react-redux"
import { Toaster } from 'sonner';
import store from "@core/store";
import { MsalProvider } from "@azure/msal-react";
import { msalConfig } from "@core/lib/mslConfig";
import { PublicClientApplication } from "@azure/msal-browser";
import { GoogleOAuthProvider } from '@react-oauth/google'

const msalInstance = new PublicClientApplication(msalConfig);

function App() {
  return (
    <>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <MsalProvider instance={msalInstance}>
          <Provider store={store}>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <AppRoutes />
            </ThemeProvider>
            <Toaster richColors={true} visibleToasts={2} />
          </Provider>
        </MsalProvider>
      </GoogleOAuthProvider>
    </>
  )
}

export default App
