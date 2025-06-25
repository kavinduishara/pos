import React from "react";
import { Outlet } from "react-router-dom";

function AuthLayout(params) {
    return(
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <Outlet/>
        </div>
    )
    
}

export default AuthLayout;