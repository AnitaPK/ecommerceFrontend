import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const TestLogin = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const Navigate = useNavigate();

    const login = async (payload)=>{
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login',payload);
            console.log(response.data);
            localStorage.setItem('token', response.data.token);
        } catch (error) {
            console.log(error)
        }

    }

    const handleSubmit = async (event)=>{
    event.preventDefault();
    const payload = {email, password} 
    await login(payload);
    Navigate('/dashboard')
    }


  return (
    <div>
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
    </div>
  )
}

export default TestLogin
