import React from 'react';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/Authcontext'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

createRoot(document.getElementById('root')).render(
  
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
      
  <ToastContainer position="top-right" autoClose={2500} />

        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
