import React from "react";

const ProductCard = ({ product }) => {
  return (
    <div className="card mb-4" style={{ minWidth: "100%", maxWidth: "100%" }}>
      <img
        src={product.productImage || 'https://via.placeholder.com/40'}
        className="card-img-top"
        alt={product.name}
        style={{ objectFit: "cover", height: "200px" }}
      />

      <div className="card-body">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text">{product.category}</p>
        <p className="card-text">Price: ${product.price}</p>
        <a href="#" className="btn btn-primary">
          View Details
        </a>
      </div>
    </div>
  );
};

export default ProductCard;
