const express = require('express');
const { sendVerificationCode, verifyCode } = require('../services/twilioService');

const router = express.Router();

router.post('/send-code', async (req, res) => {
    const { phoneNumber, channel } = req.body;
    try {
        const result = await sendVerificationCode(phoneNumber, channel);
        res.status(200).json({ message: 'Verification code sent', sid: result.sid });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/verify-code', async (req, res) => {
    const { phoneNumber, code } = req.body;
    try {
        const result = await verifyCode(phoneNumber, code);
        if (result.status === 'approved') {
            res.status(200).json({ message: 'Verification successful', result });
        } else {
            res.status(400).json({ message: 'Verification failed', result });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
