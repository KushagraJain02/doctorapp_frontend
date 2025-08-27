import React, { useState } from "react";
import { Link } from "react-router-dom";

// ✅ Doctors Data
const doctors = [
  {
    name: "Dr. Aarav Sharma",
    specialty: "Cardiologist",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    description:
      "Dr. Aarav Sharma is a leading cardiologist with 15 years of experience in heart surgeries and preventive cardiology. He is known for his patient-centric approach and advanced treatments.",
  },
  {
    name: "Dr. Meera Kapoor",
    specialty: "Dermatologist",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    description:
      "Dr. Meera Kapoor specializes in skin disorders, cosmetic dermatology, and laser treatments. She has been serving patients for over 10 years with excellent care.",
  },
  {
    name: "Dr. Rohan Gupta",
    specialty: "Orthopedic",
    image: "https://randomuser.me/api/portraits/men/45.jpg",
    description:
      "Dr. Rohan Gupta is an orthopedic surgeon focusing on joint replacements, sports injuries, and rehabilitation. Known for his precision and compassionate care.",
  },
  {
    name: "Dr. Neha Verma",
    specialty: "Pediatrician",
    image: "https://randomuser.me/api/portraits/women/50.jpg",
    description:
      "Dr. Neha Verma has 12 years of experience caring for infants, children, and adolescents. She emphasizes preventive care and healthy growth for children.",
  },
  {
    name: "Dr. Sameer Joshi",
    specialty: "Neurologist",
    image: "https://randomuser.me/api/portraits/men/22.jpg",
    description:
      "Dr. Sameer Joshi specializes in neurology, focusing on brain and nerve disorders. He has 14 years of experience and is known for his diagnostic precision.",
  },
  {
    name: "Dr. Priya Nair",
    specialty: "Gynecologist",
    image: "https://randomuser.me/api/portraits/women/33.jpg",
    description:
      "Dr. Priya Nair is a gynecologist with 10 years of experience in women's health, prenatal care, and reproductive medicine.",
  },
  {
    name: "Dr. Arjun Mehta",
    specialty: "ENT Specialist",
    image: "https://randomuser.me/api/portraits/men/55.jpg",
    description:
      "Dr. Arjun Mehta specializes in ear, nose, and throat disorders. He has successfully treated numerous cases with a holistic approach.",
  },
  {
    name: "Dr. Kavya Reddy",
    specialty: "Psychiatrist",
    image: "https://randomuser.me/api/portraits/women/55.jpg",
    description:
      "Dr. Kavya Reddy focuses on mental health, including anxiety, depression, and stress management. Known for her compassionate therapy sessions.",
  },
  {
    name: "Dr. Vikram Singh",
    specialty: "General Surgeon",
    image: "https://randomuser.me/api/portraits/men/60.jpg",
    description:
      "Dr. Vikram Singh is an experienced general surgeon performing complex surgeries with minimal risk and advanced techniques.",
  },
  {
    name: "Dr. Ananya Sharma",
    specialty: "Ophthalmologist",
    image: "https://randomuser.me/api/portraits/women/60.jpg",
    description:
      "Dr. Ananya Sharma is a skilled ophthalmologist focusing on vision care, eye surgeries, and preventive ophthalmology.",
  },
  {
    name: "Dr. Ritesh Kapoor",
    specialty: "Dentist",
    image: "https://randomuser.me/api/portraits/men/65.jpg",
    description:
      "Dr. Ritesh Kapoor specializes in dental care, cosmetic dentistry, and orthodontics. He has 12 years of experience and a friendly approach.",
  },
  {
    name: "Dr. Sneha Iyer",
    specialty: "Nutritionist",
    image: "https://randomuser.me/api/portraits/women/66.jpg",
    description:
      "Dr. Sneha Iyer focuses on diet, nutrition, and wellness planning. She helps patients achieve a healthy lifestyle with personalized guidance.",
  },
];

// ✅ Specialty Colors
const specialtyColors = {
  Cardiologist: "bg-red-200 text-red-800",
  Dermatologist: "bg-yellow-200 text-yellow-800",
  Orthopedic: "bg-green-200 text-green-800",
  Pediatrician: "bg-blue-200 text-blue-800",
  Neurologist: "bg-purple-200 text-purple-800",
  Gynecologist: "bg-pink-200 text-pink-800",
  "ENT Specialist": "bg-orange-200 text-orange-800",
  Psychiatrist: "bg-indigo-200 text-indigo-800",
  "General Surgeon": "bg-gray-200 text-gray-800",
  Ophthalmologist: "bg-teal-200 text-teal-800",
  Dentist: "bg-rose-200 text-rose-800",
  Nutritionist: "bg-lime-200 text-lime-800",
};

const Doctors = () => {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  // ✅ Filter doctors by search + specialty
  const filteredDoctors = doctors.filter(
    (doc) =>
      (filter === "All" || doc.specialty === filter) &&
      doc.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <h1 className="text-4xl font-bold text-blue-600 mb-6 text-center">
        Meet Our Expert Doctors
      </h1>
      <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
        Our team of certified specialists is here to provide world-class
        healthcare services tailored to your needs.
      </p>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center mb-10">
        <input
          type="text"
          placeholder="Search doctors..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-1/2 px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
        />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
        >
          <option value="All">All Specialties</option>
          {Object.keys(specialtyColors).map((specialty, idx) => (
            <option key={idx} value={specialty}>
              {specialty}
            </option>
          ))}
        </select>
      </div>

      {/* Doctors Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredDoctors.map((doc, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-2xl p-6 flex flex-col items-center transform transition-all hover:scale-105 hover:shadow-xl"
          >
            <img
              src={doc.image}
              alt={doc.name}
              className="w-28 h-28 rounded-full mb-4 object-cover border-4 border-blue-100"
            />
            <h2 className="text-lg font-semibold text-gray-800 mb-1 text-center">
              {doc.name}
            </h2>
            <span
              className={`text-xs font-medium px-3 py-1 rounded-full mb-3 ${
                specialtyColors[doc.specialty]
              }`}
            >
              {doc.specialty}
            </span>
            <p className="text-gray-600 text-sm text-center line-clamp-3">
              {doc.description}
            </p>

            {/* Buttons */}
            <div className="mt-4 flex flex-col gap-2 w-full">
              <button
                onClick={() => setSelectedDoctor(doc)}
                className="w-full text-center bg-gray-100 text-gray-800 py-2 rounded-lg hover:bg-gray-200 transition font-medium"
              >
                View Details
              </button>
              <Link
                to="/appointments"
                state={{ doctor: doc.name }}
                className="w-full text-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-medium"
              >
                Book Appointment
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedDoctor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 relative shadow-2xl animate-fadeIn">
            <button
              onClick={() => setSelectedDoctor(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-xl"
            >
              ✖
            </button>
            <img
              src={selectedDoctor.image}
              alt={selectedDoctor.name}
              className="w-28 h-28 rounded-full mx-auto mb-4 object-cover border-4 border-blue-100"
            />
            <h2 className="text-2xl font-bold text-center mb-2">
              {selectedDoctor.name}
            </h2>
            <p className="text-center text-sm font-medium mb-4">
              <span
                className={`px-3 py-1 rounded-full ${
                  specialtyColors[selectedDoctor.specialty]
                }`}
              >
                {selectedDoctor.specialty}
              </span>
            </p>
            <p className="text-gray-700 text-center leading-relaxed">
              {selectedDoctor.description}
            </p>
            <div className="mt-6 flex justify-center">
              <Link
                to="/appointments"
                state={{ doctor: selectedDoctor.name }}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition font-semibold"
              >
                Book Appointment
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Doctors;
