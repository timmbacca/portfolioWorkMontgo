import { createTheme } from '@mui/material/styles';

const forestTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#228B22', // Forest green
    },
    secondary: {
      main: '#8B4513', // Earthy brown
    },
    background: {
      default: '#E8F5E9', // Light green background
      paper: '#F0FFF0', // Lighter green for cards
    },
    text: {
      primary: '#2E8B57', // Dark forest green text
      secondary: '#6B8E23', // Olive text
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h4: {
      fontWeight: 'bold',
      color: '#228B22',
    },
    body1: {
      color: '#6B8E23',
    },
  },
});

export default forestTheme;
