import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get('http://localhost:5000/api/products/getAllProduct', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProducts(response.data);
    } catch (err) {
      setError('Error fetching products');
    }
  };

  const handleProductUpdated = () => {
    fetchProducts();  // Re-fetch products after an update
  };

  const handleProductDeleted = () => {
    fetchProducts();  // Re-fetch products after a deletion
  };

  return (
    <div className="container">
      <h2>Product List</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="row">
        {products.map((product) => (
          <div key={product._id} className="col-12 col-sm-6 col-md-4 col-lg-3">
            <ProductCard 
              product={product} 
              onProductUpdated={handleProductUpdated} 
              onProductDeleted={handleProductDeleted} 
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
