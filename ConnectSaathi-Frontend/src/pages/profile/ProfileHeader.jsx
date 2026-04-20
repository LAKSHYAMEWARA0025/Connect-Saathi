import { motion } from 'framer-motion';
import { useRef } from 'react';

export default function ProfileHeader({ profileData, isEditing, onInputChange, onLinkChange, cardClass, darkMode }) {
  const fileInputRef = useRef();

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        onInputChange({ target: { name: 'avatar', value: ev.target.result } });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      className={`p-6 rounded-lg transition-all shadow ${cardClass} ${isEditing ? 'border-2 border-pacific-cyan' : ''}`}
    >
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-shrink-0">
          <motion.div whileHover={{ scale: 1.03 }} className="relative">
            <img
              src={profileData.avatar}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-white dark:border-gray-700 shadow"
            />
            {isEditing && (
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="absolute bottom-0 right-0 bg-white dark:bg-gray-700 p-2 rounded-full shadow"
              >
                <label className="cursor-pointer">
                  <span className="text-gray-800 dark:text-white">📷</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    ref={fileInputRef}
                    className="hidden"
                  />
                </label>
              </motion.div>
            )}
          </motion.div>
        </div>
        <div className="flex-1 flex flex-col gap-3">
          <div className="flex flex-col md:flex-row md:items-center gap-2">
            {isEditing ? (
              <>
                <input
                  type="text"
                  name="firstName"
                  value={profileData.firstName}
                  onChange={onInputChange}
                  placeholder="First Name"
                  className={`px-2 py-1 rounded border border-non-photo-blue bg-white ${darkMode? "dark:bg-gray-700" : "dark:bg-neutral-200" } ${darkMode? "dark:text-white" : "dark:text-black" } `}
                />
                <input
                  type="text"
                  name="lastName"
                  value={profileData.lastName}
                  onChange={onInputChange}
                  placeholder="Last Name"
                  className={`px-2 py-1 rounded border border-non-photo-blue bg-white ${darkMode? "dark:bg-gray-700" : "dark:bg-neutral-200" } ${darkMode? "text-white" : "text-black" } `}
                />
              </>
            ) : (
              <span className="text-2xl font-bold text-federal-blue dark:text-vivid-sky-blue">
                {profileData.firstName} {profileData.lastName}
              </span>
            )}
          </div>
          <div>
            <span className="text-honolulu-blue font-semibold">@{profileData.username}</span>
          </div>
          <div>
            {isEditing ? (
              <textarea
                name="bio"
                value={profileData.bio}
                onChange={onInputChange}
                placeholder="Bio"
                className={`w-full px-2 py-1 rounded border border-non-photo-blue bg-white ${darkMode? "dark:bg-gray-700" : "dark:bg-neutral-200" } ${darkMode? "text-white" : "text-black" }`}
              />
            ) : (
              <p >{profileData.bio}</p>
            )}
          </div>
          <div className="flex flex-wrap gap-4 mt-2">
            <div>
              <span className="font-medium ">Location: </span>
              {isEditing ? (
                <input
                  type="text"
                  name="location"
                  value={profileData.location}
                  onChange={onInputChange}
                  className={`px-2 py-1 rounded border border-non-photo-blue bg-white ${darkMode? "dark:bg-gray-700" : "dark:bg-neutral-200" } ${darkMode? "text-white" : "text-black" }`}
                />
              ) : (
                <span>{profileData.location}</span>
              )}
            </div>
            <div>
              <span className="font-medium ">Role: </span>
              {isEditing ? (
                <input
                  type="text"
                  name="role"
                  value={profileData.role}
                  onChange={onInputChange}
                  className={`px-2 py-1 rounded border border-non-photo-blue bg-white ${darkMode? "dark:bg-gray-700" : "dark:bg-neutral-200" } ${darkMode? "text-white" : "text-black" }`}
                />
              ) : (
                <span>{profileData.role}</span>
              )}
            </div>
          </div>
          <div className="flex flex-wrap gap-4 mt-2">
            {['github', 'linkedin', 'portfolio', 'website'].map((link) => (
              <div key={link}>
                <span className="font-medium capitalize ">{link}: </span>
                {isEditing ? (
                  <input
                    type="text"
                    name={link}
                    value={profileData.links[link]}
                    onChange={onLinkChange}
                    className={`px-2 py-1 rounded border border-non-photo-blue bg-white ${darkMode? "dark:bg-gray-700" : "dark:bg-neutral-200" } ${darkMode? "text-white" : "text-black" }`}
                  />
                ) : (
                  <a
                    href={profileData.links[link]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-blue-green hover:underline ${profileData.links[link] ? '' : 'opacity-50 pointer-events-none'}`}
                  >
                    {profileData.links[link] ? profileData.links[link] : 'N/A'}
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
