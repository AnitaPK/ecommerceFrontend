import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddProduct = () => {
  const [name, setName] = useState('');
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState('');
  const [description, setdescription] = useState('');
  const [price, setPrice] = useState('');
  const [available, setAvailable] = useState(true);
  const [quantity, setQuantity] = useState('');
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [brands, setBrands] = useState([])
  const [brand, setBrand] = useState([])


  const fetchCategories = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get('http://localhost:5000/api/categories/getAllCategory',{
        headers: {
          Authorization: `Bearer ${token}`,
        }});
      // console.log(response.data)
      setCategories(response.data.categories);
    } catch (err) {
      setError('Error fetching categories');
    }
  };

  const fetchBrands = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get('http://localhost:5000/api/brand/getAllBrand',{
        headers: {
          Authorization: `Bearer ${token}`,
        }});
      console.log(response.data)
      setBrands(response.data.brands);
    } catch (err) {
      setError('Error fetching brand');
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchBrands()
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    if (!token) {
      setError('User is not authenticated.');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('brand',brand);
    formData.append('image', image);
    formData.append('category', category);
    formData.append('description', description)
    formData.append('price', price);
    formData.append('available', available);
    formData.append('quantity', quantity);

console.log(formData)
    try {
      await axios.post('http://localhost:5000/api/products/createProduct', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
// console.log(formData);
      setSuccess('Product added successfully!');
      setName('');
      setBrand('')
      setImage('');
      setCategory('');
      setdescription('');
      setPrice('');
      setAvailable(true);
      setQuantity('');
      setError(null);
    } catch (err) {
      setError('Error adding product. Please try again.');
      setSuccess(null);
    }
  };

  const handleDismiss = () => {
    setError(null);
    setSuccess(null);
  };

  return (
    <div className="container">
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="productName">Product Name</label>
          <input
            type="text"
            className="form-control"
            id="productName"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="productBrand">Brand</label>
          <select
            className="form-control"
            id="productBrand"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            required
          >
            <option >Select a Brand</option>
            {brands.map((brnd) => (
              <option key={brnd._id} value={brnd._id}>
                {brnd.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="productImage">Product Image</label>
          <input
            type="file"
            className="form-control"
            id="productImage"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>

        <div className="form-group">
          <label htmlFor="productCategory">Category</label>
          <select
            className="form-control"
            id="productCategory"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="productDescription">Discription</label>
          <input
            type="text"
            className="form-control"
            id="productDescription"
            value={description}
            onChange={(e) => setdescription(e.target.value)}
            required
          >
          </input>
        </div>
        
        <div className="form-group">
          <label htmlFor="productPrice">Price</label>
          <input
            type="number"
            className="form-control"
            id="productPrice"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="productAvailable">Available</label>
          <select
            className="form-control"
            id="productAvailable"
            value={available}
            onChange={(e) => setAvailable(e.target.value === 'true')}
            required
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="productQuantity">Quantity</label>
          <input
            type="number"
            className="form-control"
            id="productQuantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
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
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        )}

        <button type="submit" className="btn btn-primary mt-3">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
