import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import Login from './components/LoginPage';
import Register from './components/Register';
import AuthCallback from './components/AuthCallback';
import Home from './components/HomePage';
import { useState } from 'react';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route
            path="/login"
            element={
              !isAuthenticated ?
                <Login setIsAuthenticated={setIsAuthenticated} /> :
                <Navigate to="/home" />
            }
          />
          <Route path="/auth-callback" element={<AuthCallback setIsAuthenticated={setIsAuthenticated} />} />

          <Route
            path="/register"
            element={
              !isAuthenticated ?
                <Register setIsAuthenticated={setIsAuthenticated} /> :
                <Navigate to="/home" />
            }
          />
          <Route
            path="/home"
            element={
              isAuthenticated ?
                <Home setIsAuthenticated={setIsAuthenticated} /> :
                <Navigate to="/login" />
            }
          />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;