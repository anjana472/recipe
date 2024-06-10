import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/all">All Items</Link>
        </li>
        <li>
          <Link to="/favourite">Favourite</Link>
        </li>
        <li>
          <Link to="/country">Country</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
