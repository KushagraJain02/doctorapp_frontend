import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./components/Navbar";
import AdminDashboard from "./pages/AdminDashboard";
import AdminHome from "./pages/AdminHome";
import AdminUsers from "./pages/AdminUsers";
import AdminAppointments from "./pages/AdminAppointments";

import Home from "./pages/Home";
import Doctors from "./pages/Doctors";
import Appointments from "./pages/Appointments";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Auth from "./pages/Auth";
import MyAppointments from "./pages/MyAppointments";

import { useAuth } from "./context/AuthContext";

// Admin route protection
const AdminRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/auth" replace />;
  if (!user.isAdmin) return <Navigate to="/" replace />;
  return children;
};

const App = () => {
  const location = useLocation();

  return (
    <>
      {!location.pathname.startsWith("/admin") && <Navbar />}

      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/my-appointments" element={<MyAppointments />} />

        {/* Admin routes */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        >
          <Route index element={<AdminHome />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="appointments" element={<AdminAppointments />} />
        </Route>

        <Route path="*" element={<p>Page not found</p>} />
      </Routes>

      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default App;
