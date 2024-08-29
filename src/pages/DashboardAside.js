import React, { useContext } from "react";
import { UserContext } from "../context/userContext";
import { Routes, Route, Link } from "react-router-dom";
import "./DashboardAside.css";
import ProductList from "../components/Products/ProductList";
import AddCategory from "../components/Category/AddCategory";
import AddProduct from "../components/Products/AddProduct";

const DashboardAside = () => {
  const { user, setUser } = useContext(UserContext);

  return (
    <>
      <div className="wrapper">
      <div className="sidebar">
        {user.role == "admin" ? (
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
   
          </ul>
        ) : (
          <ul className="nav">
            <li>
              <Link to="products">Products</Link>
            </li>
            <hr></hr>
            <li>
              <Link to="category">Category</Link>
            </li>
            <hr></hr>
            <hr></hr>
            <li>
              <br></br><Link to="cart">cart</Link>
            </li>
          
          </ul>
        )}

       </div>

        <div className="main-content">
          <Routes>
            <Route path="products" element={<ProductList/>} />
            <Route path="category" element={<h1>Category</h1>} />
            <Route path="cart" element={<h1>cart</h1>} />
            <Route path="addProduct" element={<AddProduct />} />
            <Route path="addCategory" element={<AddCategory />} />

            <Route
              path="/"
              element={<div>Select a link from the sidebar</div>}
            />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default DashboardAside;
