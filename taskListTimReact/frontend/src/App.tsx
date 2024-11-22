import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider as MuiThemeProvider, CssBaseline, Button, Box } from '@mui/material';
import { ThemeProvider as StyledThemeProvider } from 'styled-components'; // Import styled-components ThemeProvider
import darkTheme from './themes/darkTheme';
import federalTheme from './themes/federalTheme';
import Header from './components/Header';
import LandingPage from './components/LandingPage';
import TaskTrackerPage from './components/TaskTrackerPage';
import PastProjectsPage from './components/PastProjectsPage';
import ResumePage from './components/ResumePage';
import ContactPage from './components/ContactPage';
import './App.css';
import Footer from './components/Footer';

const App: React.FC = () => {
  const themes = {
    Dark: darkTheme,
    Federal: federalTheme,
  };

  const [selectedTheme, setSelectedTheme] = useState<keyof typeof themes>('Federal');

  const handleThemeChange = (theme: keyof typeof themes) => {
    setSelectedTheme(theme);
  };

  return (
    <MuiThemeProvider theme={themes[selectedTheme] || federalTheme}>
      <StyledThemeProvider theme={themes[selectedTheme] || federalTheme}>
        <CssBaseline />
        <Router>
          <div className="App">
            <Header />
            <Box
              sx={{
                textAlign: 'center',
                padding: 2,
                display: 'flex',
                justifyContent: 'center',
                gap: 1,
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
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/task-tracker" element={<TaskTrackerPage />} />
                <Route path="/projects" element={<PastProjectsPage />} />
                <Route path="/resume" element={<ResumePage />} />
                <Route path="/contact" element={<ContactPage />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </StyledThemeProvider>
    </MuiThemeProvider>
  );
};

export default App;
