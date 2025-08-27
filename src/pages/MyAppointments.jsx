import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, Phone, User, Stethoscope } from "lucide-react";
import "react-toastify/dist/ReactToastify.css";

const MyAppointments = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedApp, setSelectedApp] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          toast.error("⚠️ You are not logged in");
          setLoading(false);
          return;
        }

        const API_BASE = import.meta.env.VITE_API_BASE;
        const res = await axios.get(`${API_BASE}/appointments`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.data.success) {
          setAppointments(res.data.appointments);
        } else {
          toast.error("❌ Failed to load appointments");
        }
      } catch (err) {
        console.error(
          "❌ Appointments error:",
          err.response?.data || err.message
        );
        toast.error("❌ Failed to load appointments");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [user]);

  const openModal = (appointment) => {
    setSelectedApp(appointment);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedApp(null);
    setIsModalOpen(false);
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");
      const API_BASE = import.meta.env.VITE_API_BASE;
      await axios.put(
        `${API_BASE}/appointments/${selectedApp._id}`,
        selectedApp,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("✅ Appointment updated");
      setAppointments((prev) =>
        prev.map((a) => (a._id === selectedApp._id ? selectedApp : a))
      );
      closeModal();
    } catch (err) {
      toast.error("❌ Update failed");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this appointment?"))
      return;

    try {
      const token = localStorage.getItem("token");
      const API_BASE = import.meta.env.VITE_API_BASE;
      await axios.delete(`${API_BASE}/appointments/${selectedApp._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("🗑️ Appointment deleted");
      setAppointments((prev) => prev.filter((a) => a._id !== selectedApp._id));
      closeModal();
    } catch (err) {
      toast.error("❌ Delete failed");
    }
  };

  const formatDate = (dateStr) => {
    try {
      return new Date(dateStr).toLocaleDateString("en-IN", {
        weekday: "short",
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  if (loading) {
    return (
      <div className="p-6 max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-600 mb-6">
          My Appointments
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="animate-pulse bg-gray-200 h-40 rounded-xl"
            ></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">My Appointments</h1>

      {appointments.length === 0 ? (
        <p className="text-gray-600">You have no recent appointments.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {appointments.map((app) => (
            <motion.div
              key={app._id}
              whileHover={{ scale: 1.02 }}
              className="bg-white shadow-lg rounded-xl p-5 border border-gray-100"
            >
              <h2 className="text-xl font-semibold flex items-center gap-2 mb-2">
                <Stethoscope className="w-5 h-5 text-blue-500" />
                {app.doctorName}
              </h2>
              <p className="text-gray-700 flex items-center gap-2">
                <User className="w-4 h-4 text-gray-500" /> {app.patientName}
              </p>
              <p className="text-gray-700 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-500" />{" "}
                {formatDate(app.date)}
              </p>
              <p className="text-gray-700 flex items-center gap-2">
                <Clock className="w-4 h-4 text-gray-500" /> {app.time}
              </p>
              <p className="text-gray-700 flex items-center gap-2">
                <Phone className="w-4 h-4 text-gray-500" /> {app.phone}
              </p>

              <button
                onClick={() => openModal(app)}
                className="mt-4 w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
              >
                Manage
              </button>
            </motion.div>
          ))}
        </div>
      )}

      {/* ✅ Modal */}
      <AnimatePresence>
        {isModalOpen && selectedApp && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white w-full max-w-md p-6 rounded-xl shadow-lg relative"
            >
              <h2 className="text-2xl font-bold mb-4 text-blue-600">
                Edit Appointment
              </h2>

              <div className="space-y-3">
                <input
                  type="text"
                  value={selectedApp.doctorName}
                  onChange={(e) =>
                    setSelectedApp({
                      ...selectedApp,
                      doctorName: e.target.value,
                    })
                  }
                  className="w-full p-2 border rounded-lg"
                  placeholder="Doctor Name"
                />
                <input
                  type="text"
                  value={selectedApp.patientName}
                  onChange={(e) =>
                    setSelectedApp({
                      ...selectedApp,
                      patientName: e.target.value,
                    })
                  }
                  className="w-full p-2 border rounded-lg"
                  placeholder="Patient Name"
                />
                <input
                  type="date"
                  value={selectedApp.date}
                  onChange={(e) =>
                    setSelectedApp({ ...selectedApp, date: e.target.value })
                  }
                  className="w-full p-2 border rounded-lg"
                />
                <input
                  type="time"
                  value={selectedApp.time}
                  onChange={(e) =>
                    setSelectedApp({ ...selectedApp, time: e.target.value })
                  }
                  className="w-full p-2 border rounded-lg"
                />
                <input
                  type="text"
                  value={selectedApp.phone}
                  onChange={(e) =>
                    setSelectedApp({ ...selectedApp, phone: e.target.value })
                  }
                  className="w-full p-2 border rounded-lg"
                  placeholder="Phone"
                />
              </div>

              <div className="flex justify-between mt-6">
                <button
                  onClick={handleUpdate}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                >
                  Update
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  Delete
                </button>
                <button
                  onClick={closeModal}
                  className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default MyAppointments;
