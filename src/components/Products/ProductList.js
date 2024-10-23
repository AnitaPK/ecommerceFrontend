import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import {
  Table,
  Button,
  Badge,
  Dropdown,
  Form,
  InputGroup,
  OverlayTrigger,
  Tooltip,
  DropdownButton,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { CgSearch } from "react-icons/cg";
import { FiFilter } from "react-icons/fi";
import { UserContext } from "../../context/userContext";
import ProductCardForUser from "./ProductCardForUser";

const ProductList = () => {
  const { user } = useContext(UserContext);

  const [productCount, setProductCount] = useState();
  const [search, setSearch] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [filteredProduct, setFilteredProduct] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        "http://localhost:5000/api/products/getAllProduct",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      setProducts(response.data);
      setFilteredProduct(response.data);
    } catch (err) {
      setError("Error fetching products");
    }
  };

  useEffect(() => {
    const fetchProductCount = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/products/getCountProducts",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setProductCount(response.data.count);
      } catch (error) {
        console.error("Error fetching product count:", error);
      }
    };

    const fetchCategories = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(
          "http://localhost:5000/api/categories/getAllCategory",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCategories(response.data.categories);
      } catch (err) {
        setError("Error fetching categories");
      }
    };

    fetchProductCount();
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, []);

  const filterProducts = () => {
    const filtered = products.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesCategory = selectedCategory
        ? product.category.name === selectedCategory
        : true;
      return matchesSearch && matchesCategory;
    });
    setFilteredProduct(filtered);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    filterProducts();
  };

  const handleCategorySelect = (categoryName) => {
    console.log(categoryName);
    setSelectedCategory(categoryName); 
    filterProducts(); 
    setFilterOpen(false);
  };

  return (
    <div className="container">
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Products <Badge bg="secondary">{productCount || 0}</Badge>
          </Link>
          <div className="d-flex align-items-center">
            <InputGroup className="me-2">
              <Form.Control
                type="text"
                placeholder="Search..."
                value={search}
                onChange={handleSearch}
              />
              <InputGroup.Text>
                <CgSearch />
              </InputGroup.Text>
            </InputGroup>
            <DropdownButton
              id="dropdown-basic-button"
              title={<FiFilter size={24} />}
              show={filterOpen}
              onClick={() => setFilterOpen(!filterOpen)}
              variant="link"
              className="me-2"
            >
              <Dropdown.ItemText>Filter by Category</Dropdown.ItemText>
              {error && (
                <Dropdown.ItemText className="text-danger">
                  {error}
                </Dropdown.ItemText>
              )}

              {categories.map((category) => (
                <Dropdown.Item
                  key={category._id}
                  onClick={() => handleCategorySelect(category.name)}
                >
                  {category.name}
                </Dropdown.Item>
              ))}
              <Dropdown.Item onClick={() => handleCategorySelect("")}>
                All Categories
              </Dropdown.Item>
            </DropdownButton>
          </div>
        </div>
      </nav>
      <h2>Product List</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {filteredProduct.length > 0 ? (
        <div className="row">
          {filteredProduct.map((product) => (
            <div
              key={product._id}
              className="col-12 col-sm-6 col-md-4 col-lg-3"
            >
              <ProductCard
                product={product}
                onProductUpdated={fetchProducts}
                onProductDeleted={fetchProducts}
              />
            </div>
          ))}
        </div>
      ) : (
        <div>Products are not available</div>
      )}
    </div>
  );
};

export default ProductList;
