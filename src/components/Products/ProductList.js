import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    useEffect(()=>{
        async function fetchProducts(){
            const token = localStorage.getItem('token');
    if (!token) return null;

    try {
      const response = await axios.get('http://localhost:5000/api/products/getAllProduct',{
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(response.data.products);
    } catch (err) {
      console.error('Failed to fetch product information', err);
      return null;
    }
        }
        fetchProducts();
        console.log(products);
    },[])
  return (
    <div>
      
    </div>
  )
}

export default ProductList
