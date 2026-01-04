// src/components/Profile.jsx
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Profile = () => {
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('');
  const [jwtDecode, setJwtDecode] = useState(null);
  const navigate = useNavigate();

  const profileInfo = async () => {
    try {
      const token = localStorage.getItem('token');
      // Decode the token to get the username
      const decoded = jwtDecode(token);
      const usernameFromToken = decoded?.username;
      if (!usernameFromToken) {
        throw new Error('Username not found in token');
      }
      const profileResponse = await axios.get(`http://localhost:3000/crm/profile/${usernameFromToken}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (profileResponse.data) {
        setUsername(profileResponse.data.username);
        setRole(profileResponse.data.role);
      }

    } catch (error) {
      console.error("Error fetching profile info", error);
    }
  }

  useEffect(() => {
    // Dynamically import jwt-decode
    
    const loadJwtDecode = async () => {
      const decode = (await import('jwt-decode')).default;
      setJwtDecode(() => decode); // Set the decode function
    };
    
    loadJwtDecode();
  }, []);

  useEffect(() => {
    if (!jwtDecode) return;

    // Get the JWT token from localStorage
    const token = localStorage.getItem('token');
    if (!token) {
      // If no token is found, redirect to login
      navigate('/login');
    } else {
      try {
        // Decode the token to check validity
        jwtDecode(token);
        // Fetch profile info from backend
        // profileInfo();
      } catch (error) {
        console.error("Failed to decode token", error);
        navigate('/login');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jwtDecode, navigate]);

  // Define logout function at the component level
  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-xl mb-4">Profile</h2>
      <div className="mb-4">
        <strong>Username:</strong> <span>{username}</span>
        
      </div>
      <div className="mb-4">
        <strong>Role:</strong> <span>{role}</span>
      </div>
      <button
        onClick={logout}
        className="w-full p-2 bg-red-500 text-white rounded">Logout</button>
    </div>
  );
};

export default Profile;
