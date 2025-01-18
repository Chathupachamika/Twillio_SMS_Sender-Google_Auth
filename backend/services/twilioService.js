const twilio = require('twilio');

class TwilioService {
    constructor() {
        this.client = twilio(
            process.env.TWILIO_ACCOUNT_SID,
            process.env.TWILIO_AUTH_TOKEN
        );
        this.serviceId = process.env.TWILIO_SERVICE_ID;
    }

    async sendOTP(phoneNumber) {
        try {
            const verification = await this.client.verify.v2
                .services(this.serviceId)
                .verifications
                .create({ to: phoneNumber, channel: 'sms' });
            return verification;
        } catch (error) {
            throw new Error(`Failed to send OTP: ${error.message}`);
        }
    }

    async verifyOTP(phoneNumber, code) {
        try {
            const verificationCheck = await this.client.verify.v2
                .services(this.serviceId)
                .verificationChecks
                .create({ to: phoneNumber, code });
            return verificationCheck;
        } catch (error) {
            throw new Error(`Failed to verify OTP: ${error.message}`);
        }
    }
}

module.exports = TwilioService;