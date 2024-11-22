import { createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#e50914', // different red
    },
    secondary: {
      main: '#ffffff', // White for text and buttons
    },
    background: {
      default: '#141414', // dark background
      paper: '#1f1f1f', // Slightly lighter for cards
      
    },
    text: {
      primary: '#ffffff',
      secondary: '#b3b3b3', // different gray
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h4: {
      fontWeight: 'bold',
      color: '#ffffff',
    },
    body1: {
      color: '#b3b3b3',
    },
  },
});

export default darkTheme;
