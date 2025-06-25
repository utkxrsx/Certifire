const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define the user schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'student', enum: ['student', 'admin'] }
});

// Pre-save middleware to hash the password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
   // console.log('Hashed password:', this.password); // Log the hashed password for debugging
    next();
  } catch (error) {
    console.error('Error hashing password:', error);
    next(error);
  }
});

// Method to compare input password with hashed password
userSchema.methods.comparePassword = async function (inputPassword) {
  if (!inputPassword) {
    throw new Error('No password provided for comparison');
  }

  try {
    const isMatch = await bcrypt.compare(inputPassword, this.password);
    return isMatch;
  } catch (error) {
    console.error('Error during password comparison:', error);
    throw new Error('An error occurred while comparing passwords');
  }
};

// Create and export the User model
const User = mongoose.model('User', userSchema);
module.exports = User;
