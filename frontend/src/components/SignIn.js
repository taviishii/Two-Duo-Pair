// src/components/SignIn.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSignIn = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://127.0.0.1:5001/signin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await response.json();
            if (response.ok) {
                alert('Sign-in successful!');
                navigate('/profile');  // Redirect to UserProfile on successful sign-in
            } else {
                alert(data.message || 'Sign-in failed.');
            }
        } catch (error) {
            console.error('Error signing in:', error);
            alert('Error connecting to server.');
        }
    };

    return (
        <div className="auth-container">
            <header className="auth-header">
                <h1>Sign In to Two Duo Pair</h1>
            </header>
            <main className="auth-content">
                <form className="auth-form" onSubmit={handleSignIn}>
                    <label>
                        Email:
                        <input 
                            type="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            required 
                        />
                    </label>
                    <label>
                        Password:
                        <input 
                            type="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            required 
                        />
                    </label>
                    <button type="submit" className="auth-submit">Sign In</button>
                </form>
            </main>
        </div>
    );
};

export default SignIn;
