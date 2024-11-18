import React, { useState } from 'react';
import { ThemeProvider as MuiThemeProvider, CssBaseline, Button, Box } from '@mui/material';
import { ThemeProvider as StyledThemeProvider } from 'styled-components'; // Import styled-components ThemeProvider
import lightTheme from './themes/lightTheme';
import darkTheme from './themes/darkTheme';
import federalTheme from './themes/federalTheme';
import forestTheme from './themes/forestTheme';
import commandersTheme from './themes/commandersTheme';
import Header from './components/Header';
import LandingPage from './components/LandingPage';
import AboutPage from './components/AboutPage';
import TaskTrackerPage from './components/TaskTrackerPage';
import PastProjectsPage from './components/PastProjectsPage';
import ResumePage from './components/ResumePage';
import FAQPage from './components/FAQPage';
import ContactPage from './components/ContactPage';
import './App.css';

const App: React.FC = () => {
  const themes = {
    Light: lightTheme,
    Dark: darkTheme,
    Federal: federalTheme,
    Forest: forestTheme,
    Commanders: commandersTheme,
  };

  const [selectedTheme, setSelectedTheme] = useState<keyof typeof themes>('Light');

  const handleThemeChange = (theme: keyof typeof themes) => {
    setSelectedTheme(theme);
  };

  return (
    <MuiThemeProvider theme={themes[selectedTheme] || lightTheme}>
      <StyledThemeProvider theme={themes[selectedTheme] || lightTheme}>
        <CssBaseline />
        <div className="App">
          <Header />
          <Box
  sx={{
    textAlign: 'center',
    padding: 2,
    display: 'flex',
    justifyContent: 'center',
    gap: 1,
    position: 'relative', // Ensure proper stacking context
    zIndex: 1, // Place the theme switcher above or below as needed
  }}
>
  {Object.keys(themes).map((theme) => (
    <Button
      key={theme}
      variant={selectedTheme === theme ? 'contained' : 'outlined'}
      onClick={() => handleThemeChange(theme as keyof typeof themes)}
    >
      {theme}
    </Button>
  ))}
</Box>

          <main>
            <LandingPage />
            <AboutPage />
            <TaskTrackerPage />
            <PastProjectsPage />
            <ResumePage />
            <FAQPage />
            <ContactPage />
          </main>
        </div>
      </StyledThemeProvider>
    </MuiThemeProvider>
  );
};

export default App;
