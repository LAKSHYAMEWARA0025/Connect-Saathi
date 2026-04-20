import { useState, useEffect } from "react";

const skillOptions = [/* same skills array from before */
     // Frontend
  "HTML", "CSS", "JavaScript", "React.js", "Redux", "Context API", "Angular", 
  "Vue.js", "Svelte", "Next.js", "Nuxt.js", "Tailwind CSS", "Bootstrap", 
  "Material-UI", "TypeScript",

  // Backend
  "Node.js", "Express", "Nest.js", "Fastify", "Python", "Django", "Flask", 
  "FastAPI", "Java", "Spring Boot", "Quarkus", "C#", ".NET Core", "ASP.NET", 
  "Ruby", "Ruby on Rails", "Go (Golang)", "Gin", "Fiber", "PHP", "Laravel", 
  "Symfony", "Rust", "Actix", "Rocket", "Elixir", "Phoenix",

  // Databases (SQL/NoSQL)
  "PostgreSQL", "MySQL", "Microsoft SQL Server", "Oracle", "SQLite", "MongoDB", 
  "Redis", "Cassandra", "Firebase/Firestore", "DynamoDB", "Neo4j",

  // DevOps & Cloud
  "AWS", "Google Cloud Platform (GCP)", "Microsoft Azure", "IBM Cloud", 
  "Oracle Cloud", "Terraform", "AWS CloudFormation", "Jenkins", 
  "GitHub Actions", "GitLab CI/CD", "CircleCI", "Travis CI", "Docker", 
  "Kubernetes", "OpenShift", "Prometheus", "Grafana", 
  "ELK Stack (Elasticsearch, Logstash, Kibana)", "Datadog", "New Relic",

  // Mobile
  "Swift", "SwiftUI", "Kotlin", "Jetpack Compose", "Flutter (Dart)", 
  "React Native (JavaScript)", "Xamarin (C#)",

  // AI/ML
  "Python", "TensorFlow", "PyTorch", "R", "Apache Spark", "Hadoop", "OpenAI", 
  "LangChain",

  // Blockchain
  "Ethereum (Solidity)", "Solana (Rust)", "Hyperledger Fabric", "Web3.js", 
  "Ethers.js",

  // Desktop
  "Electron.js", "Qt (C++)", "JavaFX", "Tauri (Rust)",

  // Testing
  "Selenium", "Jest", "Mocha", "Cypress", "JUnit", "TestNG", "Postman", 
  "Insomnia",

  // CMS
  "WordPress", "Drupal", "Strapi", "Contentful",

  // Full-Stack Combos
  "MERN (MongoDB + Express + React + Node.js)", 
  "MEAN (MongoDB + Express + Angular + Node.js)", 
  "MEVN (MongoDB + Express + Vue + Node.js)", 
  "LAMP (Linux + Apache + MySQL + PHP)", 
  "Django Stack (Django + PostgreSQL + React)", 
  "JAMstack (JavaScript + APIs + Markup)"

];
const profileIcons = Array.from(
  { length: 12 },
  (_, i) => `https://api.dicebear.com/7.x/notionists/svg?seed=Profile${i + 1}`
);

export default function EditCommunity() {
  const [communityName, setCommunityName] = useState("Dev Ninjas");
  const [selectedSkills, setSelectedSkills] = useState(["React.js", "Node.js"]);
  const [skillBoxOpen, setSkillBoxOpen] = useState(false);
  const [skillSearchTerm, setSkillSearchTerm] = useState("");
  const [address, setAddress] = useState("BITS Pilani, Goa Campus");
  const [selectedProfile, setSelectedProfile] = useState(profileIcons[2]);
  const [experience, setExperience] = useState("Intermediate");
  const [members, setMembers] = useState([
    { id: 1, username: "teamleader", verified: true, isLeader: true },
    { id: 2, username: "devbuddy", verified: false },
  ]);

  const handleSkillToggle = (skill) => {
    setSelectedSkills((prev) =>
      prev.includes(skill)
        ? prev.filter((s) => s !== skill)
        : [...prev, skill]
    );
  };

  const handleConfirmSkills = () => setSkillBoxOpen(false);

  const handleMemberChange = (id, value) => {
    setMembers((prev) =>
      prev.map((m) =>
        m.id === id ? { ...m, username: value, verified: undefined } : m
      )
    );
  };

  const verifyMember = (id, username) => {
    setMembers((prev) =>
      prev.map((m) =>
        m.id === id
          ? {
              ...m,
              verified: username === "teamleader" || username === "devbuddy",
            }
          : m
      )
    );
  };

  const handleAddMember = () => {
    const newId = members.length + 1;
    setMembers([...members, { id: newId, username: "", verified: undefined }]);
  };

  const handleRemoveMember = (id) => {
    setMembers(members.filter((m) => m.id !== id));
  };

  const handleSave = () => {
    console.log({
      communityName,
      selectedSkills,
      address,
      selectedProfile,
      experience,
      members,
    });
    alert("Changes saved!");
  };

  const handleDeleteCommunity = () => {
    const confirm = window.confirm("Are you sure to delete this community?");
    if (confirm) {
      alert("Community deleted.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6 text-white bg-[#001d3d] rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-[#ffc300] text-center">
        Edit Community
      </h2>

      {/* Community Name */}
      <div>
        <label className="block mb-2 font-semibold text-[#ffc300]">
          Community Name *
        </label>
        <input
          value={communityName}
          onChange={(e) => setCommunityName(e.target.value)}
          className="w-full px-4 py-2 bg-[#000814] text-white border border-[#ffd60a] rounded-lg"
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
              <input
                type="text"
                placeholder="Search skills..."
                className="w-full px-3 py-2 rounded-md bg-[#001d3d] text-white border border-[#ffd60a] focus:outline-none"
                value={skillSearchTerm}
                onChange={(e) => setSkillSearchTerm(e.target.value)}
              />
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
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {skillOptions
                  .filter((skill) =>
                    skill.toLowerCase().includes(skillSearchTerm.toLowerCase())
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
        <label className="block mb-2 font-semibold text-[#ffc300]">Address</label>
        <input
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full px-4 py-2 bg-[#000814] text-white border border-[#ffd60a] rounded-lg"
        />
      </div>

      {/* Profile Selection */}
      <div>
        <label className="block mb-2 font-semibold text-[#ffc300]">Profile</label>
        <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
          {profileIcons.map((icon) => (
            <img
              key={icon}
              src={icon}
              alt="profile"
              onClick={() => setSelectedProfile(icon)}
              className={`w-12 h-12 p-1 cursor-pointer rounded-full border-2 ${
                selectedProfile === icon
                  ? "border-[#ffc300]"
                  : "border-transparent"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Experience */}
      <div>
        <label className="block mb-2 font-semibold text-[#ffc300]">
          Experience
        </label>
        <input
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
          className="w-full px-4 py-2 bg-[#000814] text-white border border-[#ffd60a] rounded-lg"
        />
      </div>

      {/* Members */}
      <div>
        <label className="block mb-2 font-semibold text-[#ffc300]">
          Members
        </label>
        {members.map((member) => (
          <div
            key={member.id}
            className="flex flex-wrap items-center gap-2 mb-3"
          >
            <input
              type="text"
              value={member.username}
              onChange={(e) =>
                handleMemberChange(member.id, e.target.value)
              }
              placeholder="Enter username"
              className="flex-1 px-4 py-2 bg-[#000814] text-white border border-[#ffd60a] rounded-lg"
            />
            <button
              type="button"
              onClick={() => verifyMember(member.id, member.username)}
              className="bg-[#ffc300] hover:bg-[#ffd60a] text-black font-semibold px-4 py-2 rounded transition whitespace-nowrap"
            >
              Verify
            </button>
            {member.verified === true && (
              <span className="text-green-400 font-semibold whitespace-nowrap">
                Verified ✔️
              </span>
            )}
            {member.verified === false && (
              <span className="text-red-500 font-semibold whitespace-nowrap">
                Not Found ❌
              </span>
            )}
            {!member.isLeader && (
              <button
                type="button"
                onClick={() => handleRemoveMember(member.id)}
                className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded"
              >
                Remove
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddMember}
          className="bg-[#0077b6] hover:bg-[#0096c7] text-white px-4 py-2 rounded"
        >
          + Add Member
        </button>
      </div>

      {/* Save & Delete Buttons */}
      <div className="flex flex-wrap justify-between gap-4 pt-4">
        <button
          type="button"
          onClick={handleDeleteCommunity}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded font-semibold"
        >
          Delete Community
        </button>
        <button
          type="button"
          onClick={handleSave}
          className="bg-[#ffc300] hover:bg-[#ffd60a] text-black px-6 py-2 rounded font-semibold"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
