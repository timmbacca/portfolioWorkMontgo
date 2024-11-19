import { createTheme } from '@mui/material/styles';

const desertTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#D2B48C', // Tan (sand-like)
    },
    secondary: {
      main: '#FFD700', // Gold (desert sunlight)
    },
    background: {
      default: '#3E2723', // Dark brown (desert rocks)
      paper: '#5D4037', // Lighter brown (warm desert tones)
    },
    text: {
      primary: '#FFD700', // Gold text (sunlight accent)
      secondary: '#E0E0E0', // Light gray (neutral, easy on the eyes)
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h4: {
      fontWeight: 'bold',
      color: '#FFD700', // Gold for headings
    },
    body1: {
      color: '#E0E0E0', // Light gray for body text
    },
  },
});

export default desertTheme;
