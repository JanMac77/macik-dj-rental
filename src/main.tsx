import { StrictMode } from 'react'
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.js'
import { AuthProvider } from '././context/AuthContext.js';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
