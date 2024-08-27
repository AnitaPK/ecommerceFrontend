// src/components/Login.js
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../service/authService';
import { UserContext } from '../context/userContext';

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await authService.login(formData.email, formData.password);
      const userInfo = await authService.getUser();
      setUser(userInfo);
      alert('Login successful');
      navigate('/dashboard'); // Adjust the route as per your requirement
    } catch (err) {
      alert('Login failed');
    }
  };

  return (
    <div className="col-md-6 offset-md-3">
      <h2 className="text-center">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    </div>
  );
}

export default Login;
