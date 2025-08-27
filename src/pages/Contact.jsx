import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Mail, Phone, MapPin } from "lucide-react"; // modern icons

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      toast.error("⚠️ Please fill in all fields!");
      return;
    }

    if (!validateEmail(formData.email)) {
      toast.error("❌ Please enter a valid email address!");
      return;
    }

    // ✅ Simulate sending message
    toast.success("✅ Message sent successfully!");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="p-8 max-w-4xl mx-auto bg-gradient-to-r from-blue-50 to-white shadow-xl rounded-2xl">
      <h1 className="text-4xl font-bold text-blue-600 mb-6 text-center">
        Contact Us
      </h1>

      <p className="text-gray-600 text-center mb-8 text-lg">
        Have questions, feedback, or need support? Fill out the form below and
        our team will get back to you shortly.
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Name */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 transition"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 transition"
          />
        </div>

        {/* Message */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Message
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="4"
            placeholder="Write your message..."
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 transition"
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 hover:shadow-md transition transform hover:scale-105"
        >
          Send Message
        </button>
      </form>

      {/* Contact Info Section */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        <div className="flex flex-col items-center bg-blue-50 p-5 rounded-lg shadow-sm">
          <MapPin className="text-blue-600 w-8 h-8 mb-2" />
          <h3 className="font-semibold text-lg">Address</h3>
          <p className="text-gray-600">123 Health Street, New Delhi, India</p>
        </div>

        <div className="flex flex-col items-center bg-blue-50 p-5 rounded-lg shadow-sm">
          <Phone className="text-blue-600 w-8 h-8 mb-2" />
          <h3 className="font-semibold text-lg">Phone</h3>
          <p className="text-gray-600">+91 9876543210</p>
        </div>

        <div className="flex flex-col items-center bg-blue-50 p-5 rounded-lg shadow-sm">
          <Mail className="text-blue-600 w-8 h-8 mb-2" />
          <h3 className="font-semibold text-lg">Email</h3>
          <p className="text-gray-600">support@medicare.com</p>
        </div>
      </div>

      {/* Toast Notifications */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Contact;
