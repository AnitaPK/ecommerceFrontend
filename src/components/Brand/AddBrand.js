import React, { useState } from 'react';
import axios from 'axios';

const AddBrand = () => {
  const [name, setName] = useState('');
  const [image, setImage] = useState(null);

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    if (!token) {
      setError('User is not authenticated.');
      return;
    }

    try {
      await axios.post(
        'http://localhost:5000/api/brand/createBrand',
        { name, image },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      setSuccess('Category added successfully!');
      setName(''); 
      setImage(null)
      setError(null);
    } catch (err) {
      setError('Error adding category. Please try again.');
      setSuccess(null);
    }
  };

  const handleDismiss = () => {
    setError(null);
    setSuccess(null);
  };

  return (
    <div className="container">
      <h2>Add Brand</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="brandName">Brand Name</label>
          <input
            type="text"
            className="form-control"
            id="brandName"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="brandImage">Brand Image</label>
          <input
            type="file"
            className="form-control"
            id="brandImage"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>

        {error && (
          <div className="alert alert-danger alert-dismissible fade show" role="alert">
            {error}
            <button
              type="button"
              className="close"
              onClick={handleDismiss}
              aria-label="Close"
              style={{ position: 'absolute', right: '10px', top: '5px' }}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        )}

        {success && (
          <div className="alert alert-success alert-dismissible fade show" role="alert">
            {success}
            <button
              type="button"
              className="close"
              onClick={handleDismiss}
              aria-label="Close"
              style={{ position: 'absolute', right: '10px', top: '5px' }}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        )}

        <button type="submit" className="btn btn-primary mt-3">
          Add Brand
        </button>
      </form>
    </div>
  );
};

export default AddBrand;
