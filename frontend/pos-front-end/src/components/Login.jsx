import React, { useState } from 'react';
import api from '../utils/api';
import { useNavigate } from 'react-router-dom';
import { useAuth, useUpdateAuth } from '../context/Authcontext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate=useNavigate();

  const setAuth = useUpdateAuth();

  async function loginButton() {
    try {
      const data = await api.post('/auth/login',{email:email,password:password})

      console.log('Login Success:', data);
      alert('Login successful!');
      setIsLoggedIn(true);
      navigate("../app/")
      
      setAuth({logedin:true,user:email})

    } catch (err) {
      console.error('Login failed:', err.message);
      setError(err.message || 'Login failed');
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <div className="w-96 h-auto rounded-lg shadow-lg p-6 bg-white">
      <h1 className="text-center text-blue-600 text-2xl font-bold mb-6">LOGIN</h1>
      <div className="grid gap-4">
        <input
          placeholder="E-mail"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="border border-blue-500 rounded-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={loading}
        />
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="border border-blue-500 rounded-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={loading}
        />

        {error && (
          <div className="text-red-600 text-sm text-center">{error}</div>
        )}

        <button
          onClick={loginButton}
          disabled={loading}
          className={`rounded-sm bg-sky-500 hover:bg-sky-600 text-white font-semibold py-2 ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>

        <div className="text-sm text-center mt-4">
          no account?
          <button onClick={()=>{navigate("../signup/")}} className='text-blue-500 underline'>
            SignUp
          </button>
        </div>

      </div>
    </div>
    </div>
  );
}

export default Login;
