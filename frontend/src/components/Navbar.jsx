import React from 'react';
import { NavLink } from 'react-router-dom';

/**
 * Task 2: Navigation Component
 * Provides client-side navigation links to HomePage (/), DoctorsPage (/doctors), and BookingPage (/booking)
 * Uses React Router NavLink to switch routes without full page reload.
 */
function Navbar() {
  return (
    <header className="navbar">
      <NavLink to="/" className="nav-brand">
        MedCare <span>Plus</span>
      </NavLink>
      <nav>
        <ul className="nav-links">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/doctors"
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            >
              Doctors
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/booking"
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            >
              Book Appointment
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
