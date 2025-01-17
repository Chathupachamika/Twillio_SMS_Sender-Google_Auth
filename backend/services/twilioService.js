require('dotenv').config();
const twilio = require('twilio');

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const serviceSid = process.env.TWILIO_VERIFY_SERVICE_SID;

const client = twilio(accountSid, authToken);

const sendVerificationCode = async (to, channel = 'sms') => {
    try {
        const verification = await client.verify.v2.services(serviceSid)
            .verifications
            .create({ to, channel });
        return verification;
    } catch (error) {
        throw new Error(error.message);
    }
};

const verifyCode = async (to, code) => {
    try {
        const verificationCheck = await client.verify.v2.services(serviceSid)
            .verificationChecks
            .create({ to, code });
        return verificationCheck;
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = { sendVerificationCode, verifyCode };
