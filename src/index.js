import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';  // Adjust the path based on your project structure
import './index.css';  // You can create this file for global styles

// Render the main App component into the root HTML element
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
