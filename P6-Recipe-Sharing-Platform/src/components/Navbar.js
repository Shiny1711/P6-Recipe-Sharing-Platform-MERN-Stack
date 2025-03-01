import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"; // Ensure this file exists

const Navbar = ({ userSession, onLogout }) => {
  return (
    <nav className="navbar">
      <h1 className="logo">Recipe Nest</h1>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/my-recipes">My Recipes</Link>
        <Link to="/all-recipes">All Recipes</Link>
        {userSession ? (
          <>
            <span className="user">Welcome, {userSession}</span>
            <button className="logout-btn" onClick={onLogout}>Logout</button>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
