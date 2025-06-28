import React, { useEffect, useState } from "react";
import { useAuth, useUpdateAuth } from '../context/Authcontext';
import { Navigate } from "react-router-dom";

function AuthLayout() {
  const auth = useAuth();
  const setAuth = useUpdateAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAuth(); 
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) return <p>Loading...</p>;

  return auth.logedin ? <Navigate to="/app" /> : <Navigate to="/login" />;
}

export default AuthLayout;
