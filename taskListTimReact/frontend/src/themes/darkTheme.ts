import { createTheme, PaletteMode } from '@mui/material/styles';

const darkMode: PaletteMode = 'dark';

const darkTheme = createTheme({
  palette: {
    mode: darkMode,
    primary: { main: '#ff303b' },
    secondary: { main: '#b81d24' },
    background: {
      default: '#141414',
      paper: '#1f1f1f',
    },
    text: {
      primary: '#ffffff',
      secondary: '#b3b3b3',
    },
    divider: '#333333',
  },
  typography: {
    fontFamily: 'BlenderProBook, Arial, sans-serif',
  },
  chartColors: ['#ff303b', '#6C757D', '#FFD700', '#2ECC71', '#FF5733', '#9B59B6'],
});

export default darkTheme;
