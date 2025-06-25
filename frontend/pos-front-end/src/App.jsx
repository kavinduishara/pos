import React from 'react';

import Login from "./components/login"
import { Route, Routes } from 'react-router-dom';
import AuthLayout from './Layouts/AuthLayout';
import SignUp from './components/SignUp';
import ProtectedLayout from './Layouts/ProtectedLayout';
import HomePage from './components/HomePage';
import Bills from './components/Bills';


function App() {

  return (
    <>
      <Routes>
        <Route path='/'element={<AuthLayout/>}>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signUp' element={<SignUp/>}/>
        </Route>
        <Route path='/home/'element={<ProtectedLayout/>}>
          <Route index element={<HomePage/>}/>
          <Route path='bills' element={<Bills/>}/>
        </Route>
      </Routes>
    </>
  )
}

export default App
