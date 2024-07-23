require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public'));

// Store OTPs in-memory (for demo purposes, use a more secure storage in production)
const otpStorage = {};

// Create a transporter using SMTP transport
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// Generate a random OTP
function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

// Endpoint to send OTP
app.post('/send-otp', (req, res) => {
    const { email } = req.body;
    const otp = generateOTP();
    otpStorage[email] = otp;

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Your OTP Code',
        text: `Your OTP code is ${otp}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send('Error sending email: ' + error.message);
        } else {
            return res.status(200).send('OTP sent to ' + email);
        }
    });
});

// Endpoint to verify OTP
app.post('/verify-otp', (req, res) => {
    const { email, otp } = req.body;
    if (otpStorage[email] === otp) {
        delete otpStorage[email]; // Remove OTP after verification
        return res.status(200).send('OTP verified');
    } else {
        return res.status(400).send('Invalid OTP');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
