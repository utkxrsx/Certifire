import 'boxicons/css/boxicons.min.css';
import React from "react";
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import AboutUs from './components/aboutus/about';
import AdminPage from './components/admin/admin';
import Header from './components/bodycomp/header';
import HomePage from './components/home/homepage';
import LoginPage from './components/login/login';
import Register from './components/register/register';
import StudentPage from './components/student/student';

function App() {
  return (
    <Router>
      <div className="App">
        {/* The Header will stay on top */}
        <Header />

        {/* Main content changes based on route */}
        <div className="main-content">
          <Routes>
          <Route path="/" element={<HomePage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/student" element={<StudentPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/about" element={<AboutUs />} />
            
          </Routes>
        </div>
      </div>

      {/* Optional Footer */}
      <footer className="footer">
      <p style={{ color: 'white' }}>© 2024 CERTIFIRE. All rights reserved.</p>
      </footer>
    </Router>
  );
}

export default App;