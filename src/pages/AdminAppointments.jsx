import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const AdminAppointments = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE}/admin/appointments`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setAppointments(res.data.appointments);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (user?.token) fetchAppointments();
  }, [user]);

  if (loading) return <p>Loading appointments...</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">All Appointments</h2>
      <table className="min-w-full bg-white shadow rounded-lg overflow-hidden">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-3 text-left">Patient</th>
            <th className="p-3 text-left">Doctor</th>
            <th className="p-3 text-left">Date</th>
            <th className="p-3 text-left">Time</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((a) => (
            <tr key={a._id} className="border-b">
              <td className="p-3">{a.user?.name || "N/A"}</td>
              <td className="p-3">{a.doctorName}</td>
              <td className="p-3">{a.date}</td>
              <td className="p-3">{a.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminAppointments;
