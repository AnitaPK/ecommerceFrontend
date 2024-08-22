import React, { useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

const LoginPage = () => {
  // const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [token, setToken] = useState(localStorage.getItem('token'));

  const navigate = useNavigate();

  // useEffect(() => {
  //   if (token) {
  //     localStorage.setItem('token', token);
  //   } else {
  //     localStorage.removeItem('token');
  //   }
  // });

  const login = async (userData) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', userData);
      console.log(response.data);
      const { token } = response.data;
      localStorage.setItem('token', token);
      // setToken(token);
      console.log('Login successful, token stored.');
      // console.log(token);
      toast.success('Logged in successfully');
    } catch (error) {
      console.error('Login error:', error);
      toast.error(error.response?.data?.message || 'Login failed');
    }
  };

   const  handleSubmit = async (e) => {
    e.preventDefault();
    try {
        await login({ email, password });
        navigate('/dashboard'); 
      } catch (error) {
        toast.error('Login failed');
      }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default LoginPage;
