import React from "react";
import { Navigate, NavLink, Outlet } from "react-router-dom";
import { useAuth } from '../context/Authcontext';
import HomePage from "../components/HomePage";
import { Home } from "lucide-react";
import VerticalNavigationBar from "../components/VerticalNavigationBar";

function NavBarLayout(params) {
    const auth=useAuth()

    const array=[
    {link:''         ,text:'Home'    ,icon:Home     ,element:<HomePage/> },
    ]
    return(
        <>
            <VerticalNavigationBar list={array}/>
            {auth.logedin && auth.shop!=""?
            <main className="ml-20 p-6">
            <Outlet />
            </main>
            :
            <Navigate to={"../login/"}/>
            }

        </>
        
    )
    
}
export default NavBarLayout;