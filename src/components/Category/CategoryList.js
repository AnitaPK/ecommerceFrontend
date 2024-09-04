import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditCategory from './EditCategory';
import { Button, Table } from 'react-bootstrap';
import DeleteCategory from './DeleteCategory ';

const CategoryList = () => {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const token = localStorage.getItem('token');


    const fetchCategories = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/categories/getAllCategory',
                {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  }
            );
            setCategories(response.data.categories);
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

    const handleEditClick = (category) => {
        setSelectedCategory(category);
        setShowEditModal(true);
    };

 
    const handleDeleteClick = (category) => {
        setSelectedCategory(category);
        setShowDeleteModal(true);
    };

    const handleCloseModal = () => {
        setShowEditModal(false);
        setShowDeleteModal(false);
        setSelectedCategory(null);
    };

    const handleCategoryUpdate = (updatedCategory) => {
        setCategories(categories.map(cat => (cat._id === updatedCategory._id ? updatedCategory : cat)));
        handleCloseModal();
    };


    const handleCategoryDelete = (deletedCategoryId) => {
        setCategories(categories.filter(cat => cat._id !== deletedCategoryId));
        fetchCategories();
        handleCloseModal();
    };

    return (
        <>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Category Name</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map((category) => (
                        <tr key={category._id}>
                            <td>{category.name}</td>
                            <td>
                                <Button variant="primary" onClick={() => handleEditClick(category)}>
                                    Edit
                                </Button>
                                {' '}
                                <Button variant="danger" onClick={()=>handleDeleteClick(category)}>
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            {selectedCategory && (
                <>
                    <EditCategory
                        show={showEditModal}
                        handleClose={handleCloseModal}
                        category={selectedCategory}
                        handleCategoryUpdate={handleCategoryUpdate}
                    />
                    <DeleteCategory
                        show={showDeleteModal}
                        handleClose={handleCloseModal}
                        category={selectedCategory}
                        handleCategoryDelete={handleCategoryDelete}
                    />
                </>
            )}
        </>
    );
};

export default CategoryList;
