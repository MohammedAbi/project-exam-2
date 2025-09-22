import { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="bg-purple-600 text-white px-6 py-4 sticky top-0 z-50 shadow-md h-16">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="font-bold text-xl" onClick={closeMenu}>
          Holidaze
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 font-medium">
          <Link to="/">Home</Link>
          <Link to="/bookings">My Bookings</Link>
          <Link to="/profile">Profile</Link>
          <Link to="/admin">Admin</Link>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl focus:outline-none"
          onClick={toggleMenu}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden flex flex-col items-start gap-4 mt-4 font-medium bg-blue-700 rounded-lg px-6 py-4 transition-all duration-300 ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <Link to="/" onClick={closeMenu}>
          Home
        </Link>
        <Link to="/bookings" onClick={closeMenu}>
          My Bookings
        </Link>
        <Link to="/profile" onClick={closeMenu}>
          Profile
        </Link>
        <Link to="/admin" onClick={closeMenu}>
          Admin
        </Link>
        <Link to="/login" onClick={closeMenu}>
          Login
        </Link>
        <Link to="/register" onClick={closeMenu}>
          Register
        </Link>
      </div>
    </nav>
  );
}
