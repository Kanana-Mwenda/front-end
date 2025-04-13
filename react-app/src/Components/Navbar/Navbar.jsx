import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ isLoggedIn, handleLogout }) => {
  const location = useLocation();
  const showNav = ['/home', '/courses', '/about'].includes(location.pathname);

  if (!showNav) {
    return null;
  }

  return (
    <div>
      <nav className="nav">
        <div className="navigation">
          <Link to="/">
            <div className="nav_header">
              <h2 className="nav_logo">
                <span>Tech</span>Academy
                <br/>
              </h2>
            </div>
          </Link>
          <div className="links">
            <ul>
              <li><Link to="/home">HOME</Link></li>
              <li><Link to="/courses">COURSES</Link></li>
              <li><Link to="/about">ABOUT</Link></li>
              {isLoggedIn && (
                <li>
                  <button onClick={handleLogout}>Logout</button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;