import React, { useState, useEffect } from 'react';
import { AuthProvider } from "./contexts/AuthContext";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Dashboard from './components/Dashboard';
import LoginSignUp from './components/LoginSignUp';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  // State to keep track of whether the user is logged in
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Effect to check the logged in status from local storage
  useEffect(() => {
    // Check if user is logged in
    const loggedInStatus = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedInStatus);
  }, []);

  const handleLogin = (status) => {
    setIsLoggedIn(status);
    localStorage.setItem('isLoggedIn', status ? 'true' : 'false');
    console.log('Is logged in:', status);
  };

  return (
    <Dashboard/>
    // <AuthProvider>
    //   <Router>
    //     <div className='page'>
    //       <Routes>
    //         <Route path="/login" element={isLoggedIn ? <Navigate to="/dashboard" replace /> : <LoginSignUp onLogin={handleLogin} />} />
    //         <Route path="/dashboard" element={isLoggedIn? <Dashboard /> : <Navigate to="/login" replace />} />
    //         <Route path="*" element={<Navigate to={isLoggedIn ? "/dashboard" : "/login"} replace />} />
    //       </Routes>
    //     </div>
    //   </Router>
    // </AuthProvider>
  );
}

export default App;
