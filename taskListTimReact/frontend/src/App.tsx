import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { createTheme, PaletteMode } from '@mui/material/styles';
import darkTheme from './themes/darkTheme';
import federalTheme from './themes/federalTheme';
import Header from './components/Header';
import LandingPage from './components/LandingPage';
import DashboardPage from './components/DashboardPage';
import TaskTrackerPage from './components/TaskTrackerPage';
import PastProjectsPage from './components/PastProjectsPage';
import ResumePage from './components/ResumePage';
import ContactPage from './components/ContactPage';
import Footer from './components/Footer';
import './App.css';

const App: React.FC = () => {
  const [theme, setTheme] = useState(createTheme(federalTheme));

  useEffect(() => {
    const systemDarkMode = window.matchMedia('(prefers-color-scheme: dark)');

    const updateTheme = () => {
      const paletteMode: PaletteMode = systemDarkMode.matches ? 'dark' : 'light';
      setTheme(createTheme(paletteMode === 'dark' ? darkTheme : federalTheme));
    };

    systemDarkMode.addEventListener('change', updateTheme);

    // Set initial theme
    updateTheme();

    return () => {
      systemDarkMode.removeEventListener('change', updateTheme);
    };
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div className="App">
          <main>
            <Header />
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/task-tracker" element={<TaskTrackerPage />} />
              <Route path="/projects" element={<PastProjectsPage />} />
              <Route path="/resume" element={<ResumePage />} />
              <Route path="/contact" element={<ContactPage />} />
            </Routes>
            <Footer />
          </main>
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;
