import React from 'react';

import Login from "./components/login"
import { Route, Routes } from 'react-router-dom';
import AuthLayout from './Layouts/AuthLayout';
import SignUp from './components/SignUp';
import ProtectedLayout from './Layouts/ProtectedLayout';
import HomePage from './components/HomePage';


function App() {

  return (
    <>
    <AuthProvider>
      <Routes>
        <Route element={<AuthLayout/>}>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signUp' element={<SignUp/>}/>
        </Route>
        <Route element={<ProtectedLayout/>}>
          <Route path='/home' element={<HomePage/>}/>
        </Route>
      </Routes>
    </AuthProvider>
    </>
  )
}

export default App
