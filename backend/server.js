const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config(); // Load environment variables early

const authRoutes = require('./routes/authRoutes');

const app = express();

// Check if JWT_SECRET is defined
if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET must be defined in the environment variables');
}

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
