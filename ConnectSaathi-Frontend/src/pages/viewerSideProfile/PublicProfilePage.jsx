import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProfileHeader from "./ProfileHeader";
import SkillsSection from "./SkillsSection";
import HackathonSection from "./HackathonSection";

// Replace with your actual backend endpoint
const PROFILE_API_URL = "https://your-backend.com/api/profile/username/";

export default function PublicProfilePage({ username }) {
  const [profileData, setProfileData] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${PROFILE_API_URL}${username}/`)
      .then((res) => res.json())
      .then((data) => {
        setProfileData(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [username]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const cardClass = darkMode
    ? "bg-gray-800 text-white"
    : "bg-white text-black";

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="text-lg">Loading...</span>
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="text-lg text-red-500">Profile not found.</span>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? "dark bg-gray-900 text-white" : "bg-light-cyan text-gray-900"}`}>
      <div className="max-w-6xl mx-auto p-4 md:p-6">
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-between items-center mb-6"
          >
            <h1 className="text-2xl font-bold">Profile of {profileData.firstName} {profileData.lastName}</h1>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full hover:bg-blue-green dark:hover:bg-marian-blue transition-colors"
            >
              {darkMode ? "☀️" : "🌙"}
            </motion.button>
          </motion.div>
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          <div className="lg:col-span-2 space-y-6">
            <ProfileHeader
              profileData={profileData}
              cardClass={cardClass}
              darkMode={darkMode}
            />

            <SkillsSection
              skills={profileData.skills}
              allTechStacks={profileData.allTechStacks || []}
              cardClass={cardClass}
              darkMode={darkMode}
            />
          </div>
          <div className="space-y-6">
            <motion.div
              whileHover={{ y: -5 }}
              className={`p-6 rounded-lg transition-all shadow ${cardClass}`}
            >
              <h2 className="text-xl font-bold mb-4">Team Preferences</h2>
              <div className="flex items-center justify-between">
                <span className="font-medium">Looking for team?</span>
                <span className="ml-2 font-semibold text-pacific-cyan">
                  {profileData.lookingForTeam ? "Yes" : "No"}
                </span>
              </div>
            </motion.div>
            <HackathonSection
              pastHackathons={profileData.pastHackathons}
              cardClass={cardClass}
              darkMode={darkMode}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
