import { useState, useEffect } from "react";
import ProfileHeader from "./ProfileHeader";
import SkillsSection from "./SkillsSection";
import HackathonSection from "./HackathonSection";
import { allTechStacks } from "./techStacks";
import { motion, AnimatePresence } from "framer-motion";
import GoToMyCommunity from "./GoToMyCommunity";
import Modal from "./Modal";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [showCommunityModal, setShowCommunityModal] = useState(false);

  const [profileData, setProfileData] = useState({
    avatar: "https://m.media-amazon.com/images/I/51HbRbwFPyL._AC_SY350_QL15_.jpg",
    firstName: "Shree",
    lastName: "Krishna",
    username: "the_one_and_only_krishna",
    bio: "Solve real world complex problem",
    location: "Bekunth",
    role: "Problem Solver",
    links: {
      github: "",
      linkedin: "",
      portfolio: "",
      website: "",
    },
    skills: ["React", "Node.js", "JavaScript", "Java"],
    lookingForTeam: true,
    pastHackathons: [
      { name: "TechCrunch Disrupt 2023", achievement: "Finalist" },
      { name: "Hack the North 2022", achievement: "Best UI/UX" },
    ],
  });

  const [tempProfileData, setTempProfileData] = useState({ ...profileData });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const handleEditToggle = () => {
    if (isEditing) {
      setProfileData({ ...tempProfileData });
    } else {
      setTempProfileData({ ...profileData });
    }
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTempProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLinkChange = (e) => {
    const { name, value } = e.target;
    setTempProfileData((prev) => ({
      ...prev,
      links: {
        ...prev.links,
        [name]: value,
      },
    }));
  };

  const handleSkillToggle = (skill) => {
    setTempProfileData((prev) => {
      const newSkills = prev.skills.includes(skill)
        ? prev.skills.filter((s) => s !== skill)
        : [...prev.skills, skill];
      return {
        ...prev,
        skills: newSkills,
      };
    });
  };

  const handleLookingForTeamToggle = () => {
    setTempProfileData((prev) => ({
      ...prev,
      lookingForTeam: !prev.lookingForTeam,
    }));
  };

  // --- THIS IS THE CRUCIAL PART ---
  // Handler to update hackathons in tempProfileData
  const handleHackathonsChange = (newHackathons) => {
    setTempProfileData((prev) => ({
      ...prev,
      pastHackathons: newHackathons,
    }));
  };

  const cardClass = darkMode
    ? "bg-gray-800 text-white"
    : "bg-white text-black";

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode
          ? "dark bg-gray-900 text-white"
          : "bg-light-cyan text-gray-900"
      }`}
    >
      <div className="max-w-6xl mx-auto p-4 md:p-6">
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-between items-center mb-6"
          >
            <h1 className="text-2xl font-bold">My Profile</h1>
            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-full hover:bg-blue-green dark:hover:bg-marian-blue transition-colors"
              >
                {darkMode ? "☀️" : "🌙"}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleEditToggle}
                className={`px-4 py-2 rounded-lg ${
                  isEditing
                    ? "bg-green-500 hover:bg-green-600"
                    : "bg-pacific-cyan hover:bg-blue-green"
                } text-white transition-colors`}
              >
                {isEditing ? "Save Profile" : "Edit Profile"}
              </motion.button>
            </div>
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
              profileData={isEditing ? tempProfileData : profileData}
              isEditing={isEditing}
              onInputChange={handleInputChange}
              onLinkChange={handleLinkChange}
              cardClass={cardClass}
              darkMode={darkMode}
            />

            <SkillsSection
              skills={isEditing ? tempProfileData.skills : profileData.skills}
              isEditing={isEditing}
              onSkillToggle={handleSkillToggle}
              allTechStacks={allTechStacks}
              cardClass={cardClass}
              darkMode={darkMode}
            />
            <GoToMyCommunity
              cardClass={cardClass}
              onClick={() => setShowCommunityModal(true)}
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
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={
                      isEditing
                        ? tempProfileData.lookingForTeam
                        : profileData.lookingForTeam
                    }
                    onChange={handleLookingForTeamToggle}
                    disabled={!isEditing}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-pacific-cyan"></div>
                </label>
              </div>
            </motion.div>

            <HackathonSection
              pastHackathons={
                isEditing
                  ? tempProfileData.pastHackathons
                  : profileData.pastHackathons
              }
              isEditing={isEditing}
              cardClass={cardClass}
              darkMode={darkMode}
              // Pass the handler here!
              onHackathonsChange={isEditing ? handleHackathonsChange : undefined}
            />
          </div>
        </motion.div>
      </div>

      <Modal isOpen={showCommunityModal} onClose={() => setShowCommunityModal(false)}>
        <h2 className="text-2xl font-bold mb-4 text-center text-federal-blue dark:text-vivid-sky-blue">
          My Communities
        </h2>
        <p className="mb-6 text-center">
          Welcome to your communities!
        </p>
        <div className="flex justify-center">
          <button
            className="px-4 py-2 bg-pacific-cyan hover:bg-blue-green text-white rounded-md transition-colors"
            onClick={() => setShowCommunityModal(false)}
          >
            Close
          </button>
        </div>
      </Modal>
    </div>
  );
}
