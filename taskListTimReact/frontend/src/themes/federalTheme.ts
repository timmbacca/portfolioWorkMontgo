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
      secondary: '#666666',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
});

export default federalTheme;
