package com.example.smsauth.service;

import com.twilio.Twilio;
import com.twilio.rest.verify.v2.service.Verification;
import com.twilio.rest.verify.v2.service.VerificationCheck;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class TwilioService {

    @Value("${twilio.account.sid}")
    private String ACCOUNT_SID;

    @Value("${twilio.auth.token}")
    private String AUTH_TOKEN;

    @Value("${twilio.verify.service.sid}")
    private String VERIFY_SERVICE_SID;

    public void init() {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
    }

    public boolean sendVerificationCode(String phoneNumber) {
        try {
            init();
            Verification verification = Verification.creator(
                            VERIFY_SERVICE_SID,
                            phoneNumber,
                            "sms")
                    .create();
            return verification.getStatus().equals("pending");
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    public boolean verifyCode(String phoneNumber, String code) {
        try {
            init();
            VerificationCheck verificationCheck = VerificationCheck.creator(
                            VERIFY_SERVICE_SID)
                    .setTo(phoneNumber)
                    .setCode(code)
                    .create();
            return verificationCheck.getStatus().equals("approved");
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
}