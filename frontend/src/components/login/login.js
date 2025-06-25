import axios from 'axios';
import React, { useState } from 'react';
import '../login/login.css'; // Assuming you have this file for styles

function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');

  // Handle input change for form fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Validate form before submission
  const validateForm = () => {
    const { email, password } = formData;
    if (!email || !password) {
      setError('Both email and password are required');
      return false;
    }
    return true;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form before proceeding
    if (!validateForm()) return;

    const { email, password } = formData;

    try {
      // Make API request to the backend server
      const response = await axios.post('http://localhost:4000/api/auth/login', { email, password });

      // Log successful login response
      console.log('Login successful:', response.data);

      // Redirect user based on their role
      const redirectPage = response.data.role === 'student' ? '/student' : '/admin';
      window.location.href = redirectPage;

    } catch (error) {
      // Handle error cases from the login attempt
      if (error.response) {
        // If there's a response error (e.g., 400 Bad Request), log details
        console.error('Error response data:', error.response.data);
        setError(error.response.data.msg || 'Invalid email or password. Please try again.');
      } else if (error.request) {
        // If the request was made but no response received
        console.error('Error request:', error.request);
        setError('Unable to connect to the server. Please try again later.');
      } else {
        // If there was another issue during setup
        console.error('Error message:', error.message);
        setError('An unexpected error occurred. Please try again.');
      }
    }
  };

  return (
    <div className='maindiv'>
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              id="password"
              name="password"
              required
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>
          <button type="submit">Login</button>
        </form>
        {error && <p>{error}</p>}
      </div>
    </div>
  );
}

export default LoginPage;
