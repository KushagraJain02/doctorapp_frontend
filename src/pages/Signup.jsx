import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

const Signup = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const API_BASE = import.meta.env.VITE_API_BASE; // ✅ from .env

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password) {
      setError("⚠️ Please fill all fields");
      return;
    }

    try {
      setLoading(true);
      console.log("➡️ Sending signup data:", formData);

      const res = await axios.post(`${API_BASE}/auth/signup`, formData, {
        headers: { "Content-Type": "application/json" },
      });

      console.log("✅ Signup response:", res.data);

      if (res.data.success) {
        // ✅ Store both user + token in context
        login(res.data.user, res.data.token);

        // ✅ Persist in localStorage
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));

        navigate("/");
      } else {
        setError(res.data.message || "Signup failed");
      }
    } catch (err) {
      console.error("❌ Signup error:", err.response?.data || err.message);
      setError(
        err.response?.data?.message || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="text-red-600 font-medium">{error}</div>}

      <input
        type="text"
        name="name"
        placeholder="Full Name"
        value={formData.name}
        onChange={handleChange}
        className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
      >
        {loading ? "Signing Up..." : "Sign Up"}
      </button>
    </form>
  );
};

export default Signup;
