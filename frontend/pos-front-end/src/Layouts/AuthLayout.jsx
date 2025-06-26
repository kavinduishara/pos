import React from "react";
import { useAuth } from '../context/Authcontext';
import { Outlet,Navigate } from "react-router-dom";

function AuthLayout(params) {
    const auth=useAuth()

    return(
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            {auth.logedin?<Navigate to={"app/"}/>:<Outlet/>}
        </div>
    )
    
}

export default AuthLayout;