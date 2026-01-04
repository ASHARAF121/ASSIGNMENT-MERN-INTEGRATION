// src/App.js
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Register from './components/register';
import Login from './components/Login';
import Profile from './components/profile';
import ProtectedRoute from './components/ProtectedRoute';


const App = () => {
  const token = localStorage.getItem('token');  // Check if token exists in localStorage

  return (
    <div className="App">
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        
        {/* Protected Profile route */}
        {/* <Route
          path="/profile"
          element={token ? <Profile /> : <Navigate to="/login" />}
        /> */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* Optionally, Admin page route */}
        <Route
          path="/admin"
          element={token && localStorage.getItem('role') === 'admin' ? <Admin /> : <Navigate to="/login" />}
        />

        {/* Redirect to login page if no token */}
        <Route
          path="/"
          element={token ? <Navigate to="/profile" /> : <Navigate to="/login" />}
        />
      </Routes>

      
       
    </div>
  );
};

export default App;
