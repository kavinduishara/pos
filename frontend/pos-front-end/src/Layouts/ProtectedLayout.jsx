import React from "react";
import { Navigate, NavLink, Outlet } from "react-router-dom";
import { useAuth } from '../context/Authcontext';

function ProtectedLayout(params) {
    const auth=useAuth()

    return(
        <>
            {auth.logedin?
            <Outlet />
            :
            <Navigate to={"../login/"}/>
            }

        </>
        
    )
    
}
export default ProtectedLayout;