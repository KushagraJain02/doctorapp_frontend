import React from "react";
import { motion } from "framer-motion";
import { Users, HeartPulse, Target } from "lucide-react";

const About = () => {
  return (
    <div className="p-8 max-w-6xl mx-auto bg-white shadow-xl rounded-2xl">
      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl font-extrabold text-blue-600 mb-8 text-center"
      >
        About <span className="text-gray-900">MediCare</span>
      </motion.h1>

      {/* Intro */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="text-gray-700 text-lg md:text-xl leading-relaxed mb-10 text-center"
      >
        Welcome to <span className="font-semibold text-blue-500">MediCare</span>
        , your trusted healthcare appointment system. Our platform simplifies
        the way patients connect with doctors, ensuring medical care is just a
        few clicks away.
      </motion.p>

      {/* Mission & Vision */}
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="bg-blue-50 p-6 rounded-xl shadow-md border border-blue-100"
        >
          <div className="flex items-center gap-3 mb-4">
            <Target className="text-blue-600" size={28} />
            <h2 className="text-2xl font-semibold text-blue-700">
              Our Mission
            </h2>
          </div>
          <p className="text-gray-600 leading-relaxed">
            To provide a seamless, reliable, and user-friendly healthcare
            booking platform that bridges the gap between doctors and patients.
            We believe in making healthcare more accessible for everyone.
          </p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.03 }}
          className="bg-blue-50 p-6 rounded-xl shadow-md border border-blue-100"
        >
          <div className="flex items-center gap-3 mb-4">
            <HeartPulse className="text-blue-600" size={28} />
            <h2 className="text-2xl font-semibold text-blue-700">Our Vision</h2>
          </div>
          <p className="text-gray-600 leading-relaxed">
            A world where technology empowers people to take control of their
            health by making medical consultations faster, easier, and more
            efficient.
          </p>
        </motion.div>
      </div>

      {/* Team Section */}
      <div>
        <h2 className="text-3xl font-bold text-blue-600 mb-6 text-center flex justify-center items-center gap-2">
          <Users className="text-blue-600" /> Our Team
        </h2>
        <p className="text-gray-700 leading-relaxed mb-8 text-center max-w-3xl mx-auto">
          We are a passionate team of developers, designers, and healthcare
          professionals working together to improve the patient experience. Our
          commitment is to bring innovation and care to every step of your
          health journey.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-center">
          {[
            {
              name: "Dr. Rajesh Kumar",
              role: "Founder & Cardiologist",
              img: "https://randomuser.me/api/portraits/men/32.jpg",
            },
            {
              name: "Dr. Ananya Sharma",
              role: "Chief Medical Advisor",
              img: "https://randomuser.me/api/portraits/women/44.jpg",
            },
            {
              name: "Aman Verma",
              role: "Lead Developer",
              img: "https://randomuser.me/api/portraits/men/76.jpg",
            },
          ].map((member, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -8 }}
              className="bg-gray-50 p-6 rounded-xl shadow-md hover:shadow-lg transition"
            >
              <img
                src={member.img}
                alt={member.name}
                className="w-24 h-24 mx-auto rounded-full mb-4 shadow-md"
              />
              <h3 className="font-semibold text-lg">{member.name}</h3>
              <p className="text-gray-500">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
