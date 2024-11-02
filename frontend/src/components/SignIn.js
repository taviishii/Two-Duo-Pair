// src/components/SignIn.js
import React from 'react';
import './Auth.css';

const SignIn = () => {
    return (
        <div className="auth-container">
            <header className="auth-header">
                <h1>Sign In to Two Duo Pair</h1>
            </header>
            <main className="auth-content">
                <form className="auth-form">
                    <label>
                        Email:
                        <input type="email" name="email" required />
                    </label>
                    <label>
                        Password:
                        <input type="password" name="password" required />
                    </label>
                    <button type="submit" className="auth-submit">Sign In</button>
                </form>
            </main>
        </div>
    );
};

export default SignIn;
