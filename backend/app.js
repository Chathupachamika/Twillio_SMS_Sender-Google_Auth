require('dotenv').config();
const express = require('express');
const connectDB = require('./db');
const cors = require('cors');
const passport = require('passport');
const verificationRouter = require('./routers/verification');
const session = require('express-session');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('./models/user');
// Initialize express app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
}, async (accessToken, refreshToken, profile, done) => {
    try {
        let user = await User.findOne({ googleId: profile.id });
        
        if (!user) {
            // Create new user if doesn't exist
            user = await User.create({
                username: profile.displayName,
                email: profile.emails[0].value,
                googleId: profile.id,
                authType: 'google'
            });
        }
        
        return done(null, user);
    } catch (error) {
        return done(error, null);
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});

// Google OAuth routes
app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);


app.get('/auth/google/callback', 
    passport.authenticate('google', { failureRedirect: '/login' }),
    (req, res) => {
      try {
        const token = jwt.sign(
          { 
            userId: req.user._id, 
            username: req.user.username,
            email: req.user.email
          },
          process.env.TOKEN_KEY,
          { expiresIn: '24h' }
        );
        
        // Use absolute URL for redirect
        res.redirect(`${process.env.CLIENT_URL}/auth-callback?token=${token}`);
      } catch (error) {
        res.redirect(`${process.env.CLIENT_URL}/login?error=authentication_failed`);
      }
    }
  );

// Import routes
const userRoutes = require('./routers/user');
const studentRoutes = require('./routers/student');
const auth = require('./middleware/auth');

// Route middlewares
app.use('/api/user', userRoutes);
app.use('/api/student', auth, studentRoutes);
app.use('/api/verification', verificationRouter);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Something went wrong!',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

// Handle 404 routes
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    });
});

// Server setup
const port = process.env.PORT || 3003;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
    console.log('UNHANDLED REJECTION! 💥 Shutting down...');
    console.log(err.name, err.message);
    process.exit(1);
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
    console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
    console.log(err.name, err.message);
    process.exit(1);
});