import React, { useState } from 'react';
import { useAuth } from '../context/Authcontext';

function HomePage(params) {
    const auth = useAuth();
    return(
        <>
          <h1>home</h1>
          <h1>{auth.logedin?"login":"do not"}</h1>
        </>
    )
}

export default HomePage;