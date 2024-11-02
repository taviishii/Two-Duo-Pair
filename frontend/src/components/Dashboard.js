// src/components/Dashboard.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
    return (
        <div className="dashboard">
            <header className="dashboard-header">
                <h1>Two Duo Pair Dashboard</h1>
            </header>
            <nav className="dashboard-nav">
                <div className="nav-links">
                    <ul>
                        <li><a href="#home">Home</a></li>
                        <li><a href="#about">About</a></li>
                        <li><a href="#contact">Contact</a></li>
                    </ul>
                    <div className="auth-buttons">
                        <Link to="/signin" className="sign-in-btn">Sign In</Link>
                        <Link to="/signup" className="sign-up-btn">Sign Up</Link>
                    </div>
                </div>
            </nav>
            <main className="dashboard-content">
                <h2>Welcome to Two Duo Pair!</h2>
                <p>
                    Find convenient meeting spots for pre-concert hangouts or meetups,
                    especially in busy urban areas. Underlining the need for a midway point 
                    that saves time and matches user preferences.
                </p>
            </main>
        </div>
    );
};

export default Dashboard;
