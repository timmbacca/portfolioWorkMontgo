import { createTheme } from '@mui/material/styles';

const federalTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#002868', // Federal blue
    },
    secondary: {
      main: '#BF0A30', // Federal red
    },
    background: {
      default: '#ffffff', // White background
      paper: '#f7f7f7', // Light gray background for cards
    },
    text: {
      primary: '#002868', // Federal blue text
      secondary: '#555555', // Gray text
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h4: {
      fontWeight: 'bold',
      color: '#002868',
    },
    body1: {
      color: '#555555',
    },
  },
});

export default federalTheme;
