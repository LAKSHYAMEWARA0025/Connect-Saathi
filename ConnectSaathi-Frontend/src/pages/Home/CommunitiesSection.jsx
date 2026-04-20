import React from "react";
import { useNavigate } from "react-router-dom";

const communities = [
{
    name: "Tech Avengers",
    image: "https://api.dicebear.com/7.x/notionists/svg?seed=Avenger",
    expertise: "React,Python,TensorFlow",
  },
  {
    name: "CodeCrafters",
    image: "https://api.dicebear.com/7.x/notionists/svg?seed=Profile5",
    expertise: "Python, Flask Developers",
  },
  {
    name: "UI Ninjas",
    image: "https://api.dicebear.com/7.x/notionists/svg?seed=Profile2",
    expertise: "UI/UX Designers, Figma Experts",
  },
  {
    name: "AI Brains",
    image:"https://api.dicebear.com/7.x/notionists/svg?seed=Profile3",
    expertise: "Machine Learning, NLP",
  },
  {
    name: "Web Warriors",
    image:"https://api.dicebear.com/7.x/notionists/svg?seed=Profile4",
    expertise: "HTML, CSS, JavaScript",
  },
  {
    name: "Data Dominators",
    image: "https://api.dicebear.com/7.x/notionists/svg?seed=Profile6",
    expertise: "Data Science, Pandas, NumPy",
  },
  {
    name: "Cyber Knights",
    image:"https://api.dicebear.com/7.x/notionists/svg?seed=Profile11",
    expertise: "Cybersecurity, Networks",
  },
  {
    name: "DevOps Crew",
    image: "https://api.dicebear.com/7.x/notionists/svg?seed=Profile7",
    expertise: "Docker, Kubernetes, AWS",
  },
];

export default function CommunitiesSection() {
  const navigate = useNavigate();

  return (
    <section className="px-4 sm:px-8 py-12" id="top-communities">
      <h2 className="text-3xl sm:text-4xl font-bold text-[#0077b6ff] mb-10 text-center">
        Top Communities
      </h2>

      <div className="grid gap-8 grid-cols-1 sm:grid-cols-3">
        {communities.map(({ name, image, expertise }, idx) => (
          <div
            key={idx}
            onClick={() => navigate("/communityinfo")}  // <-- Navigate to static page on click
            className="p-5 rounded-lg shadow-lg cursor-pointer
              transform transition duration-300 ease-in-out
              hover:scale-105 hover:shadow-2xl
              bg-gradient-to-br from-[#90e0efff] via-[#48cae4ff] to-[#00b4d8ff]
              text-white
              opacity-0 animate-fadeIn scale-95 animate-fill-forwards"
            style={{ animationDelay: `${idx * 0.15}s` }}
          >
            <div className="flex items-center gap-4 mb-3">
              <img
                src={image}
                alt={`${name} Profile`}
                className="w-14 h-14 rounded-full object-cover border-2 border-white"
              />
              <div>
                <h3 className="font-extrabold text-lg drop-shadow-md">{name}</h3>
                <p className="text-sm drop-shadow-md">{expertise}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
