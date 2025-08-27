// src/pages/Home.jsx
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Calendar, UserPlus, HeartPulse } from "lucide-react";

const doctors = [
  {
    name: "Dr. Aarav Sharma",
    specialty: "Cardiologist",
    image: "https://randomuser.me/api/portraits/men/45.jpg",
  },
  {
    name: "Dr. Meera Kapoor",
    specialty: "Dermatologist",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    name: "Dr. Rohan Gupta",
    specialty: "Orthopedic",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Dr. Neha Verma",
    specialty: "Pediatrician",
    image: "https://randomuser.me/api/portraits/women/45.jpg",
  },
];

const Home = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const handleCTA = () => {
    if (user) {
      navigate("/doctors");
    } else {
      navigate("/auth");
    }
  };

  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="bg-gray-50 text-gray-800">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-slate-800 to-blue-900 py-20 px-6 text-center text-white">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight">
          Your Health, Our Priority
        </h1>
        {user && (
          <p className="mt-4 text-lg md:text-xl text-gray-200">
            Welcome back, <span className="font-semibold">{user.name}</span>!
          </p>
        )}
        <p className="mt-4 text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
          Book appointments with trusted doctors anytime, anywhere. Quality
          healthcare at your fingertips.
        </p>
        <button
          onClick={handleCTA}
          className="mt-8 bg-blue-500 text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:bg-blue-600 transition-transform duration-300"
        >
          {user ? "Book Appointment" : "Get Started"}
        </button>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 md:px-12 lg:px-20 bg-white">
        <h2 className="text-3xl font-bold text-center text-slate-900">
          Why Choose <span className="text-blue-600">DocCare?</span>
        </h2>
        <div className="mt-10 grid md:grid-cols-3 gap-8">
          <div className="p-6 bg-slate-50 rounded-xl shadow hover:shadow-md transition">
            <Calendar className="w-12 h-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold">Easy Booking</h3>
            <p className="mt-2 text-gray-600">
              Schedule appointments with just a few clicks.
            </p>
          </div>

          <div className="p-6 bg-slate-50 rounded-xl shadow hover:shadow-md transition">
            <UserPlus className="w-12 h-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold">Top Doctors</h3>
            <p className="mt-2 text-gray-600">
              Connect with experienced and verified doctors across specialties.
            </p>
          </div>

          <div className="p-6 bg-slate-50 rounded-xl shadow hover:shadow-md transition">
            <HeartPulse className="w-12 h-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold">24/7 Care</h3>
            <p className="mt-2 text-gray-600">
              Access healthcare anytime, anywhere — your health is our mission.
            </p>
          </div>
        </div>
      </section>

      {/* Doctors Carousel */}
      <section className="py-16 px-6 md:px-12 lg:px-20 bg-gray-100">
        <h2 className="text-3xl font-bold text-center text-slate-900 mb-8">
          Meet Our Experts
        </h2>
        <Slider {...carouselSettings}>
          {doctors.map((doc, index) => (
            <div key={index} className="px-4">
              <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center hover:shadow-lg transition">
                <img
                  src={doc.image}
                  alt={doc.name}
                  className="w-28 h-28 rounded-full object-cover mb-4 border-4 border-blue-100"
                />
                <h3 className="text-lg font-semibold">{doc.name}</h3>
                <p className="text-gray-600">{doc.specialty}</p>
              </div>
            </div>
          ))}
        </Slider>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-6 md:px-12 lg:px-20 bg-white">
        <h2 className="text-3xl font-bold text-center text-slate-900 mb-8">
          What Our Patients Say
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              text: "DocCare made booking a doctor so simple. Highly recommend!",
              name: "Priya S.",
            },
            {
              text: "Quick appointments and professional doctors. Amazing service.",
              name: "Rahul K.",
            },
            {
              text: "I felt cared for and supported throughout my visit. Thank you!",
              name: "Anjali M.",
            },
          ].map((t, idx) => (
            <div
              key={idx}
              className="p-6 bg-slate-50 rounded-xl shadow hover:shadow-md transition"
            >
              <p className="text-gray-700 mb-4 italic">“{t.text}”</p>
              <p className="font-semibold text-slate-900">– {t.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call To Action */}
      <section className="bg-gradient-to-r from-slate-800 to-blue-900 py-16 text-center text-white">
        <h2 className="text-3xl md:text-4xl font-bold">
          Ready to Book Your Appointment?
        </h2>
        <p className="mt-3 text-lg text-gray-200">
          {user
            ? "Choose a doctor and schedule your appointment today."
            : "Sign up today and take the first step toward better healthcare."}
        </p>
        <button
          onClick={handleCTA}
          className="mt-6 bg-blue-500 text-white font-semibold px-6 py-3 rounded-full shadow hover:bg-blue-600 transition"
        >
          {user ? "Book Appointment" : "Get Started"}
        </button>
      </section>
    </div>
  );
};

export default Home;
