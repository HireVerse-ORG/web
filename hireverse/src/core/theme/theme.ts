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
        root: {
          borderRadius: '0px', 
          padding: '10px 20px',
          fontWeight: 600, 
          textTransform: 'none', 
          boxShadow: 'none'
        },
      },
    },
  },
});

export default theme;
