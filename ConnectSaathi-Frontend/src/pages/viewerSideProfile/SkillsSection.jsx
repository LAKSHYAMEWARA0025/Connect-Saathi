import { motion } from "framer-motion";

export default function SkillsSection({ skills, allTechStacks, cardClass, darkMode }) {
  return (
    <motion.div
      layout
      className={`p-6 rounded-lg transition-all shadow ${cardClass}`}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-federal-blue dark:text-vivid-sky-blue">Skills & Expertise</h2>
      </div>
      <motion.div layout className="flex flex-wrap gap-2 mb-4">
        {skills.map((skill) => (
          <motion.span
            key={skill}
            layout
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className={`${darkMode ? "dark:bg-marian-blue" : "dark:bg-sky-500"} px-3 py-1 rounded-full text-sm bg-non-photo-blue transition-colors`}
          >
            {skill}
          </motion.span>
        ))}
      </motion.div>
    </motion.div>
  );
}
