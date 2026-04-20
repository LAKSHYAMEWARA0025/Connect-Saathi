import { motion } from "framer-motion";

export default function HackathonSection({ pastHackathons, cardClass, darkMode }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className={`p-6 rounded-lg transition-all shadow ${cardClass}`}
    >
      <h2 className="text-xl font-bold text-federal-blue dark:text-vivid-sky-blue mb-4">Hackathon Experience</h2>
      <div className="space-y-3">
        {pastHackathons && pastHackathons.length > 0 ? (
          pastHackathons.map((hackathon, index) => (
            <motion.div
              key={index}
              whileHover={{ x: 5 }}
              className={`p-3 bg-non-photo-blue-2 ${darkMode ? "dark:bg-gray-700" : "bg-neutral-200"} rounded-md transition-transform`}
            >
              <p className="font-medium text-honolulu-blue">{hackathon.name}</p>
              <p className="text-sm text-black">{hackathon.achievement}</p>
            </motion.div>
          ))
        ) : (
          <p className="text-gray-500 dark:text-gray-400">No hackathon experience yet</p>
        )}
      </div>
    </motion.div>
  );
}
