// src/components/UserProfile.js
import React from 'react';
import './UserProfile.css';

const UserProfile = () => {
    return (
        <div className="user-profile">
            <header className="profile-header">
                <h1>Welcome to Your Profile!</h1>
            </header>
            <main className="profile-content">
                <h2>Your Account Details</h2>
                <p>This is where you can manage your account information and preferences.</p>
                {/* Add more details here as needed */}
            </main>
        </div>
    );
};

export default UserProfile;
