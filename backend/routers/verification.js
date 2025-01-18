const express = require('express');
const router = express.Router();
const TwilioService = require('../services/twilioService');

router.post('/send-otp', async (req, res) => {
    try {
        const { phoneNumber } = req.body;
        const twilioService = new TwilioService();
        const verification = await twilioService.sendOTP(phoneNumber);
        
        res.json({
            success: true,
            message: 'OTP sent successfully',
            verificationSid: verification.sid
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to send OTP',
            error: error.message
        });
    }
});

router.post('/verify-otp', async (req, res) => {
    try {
        const { phoneNumber, code } = req.body;
        const twilioService = new TwilioService();
        const verification = await twilioService.verifyOTP(phoneNumber, code);
        
        if (verification.status === 'approved') {
            res.json({
                success: true,
                message: 'OTP verified successfully'
            });
        } else {
            res.status(400).json({
                success: false,
                message: 'Invalid OTP'
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to verify OTP',
            error: error.message
        });
    }
});

module.exports = router;