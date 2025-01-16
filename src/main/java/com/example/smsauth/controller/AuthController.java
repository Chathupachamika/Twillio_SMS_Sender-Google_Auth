package com.example.smsauth.controller;

import com.example.smsauth.dto.SmsRequest;
import com.example.smsauth.dto.VerifyRequest;
import com.example.smsauth.service.TwilioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private TwilioService twilioService;

    @PostMapping("/send-sms")
    public ResponseEntity<String> sendSms(@RequestBody SmsRequest smsRequest) {
        boolean sent = twilioService.sendVerificationCode(smsRequest.getPhoneNumber());
        if (sent) {
            return ResponseEntity.ok("Verification code sent successfully");
        }
        return ResponseEntity.badRequest().body("Failed to send verification code");
    }

    @PostMapping("/verify")
    public ResponseEntity<String> verifyCode(@RequestBody VerifyRequest verifyRequest) {
        boolean verified = twilioService.verifyCode(verifyRequest.getPhoneNumber(), verifyRequest.getCode());
        if (verified) {
            return ResponseEntity.ok("Code verified successfully");
        }
        return ResponseEntity.badRequest().body("Invalid verification code");
    }
}