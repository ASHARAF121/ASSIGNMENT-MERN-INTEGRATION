// src/components/Profile.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [Username, setUsername] = useState('');
  const [role, setRole] = useState('');
  const [jwtDecode, setJwtDecode] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Dynamically import jwt-decode
    const loadJwtDecode = async () => {
      const { decode } = await import('jwt-decode');
      setJwtDecode(() => decode); // Set the decode function
    };
    
    loadJwtDecode();
  }, []);

  useEffect(() => {
    if (!jwtDecode) return;

    // Get the JWT token from localStorage
    const token = localStorage.getItem('token');
    console.log("Token in Profile:", token);

    if (!token) {
      // If no token is found, redirect to login
      navigate('/login');
    } else {
      try {
        // Decode the token
        const decodedToken = jwtDecode(token);
        setUsername(decodedToken.username);
        setRole(decodedToken.role);
      } catch (error) {
        console.error("Failed to decode token", error);
        navigate('/login');
      }
    }
  }, [jwtDecode, navigate]);

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-xl mb-4">Profile</h2>
      <div className="mb-4">
        <strong>Username:</strong> <span>{Username}</span>
        
      </div>
      <div className="mb-4">
        <strong>Role:</strong> <span>{role}</span>
      </div>
    </div>
  );
};

export default Profile;
