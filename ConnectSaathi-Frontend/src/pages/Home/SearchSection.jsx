import React, { useState } from 'react';

const allSkills = [
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

const SearchSection = () => {
  const [showSkills, setShowSkills] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState([]);

  const toggleSkillBox = () => setShowSkills(!showSkills);

  const handleSkillClick = (skill) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter((s) => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const handleSearch = () => {
    // Send selectedSkills to backend here
    console.log('Selected Skills:', selectedSkills);
  };

  return (
    <section className="bg-[#caf0f8] py-12 px-4 sm:px-8 lg:px-20 text-center">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#023e8a] mb-6">
        Find Your Perfect Team Match
      </h2>

      <div className="relative max-w-3xl mx-auto w-full">
        {/* Search Bar */}
        <div
          onClick={toggleSkillBox}
          className="cursor-pointer border-2 border-[#0077b6] rounded-lg p-4 bg-white text-left shadow-md transition-transform hover:scale-105"
        >
          <p className="text-sm sm:text-base text-gray-600">
            {selectedSkills.length > 0
              ? selectedSkills.join(', ')
              : 'Click to select skills...'}
          </p>
        </div>

        {/* Skill Dropdown Box */}
        {showSkills && (
          <div className="absolute w-full bg-white border border-gray-300 mt-2 p-4 rounded-lg shadow-lg z-10 max-h-64 overflow-y-auto text-left">
            <div className="flex justify-between mb-3">
              <span className="font-semibold text-[#0077b6]">Choose Skills</span>
              <button
                className="text-sm text-red-600 hover:underline"
                onClick={() => setShowSkills(false)}
              >
                Close
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {allSkills.map((skill) => (
                <button
                  key={skill}
                  onClick={() => handleSkillClick(skill)}
                  className={`px-3 py-1 rounded-full border transition-transform text-sm font-medium hover:scale-105 ${
                    selectedSkills.includes(skill)
                      ? 'bg-[#48cae4] text-white border-[#00b4d8]'
                      : 'bg-white text-[#0077b6] border-[#90e0ef]'
                  }`}
                >
                  {skill}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Search Button */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={handleSearch}
            className="bg-[#0077b6] text-white text-sm sm:text-base font-semibold px-6 py-2 rounded-lg hover:bg-[#023e8a] transition-all duration-300"
          >
            Search
          </button>
        </div>
      </div>
    </section>
  );
};

export default SearchSection;
