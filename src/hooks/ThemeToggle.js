import React, { useState, useContext } from 'react';
import { CgToggleSquare } from "react-icons/cg";
import { CgToggleSquareOff } from "react-icons/cg";
import { BiSolidToggleLeft } from "react-icons/bi";
import { BiToggleRight } from "react-icons/bi";
import './ThemeToggle.css';
import { ThemeContext } from "./ThemeContext";

const ThemeToggle = () => {
  const {theme, toggleTheme} =useContext(ThemeContext);
  console.log(theme);

  return (
    <span className="theme-toggle">
      <button onClick={toggleTheme} className="toggle-button">
        {theme === 'light' ?  <BiToggleRight size={34} /> : <BiSolidToggleLeft size={34} /> }
      </button>
    </span>
  );
};

export default ThemeToggle;
