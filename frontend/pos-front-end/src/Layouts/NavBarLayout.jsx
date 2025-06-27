import React from "react";
import getArray from "../utils/list"
import { Navigate, NavLink, Outlet } from "react-router-dom";
import { useAuth, useUpdateAuth } from '../context/Authcontext';
import HomePage from "../components/HomePage";
import VerticalNavigationBar from "../components/VerticalNavigationBar";
import AddEmployees from "../components/AddEmployees";
import SettingsPage from "../components/SettingsPage";
import { Home,PersonStanding,Settings,BarChart3,UserPlus2,LogOut, User2, HomeIcon, LucideHome, House, HousePlugIcon, CaseUpper } from "lucide-react";

function NavBarLayout(params) {
    const auth=useAuth()
    const setAuth=useUpdateAuth()

    const array=getArray()

    if (!auth.logedin || auth.shop === "") {
    return <Navigate to="/login" />;
    }

    return (
        <>
        <div className="flex items-center justify-between fixed top-0 left-0 right-0 w-full h-20 px-10 bg-sky-950 text-white z-50 shadow-md">

            <h1 className="text-3xl font-bold font-mono tracking-wide">{auth.shop.toUpperCase()}</h1>

            <div className="text-right">
                <p className="text-lg font-semibold">{auth.role}</p>
                <p className="text-sm opacity-80">{auth.user.fullName}</p>
            </div>
        </div>

        <VerticalNavigationBar list={array} />
        
        <main className="ml-20 p-6 mt-20">
            <Outlet />
        </main>
        </>
    );
    
}
export default NavBarLayout;