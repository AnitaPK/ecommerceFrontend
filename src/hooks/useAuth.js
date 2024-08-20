import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import {jwtDecode} from 'jwt-decode';

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
      const decodedUser = jwtDecode(token).user;  // Extract the user from the token
      console.log(decodedUser);
      setUser(decodedUser);  // Update the user state
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  const register = async (userData) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', userData);
      console.log(response.data.message);
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response?.data?.error || 'Registration failed');
    }
  };

  const login = async (userData) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', userData);
      const { token } = response.data;
      setToken(token);
      console.log('Login successful, token stored.');
      console.log(token);
      toast.success('Logged in successfully');
    } catch (error) {
      console.error('Login error:', error);
      toast.error(error.response?.data?.message || 'Login failed');
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
  };

  return {
    user,
    token,
    register,
    login,
    logout,
  };
};

export default useAuth;
