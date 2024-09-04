import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';

const DeleteProductModal = ({ show, onHide, product, onProductDeleted }) => {
  const handleDelete = async () => {
    const token = localStorage.getItem('token');
    console.log(" product in delete modal",product);
    try {
      await axios.delete(`http://localhost:5000/api/products/deleteProduct/${product.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      onProductDeleted();
      onHide();
    } catch (err) {
      console.error('Error deleting product', err);
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to delete the product "{product.name}"?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteProductModal;
