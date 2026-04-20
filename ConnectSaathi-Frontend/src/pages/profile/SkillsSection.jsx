import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export default function SkillsSection({ skills, isEditing, onSkillToggle, allTechStacks, cardClass, darkMode}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [showSkillSelector, setShowSkillSelector] = useState(false);

  const filteredSkills = allTechStacks.filter(skill =>
    skill.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.div
      layout
      className={`p-6 rounded-lg transition-all shadow ${cardClass} ${isEditing ? 'border-2 border-pacific-cyan' : ''}`}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-federal-blue dark:text-vivid-sky-blue">Skills & Expertise</h2>
        {isEditing && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowSkillSelector(!showSkillSelector)}
            className="px-3 py-1 bg-pacific-cyan hover:bg-blue-green text-white rounded-md text-sm transition-colors"
          >
            {showSkillSelector ? 'Hide Skills' : 'Add Skills'}
          </motion.button>
        )}
      </div>

      <motion.div layout className="flex flex-wrap gap-2 mb-4">
        {skills.map(skill => (
          <motion.span
            key={skill}
            layout
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className={`${darkMode ? "dark:bg-marian-blue" : "dark:bg-sky-500"} px-3 py-1 rounded-full text-sm ${isEditing ? 'cursor-pointer' : ''}
              ${isEditing
                ? 'bg-non-photo-blue hover:bg-vivid-sky-blue dark:bg-marian-blue dark:hover:bg-honolulu-blue'
                : 'bg-non-photo-blue '}
              transition-colors`}
            onClick={() => isEditing && onSkillToggle(skill)}
          >
            {skill}  {/*java, c++*/}
            {isEditing && <span className="ml-1">×</span>}
          </motion.span>
        ))}
      </motion.div>

      <AnimatePresence>
        {isEditing && showSkillSelector && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <input
              type="text"
              placeholder="Search skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-non-photo-blue dark:border-marian-blue rounded-md shadow-sm focus:outline-none focus:ring-pacific-cyan focus:border-pacific-cyan dark:bg-gray-700 dark:text-white mb-3 transition-colors"
            />
            <div className="max-h-60 overflow-y-auto border border-non-photo-blue dark:border-marian-blue rounded-md p-2 dark:bg-gray-700">
              {filteredSkills.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                  {filteredSkills.map(skill => (
                    <motion.button
                      key={skill}
                      layout
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => onSkillToggle(skill)}
                      className={`px-3 py-1 rounded-md text-sm text-left transition-colors
                        ${skills.includes(skill)
                          ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300'
                          : 'bg-non-photo-blue-2 hover:bg-vivid-sky-blue dark:bg-marian-blue dark:hover:bg-honolulu-blue text-gray-900 dark:text-white'}
                      `}
                    >
                      {skill}
                    </motion.button>
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-500 dark:text-gray-400">No skills found</p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
