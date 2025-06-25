import React from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from '../context/Authcontext';

function ProtectedLayout(params) {
    const auth=useAuth()

    return(
        <>
            <h1>{auth.logedin?"login":"do not"}</h1>
            <Outlet/>
        </>
        
    )
    
}
export default ProtectedLayout;