import React from 'react';
import ReactDOM from 'react-dom/client'; // Correct import for createRoot
import './index.css';
import App from './App';

// Ensure the root element exists
const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement); // Use createRoot
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
