import React from 'react';
import { NavLink, Link } from 'react-router-dom';



const Navbar = () => {
  return (
    <div className='bg'>
    <nav className="navbar navbar-expand-lg navbar-light">
      <div className="container py-2">
        <Link className="navbar-brand text-white" to="/">
          Guest Room Booking
          <p className="ft-1 fs-3"><span>Your Gateway to </span>Exceptional Stays</p>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse align-middle" id="navbarNav">
          <ul className="navbar-nav ms-auto nav_ul align-items-center">
            <li className="nav-item mx-3">
              <NavLink
                to="/login"
                className="btn1 mx-2 text-decoration-none"
                activeClassName="active-link"
                exact
              >
                User Login
              </NavLink>
            </li>
            <li className="nav-item mx-3">
              <NavLink
                to="/Owner"
                className="btn1 mx-2 text-decoration-none"
                activeClassName="active-link"
                exact
              >
                Owner Login
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    </div>
  );
};

export default Navbar;
