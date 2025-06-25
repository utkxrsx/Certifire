const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Ensure environment variables are loaded
require('dotenv').config();

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

// Check if JWT_SECRET is defined
if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined in the environment variables');
}

// Register new user
router.post('/register', async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const user = new User({
      name,
      email,
      password, // Save the password directly; it'll be hashed in the pre-save middleware
      role
    });

    await user.save();

    const payload = { user: { id: user.id, role: user.role } };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    console.error('Error registering user:', error.message);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log(`Login attempt with email: ${email}`);

    const user = await User.findOne({ email });
    if (!user) {
      console.log('User not found');
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Use the comparePassword method to check if passwords match
    const isMatch = await user.comparePassword(password);

    console.log('Password match result:', isMatch);
    if (!isMatch) {
      console.log('Password mismatch');
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    console.log('Login Successful');

    const payload = { user: { id: user.id, role: user.role } };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

    res.json({ token, role: user.role });
  } catch (error) {
    console.error('Server error:', error.message);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
