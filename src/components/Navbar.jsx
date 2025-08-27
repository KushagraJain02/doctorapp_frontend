// src/components/Navbar.jsx
import React, { useState } from "react";
import { Menu, X, Stethoscope, Calendar } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Doctors", path: "/doctors" },
    { name: "Appointments", path: "/appointments" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-3 text-white font-bold text-3xl">
          <Stethoscope className="w-7 h-7" />
          <Link to="/" className="hover:text-gray-200">
            DocCare
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`text-white/90 font-medium px-3 py-1 rounded-md transition hover:bg-white/20 hover:text-white ${
                location.pathname === link.path
                  ? "text-white font-semibold bg-white/20"
                  : ""
              }`}
            >
              {link.name}
            </Link>
          ))}

          {user && (
            <Link
              to="/my-appointments"
              className={`flex items-center gap-1 text-white/90 font-medium px-3 py-1 rounded-md transition hover:bg-white/20 hover:text-white ${
                location.pathname === "/my-appointments"
                  ? "text-white font-semibold bg-white/20"
                  : ""
              }`}
            >
              <Calendar className="w-4 h-4" />
              My Appointments
            </Link>
          )}

          {!user ? (
            <Link
              to="/auth"
              className="bg-white text-blue-600 px-6 py-2 rounded-lg hover:bg-gray-100 hover:scale-105 transition transform shadow-md font-semibold"
            >
              Login / Sign Up
            </Link>
          ) : (
            <div className="flex items-center gap-4">
              <span className="text-white font-medium">Hi, {user.name}</span>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 hover:scale-105 transition transform shadow-md"
              >
                Logout
              </button>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="p-2 rounded-md hover:bg-white/20 transition"
          >
            {isOpen ? (
              <X className="w-6 h-6 text-white" />
            ) : (
              <Menu className="w-6 h-6 text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 shadow-xl rounded-b-xl flex flex-col items-start px-6 py-4 gap-4 animate-slide-down">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="w-full text-white/90 font-medium hover:text-white hover:bg-white/20 transition py-2 px-3 rounded-md"
              onClick={toggleMenu}
            >
              {link.name}
            </Link>
          ))}

          {user && (
            <Link
              to="/my-appointments"
              className="flex items-center gap-1 text-white/90 hover:text-white hover:bg-white/20 transition py-2 px-3 rounded-md w-full"
              onClick={toggleMenu}
            >
              <Calendar className="w-4 h-4" />
              My Appointments
            </Link>
          )}

          {!user ? (
            <Link
              to="/auth"
              className="bg-white text-blue-600 px-4 py-2 rounded-lg w-full text-center hover:bg-gray-100 hover:scale-105 transition transform shadow-md font-semibold"
              onClick={toggleMenu}
            >
              Login / Sign Up
            </Link>
          ) : (
            <div className="flex flex-col w-full gap-2">
              <span className="text-white font-medium text-center">
                Hi, {user.name}
              </span>
              <button
                onClick={() => {
                  handleLogout();
                  toggleMenu();
                }}
                className="bg-red-500 text-white px-4 py-2 rounded-lg w-full hover:bg-red-600 hover:scale-105 transition transform shadow-md"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
