import React from "react";
import { FaInstagram, FaYoutube, FaLinkedin } from "react-icons/fa";

export default function AboutSection() {
  return (
    <section className="bg-gradient-to-br from-[#caf0f8ff] via-[#ade8f4ff] to-[#90e0efff] py-16 px-6 md:px-16">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
        {/* Left Part */}
        <div className="flex-1">
          <h2 className="text-3xl md:text-4xl font-bold text-[#03045eff] mb-4">
            Meet the Founders
          </h2>
          <p className="text-lg text-[#0077b6ff] mb-2 font-semibold">
            Team: The Mad Cubes
          </p>
          <p className="text-lg text-[#0077b6ff] mb-6 font-semibold">
            <span>The Professionals</span>: Lakshya Mewara, Pulasari Jai, Kartavya Panchal
          </p>
          <h3 className="text-2xl font-semibold text-[#023e8aff] mb-3">
            Our Mission
          </h3>
          <p className="text-gray-800 leading-relaxed">
            To empower individuals by seamlessly connecting them with the right people, skills, and communities —
            enabling collaborative growth through hackathons, projects, and innovation-driven opportunities.
          </p>
        </div>

        {/* Animated Line */}
        <div className="w-full md:w-px h-px md:h-auto bg-gradient-to-b md:bg-gradient-to-r from-[#0077b6ff] via-[#00b4d8ff] to-[#90e0efff] animate-pulse" />

        {/* Right Part */}
        <div className="flex-1">
          <h2 className="text-3xl md:text-4xl font-bold text-[#03045eff] mb-4">
            Contact Us
          </h2>
          <p className="text-gray-800 mb-2">Email: support@connectsaathi.com</p>
          <p className="text-gray-800 mb-2">Phone: +91-9876543210</p>
          <p className="text-gray-800 mb-4">
            Address: Scaler School of Technology, Bangalore
          </p>

          <a
            href="https://yourfeedbackform.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mb-6 text-[#0077b6ff] underline hover:text-[#0096c7ff] transition"
          >
            Leave Feedback
          </a>

          <div className="flex gap-6 text-2xl">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#e1306c] hover:scale-110 transition-transform"
            >
              <FaInstagram />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#ff0000] hover:scale-110 transition-transform"
            >
              <FaYoutube />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0077b5] hover:scale-110 transition-transform"
            >
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
