import { createTheme, PaletteMode } from '@mui/material/styles';

const federalMode: PaletteMode = 'light';

const federalTheme = createTheme({
  palette: {
    mode: federalMode,
    primary: { main: '#0b5394' },
    secondary: { main: '#b7d9f2' },
    background: {
      default: '#ffffff',
      paper: '#F7F7F7',
    },
    text: {
      primary: '#333333',
      secondary: '#896C2D',
    },
    divider: '#CCCCCC',
  },
  typography: {
    fontFamily: 'BlenderProBook, Arial, sans-serif',
  },
  chartColors: ['#BF0A30', '#FFBF00', '#002868', '#007A33', '#F1C40F', '#1ABC9C'],
});

export default federalTheme;
