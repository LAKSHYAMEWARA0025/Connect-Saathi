import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function HackathonSection({ pastHackathons, isEditing, cardClass, darkMode, onHackathonsChange }) {
  const [newHackathon, setNewHackathon] = useState({ name: '', achievement: '' });
  const [tempHackathons, setTempHackathons] = useState([...pastHackathons]);

  useEffect(() => {
    if (!isEditing) setTempHackathons([...pastHackathons]);
  }, [isEditing, pastHackathons]);

  useEffect(() => {
    if (isEditing && typeof onHackathonsChange === 'function') {
      onHackathonsChange(tempHackathons);
    }
    // eslint-disable-next-line
  }, [tempHackathons, isEditing]);

  const handleAddHackathon = () => {
    if (!newHackathon.name.trim() || !newHackathon.achievement.trim()) return;
    setTempHackathons(prev => [...prev, newHackathon]);
    setNewHackathon({ name: '', achievement: '' });
  };

  const handleRemoveHackathon = (idx) => {
    setTempHackathons(prev => prev.filter((_, i) => i !== idx));
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className={`p-6 rounded-lg transition-all shadow ${cardClass} ${isEditing ? 'border-2 border-pacific-cyan' : ''}`}
    >
      <h2 className="text-xl font-bold text-federal-blue dark:text-vivid-sky-blue mb-4">Projects / Hackathon</h2>
      {isEditing ? (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Projects / Hackathon Name</label>
              <input
                type="text"
                value={newHackathon.name}
                onChange={(e) => setNewHackathon({ ...newHackathon, name: e.target.value })}
                className={`w-full px-3 py-2 border border-non-photo-blue dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-pacific-cyan focus:border-pacific-cyan ${darkMode ? "bg-gray-700 text-white" : "bg-neutral-200 text-black"}  transition-colors`}
                placeholder="e.g., TechCrunch Disrupt"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Link / description / Achievement</label>
              <input
                type="text"
                value={newHackathon.achievement}
                onChange={(e) => setNewHackathon({ ...newHackathon, achievement: e.target.value })}
                className={`w-full px-3 py-2 border border-non-photo-blue dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-pacific-cyan focus:border-pacific-cyan ${darkMode ? "bg-gray-700 text-white" : "bg-neutral-200 text-black"}  transition-colors`}
                placeholder="e.g., Winner, Finalist"
              />
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAddHackathon}
            className="px-4 py-2 bg-pacific-cyan hover:bg-blue-green text-white rounded-md transition-colors"
          >
            Add
          </motion.button>
          <div className="mt-4 space-y-3">
            <AnimatePresence>
              {tempHackathons.map((hackathon, index) => (
                <motion.div
                  key={index}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className={`flex justify-between items-center p-3 bg-non-photo-blue-2 ${darkMode ? "dark:bg-gray-700" : "bg-neutral-200"} rounded-md`}
                >
                  <div>
                    <p className="font-medium text-honolulu-blue">{hackathon.name}</p>
                    <p className="text-sm text-black">{hackathon.achievement}</p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.8 }}
                    onClick={() => handleRemoveHackathon(index)}
                    className="text-red-500 hover:text-red-700 transition-colors text-2xl"
                  >
                    ×
                  </motion.button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {pastHackathons.length > 0 ? (
            pastHackathons.map((hackathon, index) => (
              <motion.div
                key={index}
                whileHover={{ x: 5 }}
                className={`p-3 bg-non-photo-blue-2 ${darkMode ? "dark:bg-gray-700" : "bg-neutral-200"}  rounded-md transition-transform`}
              >
                <p className="font-medium text-honolulu-blue">{hackathon.name}</p>
                <p className="text-sm text-black">{hackathon.achievement}</p>
              </motion.div>
            ))
          ) : (
            <p className="text-gray-500 dark:text-gray-400">No Projects & hackathon yet</p>
          )}
        </div>
      )}
    </motion.div>
  );
}
