import React, { useState } from "react";
import { BellIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

export default function Header() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const scrollToAbout = () => {
    const aboutSection = document.getElementById("about-section");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
      setSidebarOpen(false); // also close sidebar if on mobile
    }
  };

  return (
    <header className="bg-white shadow-md py-4 px-6 flex items-center justify-between w-full z-50 sticky top-0">
      {/* Left - Create Community (hidden on small screens) */}
      <div className="flex items-center gap-4">
        <Link
          to="/create-community"
          className="bg-[#00b4d8ff] hover:bg-[#0077b6ff] text-white font-semibold px-4 py-2 rounded-lg shadow transition-transform transform hover:scale-105 hidden md:inline-block"
        >
          + Create Community
        </Link>

        {/* Hamburger icon on small screens */}
        <button className="md:hidden" onClick={() => setSidebarOpen(true)}>
          <Bars3Icon className="w-6 h-6 text-[#0077b6ff]" />
        </button>
      </div>

      {/* Center - Logo */}
      <div className="text-2xl font-bold text-[#03045eff]">ConnectSaathi</div>

      {/* Right - Nav links for desktop */}
      <div className="hidden md:flex items-center gap-6">
        <button
          onClick={scrollToAbout}
          className="text-[#0077b6ff] font-medium hover:text-[#023e8aff]"
        >
          About
        </button>
        <Link
          to="/contact"
          className="text-[#0077b6ff] font-medium hover:text-[#023e8aff]"
        >
          Contact
        </Link>
        <Link
          to="/notifications"
          aria-label="Notifications"
          className="text-[#0077b6ff] hover:text-[#023e8aff]"
        >
          <BellIcon className="w-6 h-6" />
        </Link>
        <Link to="/profile">
          <img
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=80&q=80"
            alt="Profile"
            className="w-10 h-10 rounded-full object-cover border-2 border-[#0077b6ff]"
          />
        </Link>
      </div>

      {/* Sidebar for mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden">
          <div className="fixed top-0 left-0 w-64 h-full bg-white shadow-lg p-6 flex flex-col gap-6 z-50">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-[#03045eff]">Menu</h2>
              <button onClick={() => setSidebarOpen(false)}>
                <XMarkIcon className="w-6 h-6 text-[#0077b6ff]" />
              </button>
            </div>

            {/* Profile first */}
            <Link
              to="/profile"
              onClick={() => setSidebarOpen(false)}
              className="flex items-center gap-3"
            >
              <img
                src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=80&q=80"
                alt="Profile"
                className="w-10 h-10 rounded-full object-cover border-2 border-[#0077b6ff]"
              />
              <span className="text-[#0077b6ff] font-medium hover:text-[#023e8aff]">
                Profile
              </span>
            </Link>

            <Link
              to="/create-community"
              onClick={() => setSidebarOpen(false)}
              className="text-[#0077b6ff] font-medium hover:text-[#023e8aff]"
            >
              + Create Community
            </Link>
            <button
              onClick={scrollToAbout}
              className="text-left text-[#0077b6ff] font-medium hover:text-[#023e8aff]"
            >
              About
            </button>
            <Link
              to="/contact"
              onClick={() => setSidebarOpen(false)}
              className="text-[#0077b6ff] font-medium hover:text-[#023e8aff]"
            >
              Contact
            </Link>
            <Link
              to="/notifications"
              onClick={() => setSidebarOpen(false)}
              className="text-[#0077b6ff] font-medium hover:text-[#023e8aff]"
            >
              Notifications
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
