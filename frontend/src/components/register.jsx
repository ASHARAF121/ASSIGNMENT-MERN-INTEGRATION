// src/components/Register.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user'); // Default role to 'user'
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send the username, password, and role to the backend
      const response = await axios.post('http://localhost:3000/crm/register', { username, password, role });
      setMessage(response.data.message);
      navigate('/login');  // Redirect to login page after successful registration
    } catch (error) {
      setMessage(error.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="max-w-sm mx-auto p-4 bg-white shadow-md rounded-md">
      <h2 className="text-xl mb-4">Register</h2>
      <form onSubmit={handleSubmit}>
        {/* Username Input */}
        <input
          type="text"
          placeholder="Username"
          className="w-full p-2 mb-2 border border-gray-300 rounded"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        {/* Password Input */}
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-2 border border-gray-300 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Role Selection */}
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full p-2 mb-2 border border-gray-300 rounded"
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        {/* Submit Button */}
        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">
          Register
        </button>
      </form>

      {/* Display Message */}
      {message && <p className="mt-2 text-red-500">{message}</p>}
    </div>
  );
};

export default Register;
