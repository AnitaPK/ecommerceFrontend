import React, { useState } from 'react';
import EditProductModal from './EditProductModal';
import DeleteProductModal from './DeleteProductModal';

const ProductCard = ({ product, onProductUpdated, onProductDeleted }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  return (
    <div className="card mb-3">
      <img src={product.image} className="card-img-top" alt={product.name} />
      <div className="card-body">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text">Category: {product.category.name}</p>
        <p className="card-text">Price: ${product.price}</p>
        <p className="card-text">Available: {product.available ? 'Yes' : 'No'}</p>
        <p className="card-text">Quantity: {product.quantity}</p>

        <button
          className="btn btn-warning mr-2"
          onClick={() => setShowEditModal(true)}
        >
          Edit
        </button>
        <button
          className="btn btn-danger"
          onClick={() => setShowDeleteModal(true)}
        >
          Delete
        </button>

        <EditProductModal
          show={showEditModal}
          onHide={() => setShowEditModal(false)}
          product={product}
          onProductUpdated={onProductUpdated}
        />

        <DeleteProductModal
          show={showDeleteModal}
          onHide={() => setShowDeleteModal(false)}
          product={product}
          onProductDeleted={onProductDeleted}
        />
      </div>
    </div>
  );
};

export default ProductCard;
