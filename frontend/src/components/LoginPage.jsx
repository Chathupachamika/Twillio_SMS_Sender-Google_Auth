import React, { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  Link,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputAdornment,
  IconButton,
  Stepper,
  Step,
  StepLabel,
  Divider,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  Person,
  Lock,
  Visibility,
  VisibilityOff,
  Login as LoginIcon,
  Phone,
  Key,
  AppRegistration,
  Sms,
  Google as GoogleIcon,
} from '@mui/icons-material';

// Existing styled components remain the same
const StyledContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  padding: '20px',
});

const StyledBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  backgroundColor: 'rgba(255, 255, 255, 0.95)',
  borderRadius: '15px',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
  backdropFilter: 'blur(10px)',
  width: '100%',
  maxWidth: 400,
}));

const StyledForm = styled('form')({
  width: '100%',
  marginTop: '16px',
});

const StyledButton = styled(Button)(({ theme }) => ({
  margin: '16px 0',
  padding: '12px',
  borderRadius: '8px',
  textTransform: 'none',
  fontSize: '1rem',
  fontWeight: 600,
}));

// New styled component for Google button
const GoogleButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#ffffff',
  color: theme.palette.text.primary,
  border: `1px solid ${theme.palette.grey[300]}`,
  '&:hover': {
    backgroundColor: theme.palette.grey[100],
  },
  marginTop: '16px',
  padding: '12px',
  borderRadius: '8px',
  textTransform: 'none',
  fontSize: '1rem',
  fontWeight: 500,
  boxShadow: theme.shadows[1],
}));

const Login = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [resetData, setResetData] = useState({
    username: '',
    phoneNumber: '',
    otp: '',
    newPassword: '',
  });

  const steps = ['Phone Verification', 'Enter OTP', 'Reset Password'];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value.trim() });
    setError('');
  };
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const authError = params.get('error');
    if (authError) {
      setError('Google authentication failed. Please try again.');
    }
  }, [location]);

  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:3003/auth/google';
  };

  const handleResetDataChange = (field) => (e) => {
    setResetData({ ...resetData, [field]: e.target.value.trim() });
    setError('');
  };

  
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.password) {
      setError('Please fill in all fields');
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:3003/api/user/login', formData);
      const { token } = response.data;
      if (token) {
        localStorage.setItem('token', token);
        setIsAuthenticated(true);
        navigate('/home');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleSendOTP = async () => {
    if (!resetData.phoneNumber) {
      setError('Please enter your phone number');
      return;
    }
    setLoading(true);
    try {
      await axios.post('http://localhost:3003/api/verification/send-code', {
        phoneNumber: resetData.phoneNumber,
        channel: 'sms'
      });
      setActiveStep(1);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send OTP.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (!resetData.otp) {
      setError('Please enter the OTP');
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:3003/api/verification/verify-code', {
        phoneNumber: resetData.phoneNumber,
        code: resetData.otp
      });
      if (response.data.result.status === 'approved') {
        setActiveStep(2);
        setError('');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid OTP.');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async () => {
    if (!resetData.newPassword) {
      setError('Please enter new password');
      return;
    }
    setLoading(true);
    try {
      await axios.post('http://localhost:3003/api/user/reset-password', {
        username: resetData.username,
        newPassword: resetData.newPassword,
      });
      alert('Password reset successful! Please login with your new password.');
      setIsDialogOpen(false);
      setActiveStep(0);
      setResetData({
        username: '',
        phoneNumber: '',
        otp: '',
        newPassword: '',
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Password reset failed.');
    } finally {
      setLoading(false);
    }
  };
  

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <>
            <TextField
              label="Username"
              fullWidth
              value={resetData.username}
              onChange={handleResetDataChange('username')}
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Person />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              label="Phone Number"
              fullWidth
              value={resetData.phoneNumber}
              onChange={handleResetDataChange('phoneNumber')}
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Phone />
                  </InputAdornment>
                ),
              }}
            />
          </>
        );
      case 1:
        return (
          <TextField
            label="Enter OTP"
            fullWidth
            value={resetData.otp}
            onChange={handleResetDataChange('otp')}
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Sms />
                </InputAdornment>
              ),
            }}
          />
        );
      case 2:
        return (
          <TextField
            label="New Password"
            type={showPassword ? 'text' : 'password'}
            fullWidth
            value={resetData.newPassword}
            onChange={handleResetDataChange('newPassword')}
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Key />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        );
      default:
        return null;
    }
  };

  const handleStepAction = () => {
    switch (activeStep) {
      case 0:
        handleSendOTP();
        break;
      case 1:
        handleVerifyOTP();
        break;
      case 2:
        handlePasswordReset();
        break;
      default:
        break;
    }
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setActiveStep(0);
    setError('');
    setResetData({
      username: '',
      phoneNumber: '',
      otp: '',
      newPassword: '',
    });
  };

  // ... keep existing return statement until Dialog ...

  return (
     <StyledContainer>
      <StyledBox>
        <LoginIcon sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
        <Typography variant="h5" fontWeight="bold" color="primary" gutterBottom>
          Welcome Back
        </Typography>
        {error && <Alert severity="error" sx={{ width: '100%', mb: 2 }}>{error}</Alert>}
        <StyledForm onSubmit={handleLogin}>
          <TextField
            name="username"
            label="Username"
            fullWidth
            required
            margin="normal"
            value={formData.username}
            onChange={handleChange}
            disabled={loading}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Person color="primary" />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            fullWidth
            required
            margin="normal"
            value={formData.password}
            onChange={handleChange}
            disabled={loading}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock color="primary" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Link
            component="button"
            variant="body2"
            onClick={() => setIsDialogOpen(true)}
            sx={{ mb: 1, display: 'block', marginLeft: '215px' }}
          >
            Forgot password?
          </Link>
          <StyledButton
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} /> : <LoginIcon />}
          >
            Sign In
          </StyledButton>
          
          <Box sx={{ my: 2, display: 'flex', alignItems: 'center' }}>
            <Divider sx={{ flex: 1 }} />
            <Typography variant="body2" color="text.secondary" sx={{ mx: 2 }}>
              OR
            </Typography>
            <Divider sx={{ flex: 1 }} />
          </Box>

          <GoogleButton
            fullWidth
            onClick={handleGoogleLogin}
            startIcon={
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21.8055 10.0415H21V10H12V14H17.6515C16.827 16.3285 14.6115 18 12 18C8.6865 18 6 15.3135 6 12C6 8.6865 8.6865 6 12 6C13.5295 6 14.921 6.577 15.9805 7.5195L18.809 4.691C17.023 3.0265 14.634 2 12 2C6.4775 2 2 6.4775 2 12C2 17.5225 6.4775 22 12 22C17.5225 22 22 17.5225 22 12C22 11.3295 21.931 10.675 21.8055 10.0415Z"
                  fill="#FFC107"
                />
                <path
                  d="M3.15295 7.3455L6.43845 9.755C7.32745 7.554 9.48045 6 12 6C13.5295 6 14.921 6.577 15.9805 7.5195L18.809 4.691C17.023 3.0265 14.634 2 12 2C8.15895 2 4.82795 4.1685 3.15295 7.3455Z"
                  fill="#FF3D00"
                />
                <path
                  d="M12 22C14.583 22 16.93 21.0115 18.7045 19.404L15.6095 16.785C14.5718 17.5742 13.3038 18.001 12 18C9.39903 18 7.19053 16.3415 6.35853 14.027L3.09753 16.5395C4.75253 19.778 8.11353 22 12 22Z"
                  fill="#4CAF50"
                />
                <path
                  d="M21.8055 10.0415H21V10H12V14H17.6515C17.2571 15.1082 16.5467 16.0766 15.608 16.7855L15.6095 16.785L18.7045 19.404C18.4855 19.6025 22 17 22 12C22 11.3295 21.931 10.675 21.8055 10.0415Z"
                  fill="#1976D2"
                />
              </svg>
            }
          >
            Continue with Google
          </GoogleButton>
        </StyledForm>
        <Box sx={{ mt: 2, textAlign: 'center' }}>
          <Link
            component={RouterLink}
            to="/register"
            variant="body2"
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <AppRegistration sx={{ mr: 0.5 }} />
            Don't have an account? Sign up
          </Link>
        </Box>
      </StyledBox>

      {/* Keep existing Dialog component */}

      <Dialog 
        open={isDialogOpen} 
        onClose={handleDialogClose}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Reset Password</DialogTitle>
        <DialogContent>
          <Stepper activeStep={activeStep} sx={{ mb: 3, mt: 2 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          {getStepContent(activeStep)}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button 
            onClick={handleStepAction} 
            disabled={loading}
            variant="contained"
          >
            {loading ? (
              <CircularProgress size={24} />
            ) : activeStep === steps.length - 1 ? (
              'Reset Password'
            ) : activeStep === 1 ? (
              'Verify OTP'
            ) : (
              'Send OTP'
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </StyledContainer>
  );
};

export default Login;