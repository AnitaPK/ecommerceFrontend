import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Table } from 'react-bootstrap';
import EditBrand from './EditBrand';
import DeleteBrand from './DeleteBrand';

const BrandList = () => {
    const [brand, setBrand] = useState([]);
    const [selectedBrand, setSelectedBrand] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const token = localStorage.getItem('token');


    const fetchCategories = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/brand/getAllBrand',
                {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  }
            );
            setBrand(response.data.brands);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    useEffect(() => {

        if (!token) {
          alert('User is not authenticated.');
        }
       
        fetchCategories();
    }, []);

    const handleEditClick = (brand) => {
        setSelectedBrand(brand);
        setShowEditModal(true);
    };

 
    const handleDeleteClick = (brand) => {
        setSelectedBrand(brand);
        setShowDeleteModal(true);
    };

    const handleCloseModal = () => {
        setShowEditModal(false);
        setShowDeleteModal(false);
        setSelectedBrand(null);
    };

    const handleBrandUpdate = (updatedBrand) => {
        setBrand(brand.map(brnd => (brnd._id === updatedBrand._id ? updatedBrand : brnd)));
        handleCloseModal();
    };


    const handleBrandDelete = (deletedBrandId) => {
        setBrand(brand.filter(cat => cat._id !== deletedBrandId));
        fetchCategories();
        handleCloseModal();
    };

    return (
        <>
        {brand.length > 0 ? (
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Brand Name</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {brand.map((brnd) => (
                        <tr key={brnd._id}>
                            <td>{brnd.name}</td>
                            <td>
                                <Button variant="primary" onClick={() => handleEditClick(brnd)}>
                                    Edit
                                </Button>
                                {' '}
                                <Button variant="danger" onClick={()=>handleDeleteClick(brnd)}>
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>) : (<div>No Brand Available</div>)}
            
            {selectedBrand && (
                <>
                    <EditBrand
                        show={showEditModal}
                        handleClose={handleCloseModal}
                        brand={selectedBrand}
                        handleBrandUpdate={handleBrandUpdate}
                    />
                    <DeleteBrand
                        show={showDeleteModal}
                        handleClose={handleCloseModal}
                        brand={selectedBrand}
                        handleBrandDelete={handleBrandDelete}
                    />
                </>
            )}
        </>
    );
};

export default BrandList;
