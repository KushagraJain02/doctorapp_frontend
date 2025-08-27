import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const API_BASE = import.meta.env.VITE_API_BASE; // ✅ from .env

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Basic email validation
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("⚠️ Please fill all fields!");
      return;
    }

    if (!isValidEmail(formData.email)) {
      toast.error("⚠️ Please enter a valid email!");
      return;
    }

    try {
      setLoading(true);
      console.log("➡️ Sending login data:", formData);

      const res = await axios.post(`${API_BASE}/auth/login`, formData, {
        headers: { "Content-Type": "application/json" },
      });

      console.log("✅ Login response:", res.data);

      if (res.data.success) {
        // ✅ Save user + token in AuthContext
        login(res.data.user, res.data.token);

        toast.success("✅ Login successful!");

        // Redirect based on role
        setTimeout(() => {
          if (res.data.user.isAdmin) {
            navigate("/admin");
          } else {
            navigate("/");
          }
        }, 1000);
      } else {
        toast.error(res.data.message || "Invalid credentials");
      }
    } catch (err) {
      console.error("❌ Login error:", err.response?.data || err.message);
      toast.error(
        err.response?.data?.message || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-xl p-6">
      <h1 className="text-2xl font-bold text-center text-blue-600 mb-6">
        Login to Your Account
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email */}
        <div>
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
          />
        </div>

        {/* Password */}
        <div>
          <input
            type="password"
            name="password"
            placeholder="Your Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded-lg text-white transition 
            ${
              loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }
          `}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      {/* Toasts */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Login;
