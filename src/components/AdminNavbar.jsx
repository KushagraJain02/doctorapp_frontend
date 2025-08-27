import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AdminNavbar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/auth");
  };

  return (
    <div className="w-64 h-screen bg-gray-900 text-white p-6 flex flex-col justify-between">
      <div>
        <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>
        <nav className="flex flex-col gap-4">
          <NavLink
            to="/admin"
            end
            className={({ isActive }) =>
              `p-2 rounded ${isActive ? "bg-gray-700" : "hover:bg-gray-800"}`
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/admin/users"
            className={({ isActive }) =>
              `p-2 rounded ${isActive ? "bg-gray-700" : "hover:bg-gray-800"}`
            }
          >
            Users
          </NavLink>
          <NavLink
            to="/admin/appointments"
            className={({ isActive }) =>
              `p-2 rounded ${isActive ? "bg-gray-700" : "hover:bg-gray-800"}`
            }
          >
            Appointments
          </NavLink>
        </nav>
      </div>

      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600 p-2 rounded mt-4"
      >
        Logout
      </button>
    </div>
  );
};

export default AdminNavbar;
