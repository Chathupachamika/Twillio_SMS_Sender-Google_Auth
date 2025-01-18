import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const AuthCallback = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    
    if (token) {
      localStorage.setItem('token', token);
      setIsAuthenticated(true);
      navigate('/home');
    } else {
      navigate('/login');
    }
  }, [location, navigate, setIsAuthenticated]);

  return <div>Processing authentication...</div>;
};

export default AuthCallback;
