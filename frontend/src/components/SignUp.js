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

    // Function to handle sending verification email
    const sendVerificationEmail = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/send-verification', {
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

    // Function to handle verifying the code
    const verifyEmailCode = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/verify-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, verificationCode })
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

    return (
        <div className="auth-container">
            <header className="auth-header">
                <h1>Sign Up for Two Duo Pair</h1>
            </header>
            <main className="auth-content">
                <form className="auth-form" onSubmit={isVerified ? sendVerificationEmail : verifyEmailCode}>
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
                </form>
            </main>
        </div>
    );
};

export default SignUp;
