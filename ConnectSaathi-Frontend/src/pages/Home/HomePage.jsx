import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import HappyUserSection from "./HappyUserSection";
import SearchSection from "./SearchSection";
import CommunitiesSection from "./CommunitiesSection";
import AboutSection from "./AboutSection";
import Header from "./Header";

export default function Homepage() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const el = document.getElementById(`${id}-section`);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth" });
        }, 100); // slight delay for DOM rendering
      }
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#caf0f8ff] via-[#90e0efff] to-[#48cae4ff] text-[#03045eff]">
      <Header />

      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center h-[450px] flex flex-col justify-center items-center text-center px-4 sm:px-6 md:px-10 lg:px-20"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1470&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#03045ecc] via-[#0077b6aa] to-[#00b4d8bb]" />
        <h1 className="relative z-10 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#90e0efff] via-[#caf0f8ff] to-[#ade8f4ff] mb-4">
          Build Teams. Connect Skills. Create Together.
        </h1>
        <p className="relative z-10 text-base sm:text-lg md:text-xl text-[#caf0f8ff] max-w-md sm:max-w-lg md:max-w-2xl drop-shadow-md">
          ConnectSaathi is your platform to find like-minded teammates and
          communities for hackathons, projects, and growth.
        </p>
      </section>

      <SearchSection />
      <CommunitiesSection />
      <HappyUserSection />

      {/* Add ID to target by scroll */}
      <div id="about-section">
        <AboutSection />
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-[#0077b6ff] via-[#00b4d8ff] to-[#48cae4fff] text-white text-center py-4 shadow-inner">
        &copy; 2025 ConnectSaathi. All rights reserved.
      </footer>
    </div>
  );
}
