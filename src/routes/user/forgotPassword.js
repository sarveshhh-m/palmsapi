import express from 'express';
import db from '../../config/db.js';
import Queries from '../../constants/Queries.js';
import { addToOtpTable } from '../../controllers/forgotPassword.js';

const forgotPassword = express.Router();

forgotPassword.post('/', async (req, res) => {
    const { email } = req.body;

    try {
        // Check if the email exists in the database
        db.query(Queries.IF_EMAIL_EXIST, [email], (err, userData) => {
            if (err) {
                console.error(err.message);
                return res.status(500).json({ message: "Internal server error" });
            }

            // Check if data is not null or undefined and contains an email property
            if (!userData[0] || !userData[0].email) {
                return res.status(404).json({ message: "Email does not exist! Please create an account" });
            }

            // Check if OTP already sent for the email
            db.query(Queries.IF_OTP_ALREADY_SENT, [email], (otpErr, otpData) => {
                if (otpErr) {
                    console.error(otpErr.message);
                    return res.status(500).json({ message: "Internal server error" });
                }

                if (otpData && otpData.length > 0) {
                    // If OTP already sent, update OTP value
                    updateOtp(email, (updateErr, updateResult) => {
                        if (updateErr) {
                            console.error(updateErr.message);
                            return res.status(500).json({ message: "Internal server error" });
                        }
                        addToResponse(res, updateResult);
                    });
                } else {
                    // If OTP not sent, insert new OTP record
                    addToOtpTable(email, (addToOtpResult) => {
                        addToResponse(res, addToOtpResult);
                    });
                }
            });
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Function to add OTP to response
function addToResponse(res, result) {
    if (result.success) {
        res.status(200).json(result);
    } else {
        res.status(500).json(result);
    }
}

// Function to update OTP
function updateOtp(email, callback) {
    const newOtp = generateOtp();
    console.log("New OTP:", newOtp);
    db.query(Queries.UPDATE_OTP, [newOtp, email], (err, result) => {
        if (err) {
            console.error(err.message);
            callback({ success: false, message: "Failed to update OTP" });
        } else {
            callback({ success: true, message: "OTP updated successfully", otp: newOtp });
        }
    });
}

// Function to generate OTP
function generateOtp() {
    return Math.floor(100000 + Math.random() * 900000);
}

export default forgotPassword;
