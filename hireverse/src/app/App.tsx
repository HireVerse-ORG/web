import { CssBaseline, ThemeProvider } from "@mui/material"
import AppRoutes from "./AppRoutes"
import theme from "../core/theme/theme"
import { Provider } from "react-redux"
import { Toaster } from 'sonner';
import store from "@core/store";

function App() {
  return (
    <>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AppRoutes />
        </ThemeProvider>
        <Toaster richColors={true} visibleToasts={2}/>
      </Provider>
    </>
  )
}

export default App
