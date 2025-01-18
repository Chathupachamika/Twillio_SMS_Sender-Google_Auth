# Advanced Authentication System Frontend 🔐

A modern and secure authentication system built with React.js, featuring JWT authentication, OTP verification, Google OAuth2, and password reset functionality.

![Authentication System](https://raw.githubusercontent.com/Chathupachamika/Twillio_SMS_Sender-Google_Auth/main/screenshots/login.png)

## Features ✨

- **User Authentication** 
  - JWT-based secure login/signup
  - Session management
  - Protected routes
  
- **Password Recovery** 
  - SMS-based OTP verification
  - Secure password reset flow
  - Phone number validation
  
- **Social Authentication** 
  - Google OAuth2 integration
  - Seamless social login experience
  
- **Modern UI/UX** 
  - Material-UI components
  - Responsive design
  - Loading states and animations
  - Error handling notifications

## Prerequisites 📋

Before running this project, make sure you have:

- Node.js (v14 or higher)
- npm or yarn package manager
- Backend server running (see backend repository)
- Google OAuth2 credentials
- Twilio account credentials

## Installation 🛠️

1. Clone the repository:
```bash
git clone https://github.com/Chathupachamika/Twillio_SMS_Sender-Google_Auth
cd Twillio_SMS_Sender-Google_Auth/frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
REACT_APP_API_URL=http://localhost:3003/api
REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id
```

4. Start the development server:
```bash
npm start
```

## Project Structure 📁

```
src/
├── components/        # Reusable UI components
├── pages/            # Main page components
├── context/          # React context providers
├── services/         # API service functions
├── utils/            # Helper functions and constants
├── hooks/            # Custom React hooks
└── assets/           # Static files (images, styles)
```

## Main Components 🧩

### Login Page
- User authentication with username/password
- Google OAuth integration
- "Remember me" functionality
- Password reset flow

### Password Reset Flow
- Phone number verification
- OTP input handling
- New password setup
- Success/error notifications

### Protected Routes
- Authentication state checking
- Redirect handling
- Session management

## API Integration 🔌

The frontend communicates with the backend through these main endpoints:

```javascript
// Authentication endpoints
POST /api/user/login
POST /api/user/register
POST /api/user/google-auth

// Password reset endpoints
POST /api/verification/send-code
POST /api/verification/verify-code
POST /api/user/reset-password
```

## Environment Variables 🔑

Required environment variables:

```env
REACT_APP_API_URL=          # Backend API URL
REACT_APP_GOOGLE_CLIENT_ID= # Google OAuth client ID
```

## Available Scripts 📜

In the project directory, you can run:

- `npm start`: Runs the app in development mode
- `npm test`: Launches the test runner
- `npm run build`: Builds the app for production
- `npm run eject`: Ejects from Create React App

## Contributing 🤝

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Dependencies 📦

- react: ^18.2.0
- react-router-dom: ^6.x
- @mui/material: ^5.x
- axios: ^1.x
- jwt-decode: ^3.x
- @react-oauth/google: ^0.11.x

## Screenshots 📸

![Login Page](screenshots/login.png)
![OTP Verification](screenshots/otp-verification.png)
![Password Reset](screenshots/password-reset.png)

## License 📄

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Contact 📧

Your Name - [@YourTwitter](https://twitter.com/YourTwitter)

Project Link: [https://github.com/Chathupachamika/Twillio_SMS_Sender-Google_Auth](https://github.com/Chathupachamika/Twillio_SMS_Sender-Google_Auth)

## Acknowledgments 🙏

- Material-UI for the beautiful components
- Google OAuth2 for social authentication
- Twilio for SMS services
- React community for amazing tools and libraries
