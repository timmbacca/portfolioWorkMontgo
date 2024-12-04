import { createTheme, PaletteMode } from '@mui/material/styles';

const darkMode: PaletteMode = 'dark';

const darkTheme = createTheme({
  palette: {
    mode: darkMode,
    primary: { main: '#e50914' },
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
  chartColors: ['#E50914', '#6C757D', '#FFD700', '#2ECC71', '#FF5733', '#9B59B6'],
});

export default darkTheme;
