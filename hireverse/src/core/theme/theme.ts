import { createTheme } from '@mui/material/styles';
import customPallete from './palette';

const theme = createTheme({
  palette: customPallete,
  typography: {
    h1: {
      fontSize: '2rem',
      fontWeight: 700,
    },
    h2: {
      fontSize: '1.5rem',
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
      },
    },
    MuiTypography: {
    
    },
  },
});

export default theme;
