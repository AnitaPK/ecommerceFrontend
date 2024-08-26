import React,{useContext} from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../hooks/ThemeContext';
import ThemeToggle from '../hooks/ThemeToggle';


const Navbar = ({ user, logout, token }) => {
  const {theme, toggleTheme} = useContext(ThemeContext);
  return (
    <nav className={`navbar navbar-expand-lg ${theme === 'light' ? 'navbar-black bg-gray' : 'navbar-light bg-primary' }`}>
      <Link className="navbar-brand" to="/">MyApp</Link>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav ml-auto">
          {user ? (
            <>
              <li className="nav-item">
                <span className="nav-link">Welcome, {user.name}</span>
              </li>
              <li className="nav-item">
                <button className="btn btn-outline-danger" onClick={logout}>Logout</button>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/register">Register</Link>
              </li>
            </>
          )}
        </ul>
        <div className="my-2 my-lg-0">
        <ThemeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
