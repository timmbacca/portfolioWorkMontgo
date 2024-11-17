import { createTheme } from '@mui/material/styles';

const commandersTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#773141', // Burgundy
    },
    secondary: {
      main: '#FFB612', // Gold
    },
    background: {
      default: '#1C1C1C', // Very dark gray
      paper: '#2C2C2C', // Slightly lighter dark gray
    },
    text: {
      primary: '#FFB612', // Gold text
      secondary: '#D0D0D0', // Light gray text
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h4: {
      fontWeight: 'bold',
      color: '#FFB612',
    },
    body1: {
      color: '#D0D0D0',
    },
  },
});

export default commandersTheme;
