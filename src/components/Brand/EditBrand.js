import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";

const EditBrand = ({
  show,
  handleClose,
  brand,
  handleBrandUpdate,
}) => {
  const [brandName, setBrandName] = useState(brand.brandName);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");


  if (!token) {
    alert("User is not authenticated.");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
        // console.log(brandName);
        // console.log(token);
      const response = await axios.put(
        `http://localhost:5000/api/brand/updateBrand/${brand._id}`,
        { brandName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      handleBrandUpdate(response.data);
    } catch (error) {
      console.error("Error updating category:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Brand</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formCategoryName">
            <Form.Label>Brand Name</Form.Label>
            <Form.Control
              type="text"
              value={brand.name}
              onChange={(e) => setBrandName(e.target.value)}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditBrand;
