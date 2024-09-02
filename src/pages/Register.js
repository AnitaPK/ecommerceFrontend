import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
    // State variables for each form field
    const [role, setRole] = useState('commonUser'); 
    const [name, setName] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const navigate=useNavigate();

    // Handle form submission
    const onSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage(''); // Clear previous error message
        setSuccessMessage(''); // Clear previous success message
        
        try {
            // Send registration data to the API
            const response = await axios.post('http://localhost:5000/api/auth/register', {
                role,
                name,
                mobileNumber,
                email,
                password,
            });

            // Handle successful registration
            if (response.data.success) {
                setSuccessMessage('Registration successful! You can now log in.');
                alert('Registered successfully')
                navigate('/login')
            }else{
                alert('Registration failed')

            }
        } catch (error) {
            // Handle errors (e.g., email already exists, validation errors)
            if (error.response && error.response.data && error.response.data.message) {
                setErrorMessage(error.response.data.message);
                alert('Registration failed')
            } else {
                setErrorMessage('An error occurred. Please try again.');
            }
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header">
                            <h3 className="text-center">Register</h3>
                        </div>
                        <div className="card-body">
                            <form onSubmit={onSubmit}>
                                {errorMessage && (
                                    <div className="alert alert-danger" role="alert">
                                        {errorMessage}
                                    </div>
                                )}
                                {successMessage && (
                                    <div className="alert alert-success" role="alert">
                                        {successMessage}
                                    </div>
                                )}
                                <div className="form-group mb-3">
                                    <label htmlFor="role">Role</label>
                                    <select
                                        className="form-control"
                                        id="role"
                                        value={role}
                                        onChange={(e) => setRole(e.target.value)}
                                        required
                                    >
                                        <option value="admin">Admin</option>
                                        <option value="commonUser">Common User</option>
                                    </select>
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="name">Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="mobileNumber">Mobile Number</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="mobileNumber"
                                        value={mobileNumber}
                                        onChange={(e) => setMobileNumber(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="email">Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="password">Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary w-100">
                                    Register
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
