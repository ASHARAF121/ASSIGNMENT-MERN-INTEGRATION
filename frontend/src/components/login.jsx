
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send username and password to the backend for authentication
      const response = await axios.post('http://localhost:3000/crm/login', { username, password });

      // Save JWT token and role in localStorage
      const { token, role } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);

      // Redirect based on role (admin or user)
      if (role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/profile');
      }

    } catch (error) {
      setMessage(error.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="max-w-sm mx-auto p-4 bg-white shadow-md rounded-md">
      <h2 className="text-xl mb-4">Login</h2>
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

        {/* Submit Button */}
        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">
          Login
        </button>
        <button type="button" className="w-full p-2 mt-2 bg-green-500 text-white rounded" onClick={() => navigate('/register')}>
          Go to Register
        </button>
      </form>

      {/* Display Message */}
      {message && <p className="mt-2 text-red-500">{message}</p>}
    </div>
  );
};

export default Login;
