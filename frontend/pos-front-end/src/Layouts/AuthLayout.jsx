import React, { useEffect, useState } from "react";
import { useAuth, useUpdateAuth } from '../context/Authcontext';
import { Navigate } from "react-router-dom";

function AuthLayout() {
  const auth = useAuth();
  const setAuth = useUpdateAuth();
  const [loading, setLoading] = useState(true); // simulate loading state

  useEffect(() => {
    // Simulate a network/auth check
    const timer = setTimeout(() => {
      setAuth({ logedin: true, role: "fake", email: "fake" }); // simulate login
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer); // clean up
  }, []);

  if (loading) return <p>Loading...</p>; // or a spinner

  return auth.logedin ? <Navigate to="/app" /> : <Navigate to="/login" />;
}

export default AuthLayout;
