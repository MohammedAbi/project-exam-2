import { useState, useRef, useEffect } from "react";
import {
  FaBars,
  FaTimes,
  FaSignOutAlt,
  FaUser,
  FaUserCog,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import {
  isLoggedIn,
  clearAuthData,
  getUserData,
} from "../config/services/authStorage";
import { toast } from "react-toastify";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const loggedIn = isLoggedIn();
  const userData = getUserData();

  const dropdownRef = useRef(null);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => {
    setIsOpen(false);
    setIsDropdownOpen(false);
  };

  const handleLogout = () => {
    clearAuthData();
    toast.success("Logged out successfully!");
    navigate("/login");
    closeMenu();
  };

  // Close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-purple-600 text-white px-6 py-4 md:py-8 sticky top-0 z-50 shadow-md h-16 md:h-24 ">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <Link to="/" onClick={closeMenu} className="font-bold text-xl">
          Holidaze
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          {/* Navigation Links */}
          <div className="flex space-x-6 font-medium">
            <Link
              to="/"
              className="hover:underline underline-offset-8 hover:text-purple-300 transition"
            >
              Home
            </Link>
            <Link
              to="/contact"
              className="hover:underline underline-offset-8 hover:text-purple-300 transition"
            >
              Contact
            </Link>
          </div>

          {/* Auth Section */}
          <div className="flex items-center gap-4 ml-6">
            {!loggedIn ? (
              <>
                <Link
                  to="/login"
                  className="hover:underline underline-offset-8 hover:text-purple-300 transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="hover:underline underline-offset-8 hover:text-purple-300 transition"
                >
                  Register
                </Link>
              </>
            ) : (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2 focus:outline-none"
                >
                  <img
                    src={userData?.avatar?.url || "/default-avatar.png"}
                    alt="Profile"
                    className="w-8 h-8 rounded-full border-2 border-white hover:border-purple-300 transition"
                  />
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute top-12 right-0 mt-4 w-48 bg-gray-800 rounded-md shadow-lg py-1 z-50 border border-gray-700">
                    <div className="px-4 py-3 border-b border-gray-700">
                      <p className="text-sm font-medium text-white">
                        {userData?.name || "My Account"}
                      </p>
                      <p className="text-xs text-gray-300 truncate">
                        {userData?.email}
                      </p>
                    </div>
                    <Link
                      to="/profile"
                      onClick={() => setIsDropdownOpen(false)}
                      className="flex items-center px-4 py-2 text-sm text-gray-200 hover:bg-gray-700 transition-colors"
                    >
                      <FaUser className="mr-2 text-purple-400" />
                      Profile
                    </Link>
                    <Link
                      to="/admin"
                      onClick={() => setIsDropdownOpen(false)}
                      className="flex items-center px-4 py-2 text-sm text-gray-200 hover:bg-gray-700 transition-colors"
                    >
                      <FaUserCog className="mr-2 text-purple-400" />
                      Admin
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-200 hover:bg-gray-700 transition-colors border-t border-gray-700"
                    >
                      <FaSignOutAlt className="mr-2 text-purple-400" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl focus:outline-none"
          onClick={toggleMenu}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed top-16 left-0 right-0 flex flex-col items-start gap-4 font-medium bg-gray-800 rounded-b-lg px-6 py-4 transform transition-all duration-300 ease-in-out z-50 ${
          isOpen
            ? "max-h-96 opacity-100 translate-y-0"
            : "max-h-0 opacity-0 -translate-y-4 overflow-hidden"
        }`}
      >
        <Link
          onClick={closeMenu}
          className="px-4 py-2 w-full hover:underline underline-offset-8 hover:text-purple-300 transition"
          to="/"
        >
          Home
        </Link>
        <Link
          onClick={closeMenu}
          className="px-4 py-2 w-full hover:underline underline-offset-8 hover:text-purple-300 transition"
          to="/contact"
        >
          Contact
        </Link>

        {loggedIn ? (
          <>
            <div className="flex items-center gap-3 px-4 py-2 w-full">
              <img
                src={userData?.avatar?.url || "/default-avatar.png"}
                alt="Profile"
                className="w-8 h-8 rounded-full border-2 border-white"
              />
              <div>
                <p className="font-medium">{userData?.name || "My Account"}</p>
                <p className="text-sm text-gray-300">{userData?.email}</p>
              </div>
            </div>
            <Link
              onClick={closeMenu}
              className="flex items-center px-4 py-2 w-full text-gray-200 hover:bg-gray-700 rounded-md transition-colors"
              to="/profile"
            >
              <FaUser className="mr-3 text-purple-400" />
              Profile
            </Link>
            <Link
              onClick={closeMenu}
              className="flex items-center px-4 py-2 w-full text-gray-200 hover:bg-gray-700 rounded-md transition-colors"
              to="/admin"
            >
              <FaUserCog className="mr-3 text-purple-400" />
              Admin
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center px-4 py-2 w-full text-gray-200 hover:bg-gray-700 rounded-md transition-colors"
            >
              <FaSignOutAlt className="mr-3 text-purple-400" />
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              onClick={closeMenu}
              className="px-4 py-2 w-full hover:underline underline-offset-8 hover:text-purple-300 transition"
              to="/login"
            >
              Login
            </Link>
            <Link
              onClick={closeMenu}
              className="px-4 py-2 w-full hover:underline underline-offset-8 hover:text-purple-300 transition"
              to="/register"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
