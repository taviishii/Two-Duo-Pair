// src/components/SignUp.js
import React, { useState } from 'react';
import './Auth.css';

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [verificationSent, setVerificationSent] = useState(false);
    const [verificationCode, setVerificationCode] = useState('');
    const [isVerified, setIsVerified] = useState(false);

    const sendVerificationEmail = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://127.0.0.1:5002/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });
            if (response.ok) {
                setVerificationSent(true);
                alert('Verification email sent! Check your inbox.');
            } else {
                alert('Failed to send verification email.');
            }
        } catch (error) {
            console.error(error);
            alert('Error sending verification email.');
        }
    };

    const verifyEmailCode = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://127.0.0.1:5002/verify-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, code: verificationCode })
            });
            if (response.ok) {
                setIsVerified(true);
                alert('Email verified successfully!');
            } else {
                alert('Verification code is incorrect.');
            }
        } catch (error) {
            console.error(error);
            alert('Error verifying email.');
        }
    };

    // Test connection function
    const testConnection = async () => {
        try {
            const response = await fetch('http://127.0.0.1:5002/ping');
            const data = await response.json();
            alert(`Response from server: ${data.message}`);
        } catch (error) {
            console.error('Error connecting to server:', error);
        }
    };

    return (
        <div className="auth-container">
            <header className="auth-header">
                <h1>Sign Up for Two Duo Pair</h1>
            </header>
            <main className="auth-content">
                <form className="auth-form" onSubmit={verificationSent && !isVerified ? verifyEmailCode : sendVerificationEmail}>
                    <label>
                        Username:
                        <input 
                            type="text" 
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)} 
                            required 
                        />
                    </label>
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
                    {verificationSent && !isVerified && (
                        <label>
                            Verification Code:
                            <input 
                                type="text" 
                                value={verificationCode} 
                                onChange={(e) => setVerificationCode(e.target.value)} 
                                required 
                            />
                        </label>
                    )}
                    <button type="submit" className="auth-submit">
                        {verificationSent && !isVerified ? 'Verify Code' : 'Sign Up'}
                    </button>
                    <button type="button" onClick={testConnection}>
                        Test Connection
                    </button>
                </form>
            </main>
        </div>
    );
};

export default SignUp;
