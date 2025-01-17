# JWT Authentication System with SMS Verification 🔐
A full-stack authentication system built with React + Vite for frontend and Node.js + Express for backend, featuring JWT-based secure authentication and Twilio SMS verification.

![GitHub](https://img.shields.io/github/license/Chathupachamika/jwt-auth)
![Node.js Version](https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen)
![React Version](https://img.shields.io/badge/react-%5E18.0.0-blue)
![MongoDB](https://img.shields.io/badge/mongodb-v5.0+-green)
![Twilio](https://img.shields.io/badge/twilio-integrated-red)

---
## 🌟 Features
- 🔒 **Secure Authentication**: JWT-based authentication system
- 📱 **SMS Verification**: Two-factor authentication via Twilio SMS
- 🔑 **Password Recovery**: Secure password reset through SMS verification
- 💻 **Modern Stack**: React, Vite, Node.js, Express, and MongoDB
- 🎨 **Material UI**: Polished user interface with Material Design
- 🔐 **Protected Routes**: Secure route handling with React Router
- 📱 **Responsive Design**: Works seamlessly on all devices
- ⚡ **Fast Development**: Powered by Vite's lightning-fast build tool
- 🔄 **Auto Refresh Tokens**: Implements JWT refresh token mechanism
- 📝 **Detailed Logging**: Comprehensive error and access logging
- 🛡️ **Security Best Practices**: Implements OWASP security guidelines

---
## 🎮 Demo
- **Live Demo**: [JWT Auth Demo](your-demo-link)
- **Test Credentials**:
  - Username: `demo_user`
  - Password: `demo123`
  - Test Phone: `+1234567890`

---
## 📌 Prerequisites
- Node.js (>= 14.0.0)
- MongoDB (>= 5.0)
- npm or yarn
- Git
- Twilio Account (for SMS functionality)

---
## 📦 Installation
1. **Clone the repository**
   ```bash
   git clone https://github.com/Chathupachamika/jwt-auth.git
   cd jwt-auth
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration including Twilio credentials:
   # TWILIO_ACCOUNT_SID=your_account_sid
   # TWILIO_AUTH_TOKEN=your_auth_token
   # TWILIO_PHONE_NUMBER=your_twilio_phone
   ```

5. **Initialize the database**
   ```bash
   npm run init-db
   ```

---
## 🛠️ Tech Stack
### Frontend
- **React** (^18.0.0): UI library
- **Vite** (^4.0.0): Build tool and development server
- **Material UI** (^5.0.0): Component library
- **Axios** (^1.0.0): HTTP client
- **React Router** (^6.0.0): Navigation and routing

### Backend
- **Node.js** (^14.0.0): Runtime environment
- **Express** (^4.18.0): Web framework
- **MongoDB** (^5.0.0): Database
- **JWT** (^9.0.0): Authentication mechanism
- **Twilio** (^4.0.0): SMS service provider
- **bcrypt** (^5.0.0): Password hashing
- **Winston** (^3.0.0): Logging
- **Morgan** (^1.0.0): HTTP request logging

---
## 📂 Project Structure
```plaintext
jwt-auth/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Login.jsx
│   │   │   ├── VerifyPhone.jsx
│   │   │   └── Home.jsx
│   │   ├── services/
│   │   │   ├── auth.service.js
│   │   │   └── sms.service.js
│   │   ├── hooks/
│   │   │   └── useAuth.js
│   │   ├── utils/
│   │   │   └── axiosConfig.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
├── backend/
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   └── user.js
│   ├── services/
│   │   └── twilio.service.js
│   ├── routers/
│   │   ├── user.js
│   │   ├── verification.js
│   │   └── student.js
│   ├── config/
│   │   └── logger.js
│   ├── app.js
│   ├── db.js
│   └── package.json
```

---
## 📝 API Documentation
### Authentication Endpoints
- **POST /api/user/register**
  ```json
  {
    "username": "string",
    "password": "string",
    "phoneNumber": "string"
  }
  ```
- **POST /api/user/login**
  ```json
  {
    "username": "string",
    "password": "string"
  }
  ```
- **POST /api/verification/send-code**
  ```json
  {
    "phoneNumber": "string",
    "channel": "sms"
  }
  ```
- **POST /api/verification/verify-code**
  ```json
  {
    "phoneNumber": "string",
    "code": "string"
  }
  ```
- **POST /api/user/reset-password**
  ```json
  {
    "phoneNumber": "string",
    "newPassword": "string"
  }
  ```
- **GET /api/student**
  - Headers: `Authorization: Bearer <token>`

---
## 📱 SMS Verification Flow
1. **Password Reset**:
   - User requests password reset with phone number
   - System sends verification code via SMS
   - User verifies code
   - User sets new password

2. **Two-Factor Authentication**:
   - User logs in with credentials
   - System sends verification code
   - User verifies code to complete login

3. **Phone Number Verification**:
   - User registers with phone number
   - System sends verification code
   - User verifies code to activate account

---
## 🔐 Security Considerations
- SMS codes expire after 5 minutes
- Rate limiting on SMS sending
- Phone number verification required
- Secure storage of phone numbers
- Protection against brute force attacks

[Previous sections remain the same: Development, Testing, Deployment, Author, Contributing, etc.]

---
## 🙏 Acknowledgments
- [Material-UI](https://mui.com/) for the amazing component library
- [JWT.io](https://jwt.io/) for JWT implementation guidelines
- [MongoDB](https://www.mongodb.com/) for the robust database solution
- [Twilio](https://www.twilio.com/) for SMS verification capabilities
- All contributors who have helped this project grow

---
## ⭐️ Support
If you like this project, please give it a ⭐️!

---
Made with ❤️ by Chathupa Chamika