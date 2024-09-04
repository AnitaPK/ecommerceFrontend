import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";

const DeleteCategory = ({
  show,
  handleClose,
  category,
  handleCategoryDelete,
}) => {
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  const handleDelete = async () => {
    console.log(category);
    setLoading(true);
    if (!token) {
      alert("User is not authenticated.");
    }
    try {
     await axios.delete(
        `http://localhost:5000/api/categories/deleteCategory/${category._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      handleCategoryDelete(category._id);
    } catch (error) {
      console.error("Error deleting category:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Category</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Are you sure you want to delete this category? This action cannot be
          undone.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleDelete} disabled={loading}>
          {loading ? "Deleting..." : "Delete"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteCategory;
