import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const TestRegister = () => {
    const [role, setRole] = useState('commonUser')
    const [name, setName] = useState('')
    const [mobileNumber, setMobileNumber] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    const Navigate = useNavigate();

function register(payload){
   
    try {
        const response = axios.post('http://localhost:5000/api/auth/register',payload);
        console.log(response.data);   
        Navigate('/login');
    
    } catch (error) {
        console.log(error)
    }
}



    function handleSubmit (event){
        event.preventDefault()
        const payload = {role,name,mobileNumber,email,password};
        register(payload)
    }

  return (
    <div>
        <form onSubmit={handleSubmit}>
      <div className="form-group">
          <label>Role</label>
          <select
            className="form-control"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="commonUser">Common User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
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
        <div className="form-group">
          <label>Mobile Number</label>
          <input
            type="text"
            className="form-control"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Register</button>
      </form>
      
    </div>
  )
}

export default TestRegister
