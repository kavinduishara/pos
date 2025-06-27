import React, { useState } from 'react';
import { useAuth } from '../context/Authcontext';

function HomePage(params) {
    const auth = useAuth();
    return(
        <>
          <p>{auth.shop}</p>
          <p>{auth.role}</p>
        </>
    )
}

export default HomePage;