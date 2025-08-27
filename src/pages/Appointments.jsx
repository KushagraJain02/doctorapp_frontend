// src/pages/Appointments.jsx
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

const Appointments = () => {
  const location = useLocation();
  const doctorName = location.state?.doctor || "";
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    patientName: "",
    phone: "",
    date: "",
    time: "",
  });

  const [loading, setLoading] = useState(false);
  const [successModal, setSuccessModal] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (
      !doctorName ||
      !formData.patientName.trim() ||
      !formData.phone.trim() ||
      !formData.date ||
      !formData.time
    ) {
      toast.error("⚠️ Please fill all the details!");
      return;
    }

    if (!/^\d{10}$/.test(formData.phone)) {
      toast.error("📞 Phone number must be 10 digits!");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("⚠️ You are not logged in. Please login first.");
        return;
      }

      const API_BASE = import.meta.env.VITE_API_BASE;

      setLoading(true);

      const res = await axios.post(
        `${API_BASE}/appointments`,
        {
          doctorName: doctorName,
          patientName: formData.patientName,
          phone: formData.phone,
          date: formData.date,
          time: formData.time,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (res.data.success) {
        setSuccessModal(true); // ✅ Show modal
        setFormData({
          patientName: "",
          phone: "",
          date: "",
          time: "",
        });
      } else {
        toast.error(`❌ ${res.data.msg || "Failed to book appointment"}`);
      }
    } catch (error) {
      console.error(
        "❌ Appointment error:",
        error.response?.data || error.message
      );
      toast.error(
        error.response?.data?.msg || "❌ Server error! Try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-white shadow-xl rounded-2xl relative">
      <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">
        Book Appointment
      </h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Doctor */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Doctor</label>
          <input
            type="text"
            value={doctorName}
            readOnly
            className="w-full border rounded-lg px-3 py-2 bg-gray-100 cursor-not-allowed"
          />
        </div>

        {/* Patient Name */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Patient Name
          </label>
          <input
            type="text"
            name="patientName"
            value={formData.patientName}
            onChange={handleChange}
            placeholder="Enter your name"
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
          />
        </div>

        {/* Phone Number */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Phone Number
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter 10-digit phone number"
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
          />
        </div>

        {/* Date */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Date</label>
          <input
            type="date"
            name="date"
            min={new Date().toISOString().split("T")[0]} // ✅ Prevent past dates
            value={formData.date}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
          />
        </div>

        {/* Time */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Time</label>
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded-lg transition duration-200 ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          {loading ? "Booking..." : "Confirm Appointment"}
        </button>
      </form>

      {/* ✅ Success Modal */}
      {successModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-[90%] max-w-md text-center">
            <h2 className="text-2xl font-bold text-green-600 mb-4">
              🎉 Appointment Confirmed!
            </h2>
            <p className="text-gray-700 mb-4">
              Your appointment with <b>{doctorName}</b> has been successfully
              booked for <b>{formData.date}</b> at <b>{formData.time}</b>.
            </p>
            <button
              onClick={() => setSuccessModal(false)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Appointments;
