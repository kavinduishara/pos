import React, { useState } from 'react';
import api from '../utils/api';
import { Navigate, useNavigate } from 'react-router-dom';

function SignUp(params) {

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    
    const navigate =useNavigate()

    async function signUpButton() {
        try {
            const data = await api.post('/auth/register',{fullName:fullName,email:email,password:password})
            console.log('registration Success:', data);
            alert('registration successful!');
            navigate("../login/")
        } catch (err) {
            console.error('registration failed:', err.message);
            setError(err.message || 'registration failed');
        }
    }

    return(
        <>
            <div className="w-96 h-auto rounded-lg shadow-lg p-6 bg-white">
                <h1 className="text-center text-blue-600 text-2xl font-bold mb-6">SIGN UP</h1>

                <div className="grid gap-4">
                    <input
                    placeholder="Full Name"
                    value={fullName}
                    onChange={e => setFullName(e.target.value)}
                    className="border border-blue-500 rounded-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={loading}
                    />

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
                    onClick={signUpButton}
                    disabled={loading}
                    className={`rounded-sm bg-sky-500 hover:bg-sky-600 text-white font-semibold py-2 ${
                        loading ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    >
                    {loading ? 'Singing up...' : 'Sign up'}
                    </button>

                    <div className="text-sm text-center mt-4">
                    have an account?
                    
                    <button onClick={()=>{navigate("../login/")}} className='text-blue-500 underline'>
                        Login
                    </button>

                    </div>

                </div>
            </div>
        </>
    );
}

export default SignUp;