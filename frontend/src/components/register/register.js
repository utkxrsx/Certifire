import axios from 'axios';
import React, { useState } from 'react';
import './register.css';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student'
  });

  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword, role } = formData;

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    axios.post('http://localhost:4000/api/auth/register', { name, email, password, role })
      .then(response => {
        const redirectPage = role === 'student' ? '/student' : '/admin';
        window.location.href = redirectPage;
      })
      .catch(error => {
        setError('Registration failed, please try again');
        console.error('Registration error:', error.response ? error.response.data : error.message);
      });
  };

  return (
    <div className="register-container">
      <h1 className="register-title">Register</h1>
      {error && <p className="error-text">{error}</p>}
      <form onSubmit={handleSubmit} className="register-form">
        <div className="input-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="input-group">
          <label>Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="input-group">
          <label>Role</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleInputChange}
          >
            <option value="student">Student</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button type="submit" className="register-button">Register</button>
      </form>
    </div>
  );
}

export default Register;
