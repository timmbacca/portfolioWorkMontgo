// frontend/src/App.tsx

import React, { useState } from 'react';
import './App.css';
import { ThemeProvider, CssBaseline, Button, Box } from '@mui/material';
import lightTheme from './themes/lightTheme';
import darkTheme from './themes/darkTheme';
import federalTheme from './themes/federalTheme';
import forestTheme from './themes/forestTheme';
import commandersTheme from './themes/commandersTheme';
import TaskList from './components/TaskList';

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
  <ThemeProvider theme={themes[selectedTheme]}>
    <CssBaseline />
    <Box sx={{ textAlign: 'center', padding: 2,display: 'flex',
          justifyContent: 'center',
          gap: 1,
          backgroundColor: 'transparent', }}>
    {Object.keys(themes).map((theme) => (
          <Button
            key={theme}
            variant="contained"
            color="primary"
            size="small"
            onClick={() => handleThemeChange(theme as keyof typeof themes)}
            sx={{ minWidth: 80, padding: '4px 8px' }}
          >
            {theme}
          </Button>
        ))}
    </Box>
    <div className="App">
      <h1>Task Tracker</h1>
      <TaskList />
    </div>
  </ThemeProvider>
);
};

export default App;
