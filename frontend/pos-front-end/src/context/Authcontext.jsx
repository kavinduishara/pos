import React,{ createContext, use, useContext, useState } from "react";

const AuthContext=createContext()
const AuthUpdateContext=createContext()

export function useAuth(params) {
    return useContext(AuthContext)
}
export function useUpdateAuth(params) {

    return useContext(AuthUpdateContext)
}


export function AuthProvider({children}) {
    const [value,setValue]=useState({logedin:false,user:""})

    function setAuthState(isLoggedIn,user) {
        setValue({logedin:isLoggedIn,user:user});
    }

    return(
        <AuthContext.Provider value={value}>
            <AuthUpdateContext.Provider value={setAuthState}>
                {children}
            </AuthUpdateContext.Provider>
        </AuthContext.Provider>
    )
    
}