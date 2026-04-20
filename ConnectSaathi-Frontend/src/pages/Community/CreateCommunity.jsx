import React, { useState } from "react";

const skillOptions = [
  // Frontend
  "HTML",
  "CSS",
  "JavaScript",
  "React.js",
  "Redux",
  "Context API",
  "Angular",
  "Vue.js",
  "Svelte",
  "Next.js",
  "Nuxt.js",
  "Tailwind CSS",
  "Bootstrap",
  "Material-UI",
  "TypeScript",

  // Backend
  "Node.js",
  "Express",
  "Nest.js",
  "Fastify",
  "Python",
  "Django",
  "Flask",
  "FastAPI",
  "Java",
  "Spring Boot",
  "Quarkus",
  "C#",
  ".NET Core",
  "ASP.NET",
  "Ruby",
  "Ruby on Rails",
  "Go (Golang)",
  "Gin",
  "Fiber",
  "PHP",
  "Laravel",
  "Symfony",
  "Rust",
  "Actix",
  "Rocket",
  "Elixir",
  "Phoenix",

  // Databases (SQL/NoSQL)
  "PostgreSQL",
  "MySQL",
  "Microsoft SQL Server",
  "Oracle",
  "SQLite",
  "MongoDB",
  "Redis",
  "Cassandra",
  "Firebase/Firestore",
  "DynamoDB",
  "Neo4j",

  // DevOps & Cloud
  "AWS",
  "Google Cloud Platform (GCP)",
  "Microsoft Azure",
  "IBM Cloud",
  "Oracle Cloud",
  "Terraform",
  "AWS CloudFormation",
  "Jenkins",
  "GitHub Actions",
  "GitLab CI/CD",
  "CircleCI",
  "Travis CI",
  "Docker",
  "Kubernetes",
  "OpenShift",
  "Prometheus",
  "Grafana",
  "ELK Stack (Elasticsearch, Logstash, Kibana)",
  "Datadog",
  "New Relic",

  // Mobile
  "Swift",
  "SwiftUI",
  "Kotlin",
  "Jetpack Compose",
  "Flutter (Dart)",
  "React Native (JavaScript)",
  "Xamarin (C#)",

  // AI/ML
  "AIPython",
  "TensorFlow",
  "PyTorch",
  "R",
  "Apache Spark",
  "Hadoop",
  "OpenAI",
  "LangChain",

  // Blockchain
  "Ethereum (Solidity)",
  "Solana (Rust)",
  "Hyperledger Fabric",
  "Web3.js",
  "Ethers.js",

  // Desktop
  "Electron.js",
  "Qt (C++)",
  "JavaFX",
  "Tauri (Rust)",

  // Testing
  "Selenium",
  "Jest",
  "Mocha",
  "Cypress",
  "JUnit",
  "TestNG",
  "Postman",
  "Insomnia",

  // CMS
  "WordPress",
  "Drupal",
  "Strapi",
  "Contentful",

  // Full-Stack Combos
  "MERN (MongoDB + Express + React + Node.js)",
  "MEAN (MongoDB + Express + Angular + Node.js)",
  "MEVN (MongoDB + Express + Vue + Node.js)",
  "LAMP (Linux + Apache + MySQL + PHP)",
  "Django Stack (Django + PostgreSQL + React)",
  "JAMstack (JavaScript + APIs + Markup)",
];

const profileIcons = Array.from(
  { length: 12 },
  (_, i) => `https://api.dicebear.com/7.x/notionists/svg?seed=Profile${i + 1}`
);

export default function CreateCommunity() {
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [skillBoxOpen, setSkillBoxOpen] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [skillSearchTerm, setSkillSearchTerm] = useState("");
  const [communityName, setCommunityName] = useState("");
  const [members, setMembers] = useState([
    { id: 1, username: "", verified: undefined },
  ]);
  const handleSubmit = async (e) => {
  e.preventDefault();

  const payload = {
    creator_username: members[0]?.username.trim(), // Team leader
    name: communityName.trim(),
    tech_stack: selectedSkills, // Array of strings
    //experience: 1, // Fixed value for now
  };

  try {
    const response = await fetch("https://connect-saathi.vercel.app/community/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      console.log("Community created successfully!");
      // Optional: redirect or display success message
    } else {
      console.error("Failed to create community:", await response.text());
    }
  } catch (error) {
    console.error("Error creating community:", error);
  }

  
};

//   const verifyMember = async (id, username) => {
//   try {
//     const res = await fetch(
//       `https://connect-saathi.vercel.app/community/create/api/users/check?username=${encodeURIComponent(username)}`
//     );
//     const data = await res.json();

//     setMembers((prev) =>
//       prev.map((member) =>
//         member.id === id ? { ...member, verified: data.exists } : member
//       )
//     );
//   } catch (err) {
//     console.error("Verification failed:", err);
//     setMembers((prev) =>
//       prev.map((member) =>
//         member.id === id ? { ...member, verified: false } : member
//       )
//     );
//   }
// };
// const verifyMember = async (id, username) => {
//   try {
//     const res = await fetch(
//       `https://connect-saathi.vercel.app/user/${username}`
//     );
//     const data = await res.json();
//     console.log(data)
//     setMembers((prev) =>
//       prev.map((member) =>
//         member.id === id ? { ...member, verified: data.exists } : member
//       )
//     );
//   } catch (err) {
//     console.error("Verification failed:", err);
//     setMembers((prev) =>
//       prev.map((member) =>
//         member.id === id ? { ...member, verified: false } : member
//       )
//     );
//   }
// };
const verifyMember = async (id, username) => {
  try {
    const res = await fetch(
      `https://connect-saathi.vercel.app/user/${username}`
    );
    const data = await res.json();
    console.log(data);

    setMembers((prev) =>
      prev.map((member) =>
        member.id === id ? { ...member, verified: data.status } : member
      )
    );
  } catch (err) {
    console.error("Verification failed:", err);
    setMembers((prev) =>
      prev.map((member) =>
        member.id === id ? { ...member, verified: false } : member
      )
    );
  }
};



  // Handle username change resets verification
  const handleMemberChange = (id, value) => {
    setMembers((prev) =>
      prev.map((member) =>
        member.id === id
          ? { ...member, username: value, verified: undefined }
          : member
      )
    );
  };
  const addMember = () => {
  setMembers((prev) => [
    ...prev,
    { id: prev.length + 1, username: "", verified: undefined },
  ]);
};

  const handleSkillToggle = (skill) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const handleConfirmSkills = () => {
    setSkillBoxOpen(false);
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#000814] via-[#001d3d] to-[#003566] text-white py-10 px-4 sm:px-10 md:px-20">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-10 text-[#ffd60a]">
        Create a New Community
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-8 max-w-4xl mx-auto bg-[#001d3d] p-6 sm:p-8 rounded-2xl shadow-xl border border-[#ffc300]"
      >
        {/* Community Name */}
        <div>
          <label className="block mb-2 font-semibold text-[#ffc300]">
            Name of Community *
          </label>
          <input
            type="text"
            required
            value={communityName}
            placeholder="Enter community name"
            onChange={(e) => setCommunityName(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-[#000814] text-white border border-[#ffd60a] focus:outline-none"
          />
        </div>

        {/* Tech Skills Needed */}
        <div>
          <label className="block mb-2 font-semibold text-[#ffc300]">
            Tech Skills Needed *
          </label>
          <div className="relative">
            <div
              onClick={() => setSkillBoxOpen(!skillBoxOpen)}
              className="w-full px-4 py-2 bg-[#000814] text-white border border-[#ffd60a] rounded-lg cursor-pointer"
            >
              {selectedSkills.length
                ? selectedSkills.join(", ")
                : "Select skills"}
            </div>

            {skillBoxOpen && (
              <div className="absolute mt-2 w-full max-h-[400px] overflow-y-auto bg-[#000814] border border-[#ffd60a] rounded-lg z-10 shadow-2xl p-4 space-y-3">
                {/* Search bar */}
                <input
                  type="text"
                  placeholder="Search skills..."
                  className="w-full px-3 py-2 rounded-md bg-[#001d3d] text-white border border-[#ffd60a] focus:outline-none"
                  value={skillSearchTerm}
                  onChange={(e) => setSkillSearchTerm(e.target.value)}
                />

                {/* Action buttons */}
                <div className="flex justify-between pt-2">
                  <button
                    type="button"
                    onClick={() => setSkillBoxOpen(false)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    onClick={handleConfirmSkills}
                    className="bg-[#ffc300] hover:bg-[#ffd60a] text-black font-semibold px-4 py-1 rounded"
                  >
                    Confirm
                  </button>
                </div>

                {/* Skill checkboxes */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {skillOptions
                    .filter((skill) =>
                      skill
                        .toLowerCase()
                        .includes(skillSearchTerm.toLowerCase())
                    )
                    .map((skill) => (
                      <label
                        key={skill}
                        className="text-sm hover:text-[#ffc300] cursor-pointer flex items-center gap-2"
                      >
                        <input
                          type="checkbox"
                          checked={selectedSkills.includes(skill)}
                          onChange={() => handleSkillToggle(skill)}
                          className="accent-[#ffd60a]"
                        />
                        {skill}
                      </label>
                    ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Address */}
        <div>
          <label className="block mb-2 font-semibold text-[#ffc300]">
            Address *
          </label>
          <input
            type="text"
            required
            placeholder="Enter address"
            className="w-full px-4 py-2 rounded-lg bg-[#000814] text-white border border-[#ffd60a] focus:outline-none"
          />
        </div>

        {/* Profile Selection */}
        <div>
          <label className="block mb-2 font-semibold text-[#ffc300]">
            Choose a Profile Icon *
          </label>
          <div className="grid grid-cols-4 sm:grid-cols-6 gap-4">
            {profileIcons.map((url, index) => (
              <img
                key={index}
                src={url}
                alt={`Profile ${index + 1}`}
                onClick={() => setSelectedProfile(url)}
                className={`w-16 h-16 cursor-pointer rounded-full border-4 transition-all duration-200 ${
                  selectedProfile === url
                    ? "border-[#ffd60a] scale-110"
                    : "border-transparent"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Experience */}
        <div>
          <label className="block mb-2 font-semibold text-[#ffc300]">
            Experience *
          </label>
          <textarea
            required
            placeholder='If no experience, write "Just getting Started"'
            className="w-full px-4 py-2 h-24 rounded-lg bg-[#000814] text-white border border-[#ffd60a] resize-none focus:outline-none"
          />
        </div>

        <div>
          <label className="block mb-4 font-semibold text-[#ffc300]">
            Team Members *
          </label>
          <div className="space-y-4">
            {/* Team Leader */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
              <span className="text-white font-medium w-28">Team Leader:</span>
              <input
                type="text"
                required
                placeholder="Enter username"
                className="w-full sm:flex-1 px-4 py-2 rounded-lg bg-[#000814] text-white border border-[#ffd60a] focus:outline-none"
                value={members[0].username}
                onChange={(e) =>
                  handleMemberChange(members[0].id, e.target.value)
                }
              />
               <div className="flex items-center gap-2 flex-wrap mt-2">
                <button
                  type="button"
                  onClick={() =>
                    verifyMember(members[0].id, members[0].username)
                  }
                  className="bg-[#ffc300] hover:bg-[#ffd60a] text-black font-semibold px-4 py-2 rounded transition whitespace-nowrap"
                >
                  Verify
                </button>

                {/* Verification status */}
                {/* {members[0].verified === true && (
                  <span className="text-green-400 font-semibold whitespace-nowrap">
                    Verified ✔️
                  </span>
                )}
                {members[0].verified === false && (
                  <span className="text-red-500 font-semibold whitespace-nowrap">
                    Not Found ❌
                  </span>
                )}*/}
              </div> 
              {members[0].verified === true && (
  <span className="text-green-400 font-semibold whitespace-nowrap">
    Verified ✔️
  </span>
)}
{members[0].verified === false && (
  <span className="text-red-500 font-semibold whitespace-nowrap">
    Not Found ❌
  </span>
)}

              {members.slice(1).map((member, idx) => (
  <div
    key={member.id}
    className="flex flex-col sm:flex-row items-start sm:items-center gap-2"
  >
    <span className="text-white w-28">Member {idx + 1}:</span>
    <input
      type="text"
      placeholder="Enter username"
      className="w-full sm:flex-1 px-4 py-2 rounded-lg bg-[#000814] text-white border border-[#ffd60a] focus:outline-none"
      value={member.username}
      onChange={(e) => handleMemberChange(member.id, e.target.value)}
    />
    <button
      type="button"
      onClick={() => verifyMember(member.id, member.username)}
      className="bg-[#ffc300] hover:bg-[#ffd60a] text-black font-semibold px-4 py-2 rounded transition whitespace-nowrap"
    >
      Verify
    </button>

    {/* ✅ Show verification status per member */}
    {member.verified === true && (
      <span className="text-green-400 font-semibold ml-2 whitespace-nowrap">
        Verified ✔️
      </span>
    )}
    {member.verified === false && (
      <span className="text-red-500 font-semibold ml-2 whitespace-nowrap">
        Not Found ❌
      </span>
    )}
  </div>
))}

            </div>
            <button
              type="button"
              onClick={addMember}
              className="mt-3 bg-[#ffc300] hover:bg-[#ffd60a] text-black font-semibold px-4 py-2 rounded transition"
            >
              + Add Member
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-[#ffc300] hover:bg-[#ffd60a] text-black font-bold px-6 py-3 rounded-lg shadow-lg transition-transform hover:scale-105"
          >
            Create Community
          </button>
        </div>
      </form>
    </div>
  );
}





