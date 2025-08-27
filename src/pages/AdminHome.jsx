import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
} from "recharts";

const AdminHome = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalAppointments: 0,
    upcomingAppointments: 0,
  });
  const [appointmentsData, setAppointmentsData] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      if (!user?.token) return;

      try {
        const [usersRes, appointmentsRes] = await Promise.all([
          axios.get(`${import.meta.env.VITE_API_BASE}/admin/users`, {
            headers: { Authorization: `Bearer ${user.token}` },
          }),
          axios.get(`${import.meta.env.VITE_API_BASE}/admin/appointments`, {
            headers: { Authorization: `Bearer ${user.token}` },
          }),
        ]);

        const totalUsers = usersRes.data.users.length;
        const allAppointments = appointmentsRes.data.appointments;
        const totalAppointments = allAppointments.length;
        const upcomingAppointments = allAppointments.filter(
          (a) => new Date(a.date) >= new Date()
        ).length;

        setStats({ totalUsers, totalAppointments, upcomingAppointments });

        // Prepare chart data (appointments per day)
        const chartData = allAppointments.map((a) => ({
          date: a.date,
          count: 1,
        }));
        const groupedData = chartData.reduce((acc, item) => {
          const existing = acc.find((d) => d.date === item.date);
          if (existing) existing.count += 1;
          else acc.push({ date: item.date, count: 1 });
          return acc;
        }, []);
        setAppointmentsData(groupedData);
      } catch (err) {
        console.error("Error fetching dashboard stats:", err);
      }
    };

    fetchStats();
  }, [user]);

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-800">Welcome, {user?.name}</h1>
      <p className="text-gray-600 mb-6">
        Admin Dashboard | Doctor Appointment Management
      </p>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg shadow p-6">
          <p className="text-sm font-medium">Total Users</p>
          <p className="text-3xl font-bold mt-2">{stats.totalUsers}</p>
        </div>
        <div className="bg-gradient-to-r from-green-500 to-green-700 text-white rounded-lg shadow p-6">
          <p className="text-sm font-medium">Total Appointments</p>
          <p className="text-3xl font-bold mt-2">{stats.totalAppointments}</p>
        </div>
        <div className="bg-gradient-to-r from-yellow-500 to-yellow-700 text-white rounded-lg shadow p-6">
          <p className="text-sm font-medium">Upcoming Appointments</p>
          <p className="text-3xl font-bold mt-2">{stats.upcomingAppointments}</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Bar chart for appointments per day */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">Appointments Per Day</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={appointmentsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="count" fill="#4f46e5" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Line chart for cumulative appointments */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">Cumulative Appointments</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={appointmentsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="count" stroke="#10b981" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
