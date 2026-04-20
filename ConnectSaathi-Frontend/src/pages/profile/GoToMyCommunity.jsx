import { motion } from "framer-motion";

export default function GoToMyCommunity({ onClick, cardClass, darkMode }) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`w-full mt-4 px-4 py-2  hover:bg-blue-green ${darkMode ? "text-white bg-gray-800" : "text-black"} rounded-md transition-colors ${cardClass}`}
    >
      MyCommunity
    </motion.button>
  );
}
