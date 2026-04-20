import React from "react";

const mockCommunityData = {
  id: "c001",
  name: "Tech Avengers",
  address: "IIT Bombay",
  skillsRequired: ["React.js", "Python", "TensorFlow"],
  experience: "Advanced",
  profilePic: "https://api.dicebear.com/7.x/notionists/svg?seed=Avenger",
};

export default function CommunityInfo() {
  const community = mockCommunityData;

  const handleCollab = () => {
    alert("Collab request sent!");
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-[#001d3d] text-white rounded-lg shadow-lg mt-6">
      <div className="flex flex-col items-center text-center space-y-4">
        <img
          src={community.profilePic}
          alt="Community Avatar"
          className="w-24 h-24 rounded-full border-4 border-[#ffc300]"
        />
        <h2 className="text-2xl font-bold text-[#ffc300]">{community.name}</h2>
      </div>

      <div className="mt-6 space-y-4">
        <div>
          <label className="block text-[#ffc300] font-semibold">Address:</label>
          <p className="bg-[#000814] border border-[#ffd60a] px-4 py-2 rounded-md">
            {community.address}
          </p>
        </div>

        <div>
          <label className="block text-[#ffc300] font-semibold">
            Skills Required:
          </label>
          <div className="flex flex-wrap gap-2 mt-2">
            {community.skillsRequired.map((skill, idx) => (
              <span
                key={idx}
                className="bg-[#0077b6] text-white px-3 py-1 rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-[#ffc300] font-semibold">Experience:</label>
          <p className="bg-[#000814] border border-[#ffd60a] px-4 py-2 rounded-md">
            {community.experience}
          </p>
        </div>
      </div>

      <div className="mt-8 text-center">
        <button
          onClick={handleCollab}
          className="bg-[#ffc300] hover:bg-[#ffd60a] text-black font-semibold px-6 py-2 rounded transition"
        >
          🤝 Collab
        </button>
      </div>
    </div>
  );
}
