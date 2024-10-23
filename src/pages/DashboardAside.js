import React, { useContext } from "react";
import { UserContext } from "../context/userContext";
import { Routes, Route, Link } from "react-router-dom";
import "./DashboardAside.css";
import ProductList from "../components/Products/ProductList";
import AddCategory from "../components/Category/AddCategory";
import AddProduct from "../components/Products/AddProduct";
import CategoryList from "../components/Category/CategoryList";
import BrandList from "../components/Brand/BrandList";
import AddBrand from "../components/Brand/AddBrand";

const DashboardAside = () => {
  const { user, setUser } = useContext(UserContext);
// console.log(user);
  return (
    <>
      <div className="wrapper">
      <div className="sidebar">
          <ul className="nav">
            <li>
              <Link to="products">Products</Link>
            </li>
            <hr></hr>
            <li>
              <Link to="addProduct">Add Product</Link>
            </li>
            <hr></hr>
            <li>
              <Link to="category">Category</Link>
            </li>
            <hr></hr>
            <li>
              <Link to="addCategory">AddCategory</Link>
            </li>
            <hr></hr>
            <li>
              <Link to="brand">Brand</Link>
            </li>
            <hr></hr>
            <li>
              <Link to="addBrand">AddBrand</Link>
            </li>
   
          </ul>
       </div>

        <div className="main-content">
          <Routes>
            <Route path="products" element={<ProductList/>} />
            <Route path="category" element={<CategoryList />} />
            <Route path="cart" element={<h1>cart</h1>} />
            <Route path="addProduct" element={<AddProduct />} />
            <Route path="addCategory" element={<AddCategory />} />
            <Route path="brand" element={<BrandList />} />
            <Route path="addBrand" element={<AddBrand />} />


            <Route
              path="/" element={<div>Select a link from the sidebar</div>}
            />
            <Route path="showProducts" element={<ProductList/>} />

          </Routes>

        </div>
      </div>
    </>
  );
};

export default DashboardAside;
