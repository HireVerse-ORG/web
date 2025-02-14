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
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { NotificationProvider } from "@core/contexts/NotificationContext";
import { ChatSocketProvider } from "@core/contexts/ChatSocketContext";
import { MessageProvider } from "@core/contexts/MessageContext";
import { InterviewScheduleNotificationProvider } from "@core/contexts/InterviewScheduleNotification";

const msalInstance = new PublicClientApplication(msalConfig);

function App() {
  return (
    <>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <MsalProvider instance={msalInstance}>
          <Provider store={store}>
            <NotificationProvider>
              <ChatSocketProvider>
                <MessageProvider>
                  <InterviewScheduleNotificationProvider>

                    <ThemeProvider theme={theme}>
                      <LocalizationProvider dateAdapter={AdapterMoment}>
                        <CssBaseline />
                        <AppRoutes />
                      </LocalizationProvider>
                    </ThemeProvider>
                    <Toaster richColors={true} visibleToasts={2} />

                  </InterviewScheduleNotificationProvider>
                </MessageProvider>
              </ChatSocketProvider>
            </NotificationProvider>
          </Provider>
        </MsalProvider>
      </GoogleOAuthProvider>
    </>
  )
}

export default App
