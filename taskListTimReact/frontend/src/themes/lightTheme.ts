import { createTheme } from '@mui/material/styles';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2', // Blue
    },
    secondary: {
      main: '#f50057', // Pink
    },
    background: {
      default: '#f5f5f5', // Light gray
      paper: '#ffffff', // White background for cards
    },
    text: {
      primary: '#000000', // Black text
      secondary: '#555555', // Gray text
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h4: {
      fontWeight: 'bold',
      color: '#000000',
    },
    body1: {
      color: '#555555',
    },
  },
});

export default lightTheme;
