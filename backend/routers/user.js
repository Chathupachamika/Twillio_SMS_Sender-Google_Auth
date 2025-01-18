const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const passport = require('passport');

const router = express.Router();

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        const token = jwt.sign(
            { userId: user._id, username: user.username },
            process.env.TOKEN_KEY,
            { expiresIn: '24h' }
        );

        res.json({
            token,
            user: {
                username: user.username,
                id: user._id,
                phoneNumber: user.phoneNumber 
            }
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/auth/google/callback', 
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
            res.redirect(`${process.env.CLIENT_URL}/auth-callback?token=${token}`);
        } catch (error) {
            res.redirect(`${process.env.CLIENT_URL}/login?error=authentication_failed`);
        }
    }
);
router.post('/reset-password', async (req, res) => {
    try {
      const { username, newPassword } = req.body;
  
      if (!username || !newPassword) {
        return res.status(400).json({ message: 'All fields are required' });
      }
  
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);
  
      user.password = hashedPassword;
      await user.save();
  
      res.json({ message: 'Password updated successfully' });
    } catch (error) {
      console.error('Password reset error:', error);
      res.status(500).json({ message: 'Server error during password reset' });
    }
  });
router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ error: 'Username already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new User({
            username,
            password: hashedPassword
        });

        await user.save();

        const token = jwt.sign(
            { userId: user._id, username: user.username },
            process.env.TOKEN_KEY,
            { expiresIn: '24h' }
        );

        res.status(201).json({
            token,
            user: {
                username: user.username,
                id: user._id
            }
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
