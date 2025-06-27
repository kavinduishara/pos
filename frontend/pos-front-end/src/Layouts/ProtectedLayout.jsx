import React from "react";
import { Navigate, NavLink, Outlet } from "react-router-dom";
import { useAuth } from '../context/Authcontext';
import HomePage from "../components/HomePage";
import { Home } from "lucide-react";
import VerticalNavigationBar from "../components/VerticalNavigationBar";

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