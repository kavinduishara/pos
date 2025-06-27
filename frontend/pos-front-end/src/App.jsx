import React from 'react';

import Login from "./components/login";
import { Route, Routes } from 'react-router-dom';
import AuthLayout from './Layouts/AuthLayout';
import SignUp from './components/SignUp';
import ProtectedLayout from './Layouts/ProtectedLayout';
import HomePage from './components/HomePage';
import Bills from './components/Bills';
import NavBarLayout from './Layouts/NavBarLayout';
import ChooseStore from './components/ChooseStore';
import AddEmployees from './components/AddEmployees';
import getArray from './utils/list';

const list=getArray();
function App() {

  return (
    <>
      <Routes>
        <Route path='/'element={<AuthLayout/>}/>
        <Route path='/login/' element={<Login/>}/>
        <Route path='/signUp' element={<SignUp/>}/>
         <Route path='/app/'element={<ProtectedLayout/>}> 
         <Route index element={<ChooseStore/>}/>
          <Route path="home" element={<NavBarLayout />}>
          <Route index element={<HomePage />} />
          {getArray()
            .filter(e => e.link !== '') // skip the index route already handled
            .map((e, index) => (
              <Route key={index} path={e.link} element={e.element} />
            ))}
        </Route>
        </Route> 
      </Routes>
    </>
  )
}

export default App
