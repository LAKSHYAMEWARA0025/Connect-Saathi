import { motion } from "framer-motion";

export default function ProfileHeader({ profileData, cardClass, darkMode }) {
  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      className={`p-6 rounded-lg transition-all shadow ${cardClass}`}
    >
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-shrink-0">
          <motion.div whileHover={{ scale: 1.03 }} className="relative">
            <img
              src={profileData.avatar}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-white dark:border-gray-700 shadow"
            />
          </motion.div>
        </div>
        <div className="flex-1 flex flex-col gap-3">
          <span className="text-2xl font-bold text-federal-blue dark:text-vivid-sky-blue">
            {profileData.firstName} {profileData.lastName}
          </span>
          <div>
            <span className="text-honolulu-blue font-semibold">@{profileData.username}</span>
          </div>
          <div>
            <p>{profileData.bio}</p>
          </div>
          <div className="flex flex-wrap gap-4 mt-2">
            <div>
              <span className="font-medium">Location: </span>
              <span>{profileData.location}</span>
            </div>
            <div>
              <span className="font-medium">Role: </span>
              <span>{profileData.role}</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-4 mt-2">
            {["github", "linkedin", "portfolio", "website"].map((link) => (
              <div key={link}>
                <span className="font-medium capitalize">{link}: </span>
                <a
                  href={profileData.links[link]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-blue-green hover:underline ${profileData.links[link] ? "" : "opacity-50 pointer-events-none"}`}
                >
                  {profileData.links[link] ? profileData.links[link] : "N/A"}
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
