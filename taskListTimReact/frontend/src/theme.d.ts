import '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Theme {
    chartColors: string[];
  }

  interface ThemeOptions {
    chartColors?: string[];
  }
}
