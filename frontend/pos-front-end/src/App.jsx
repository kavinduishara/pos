import React from 'react';

import Login from "./components/login";
import { Route, Routes } from 'react-router-dom';
import AuthLayout from './Layouts/AuthLayout';
import SignUp from './components/SignUp';
import ProtectedLayout from './Layouts/ProtectedLayout';
import HomePage from './components/HomePage';
import NavBarLayout from './Layouts/NavBarLayout';
import ChooseStore from './components/ChooseStore';
import getArray from './utils/list';
import { useAuth } from './context/Authcontext';
import Billings from './components/Billings';

const list=getArray();
function App() {
  const auth=useAuth();
  console.log(auth)

  return (
    <>
      <Routes>
        <Route path='/'element={<AuthLayout/>}/>
        <Route path='/login/' element={<Login/>}/>
        <Route path='/signUp' element={<SignUp/>}/>         
        <Route path='/app/' element={<NavBarLayout />}>
          {getArray()
          .filter(e=>(e.role.includes(auth.role)||e.role.includes("all")))
          .map((e, index) => {
            if (e.text==="Change store") {
              return(
            <Route key={index} path={e.link} element={<e.element />} >
              <Route key={index} path='new' element={<Billings/>} />
            </Route>
          )
            }
            return(
            <Route key={index} path={e.link} element={<e.element />} />
          )
          }
            
          )}
        </Route> 
      </Routes>
    </>
  )
}

export default App
