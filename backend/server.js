// server.js
const express = require('express');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Temporary storage for users and verification codes
let users = {}; 
let verificationCodes = {};

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

app.get('/', (req, res) => {
    res.send('Server is up and running!');
});

// Simple test route to check backend connectivity
app.get('/ping', (req, res) => {
    res.json({ message: 'pong' });
});

// Route to handle user registration and send verification code
app.post('/register', (req, res) => {
    const { email } = req.body;

    // Check if user already exists
    if (users[email]) {
        return res.status(400).json({ message: 'User already registered. Please verify or log in.' });
    }

    // Generate and store verification code
    const verificationCode = crypto.randomInt(100000, 999999).toString();
    verificationCodes[email] = verificationCode;
    users[email] = { verified: false }; 

    // Send verification code via email
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Email Verification Code',
        text: `Your verification code is: ${verificationCode}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            return res.status(500).json({ message: 'Error sending verification email' });
        }
        res.status(200).json({ message: 'Verification email sent successfully' });
    });
});

// Route to verify the email
app.post('/verify-email', (req, res) => {
    const { email, code } = req.body;
    console.log('Received verify-email request:', req.body); // Log request data

    if (verificationCodes[email] === code) {
        users[email].verified = true; 
        delete verificationCodes[email]; 
        res.status(200).json({ message: 'Email verified successfully' });
    } else {
        res.status(400).json({ message: 'Invalid verification code' });
    }
});

// Route to handle login
app.post('/login', (req, res) => {
    const { email } = req.body;

    if (users[email] && users[email].verified) {
        res.status(200).json({ message: 'Login successful' });
    } else if (users[email] && !users[email].verified) {
        res.status(400).json({ message: 'Please verify your email first' });
    } else {
        res.status(404).json({ message: 'User not registered' });
    }
});

// Start the server
const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
