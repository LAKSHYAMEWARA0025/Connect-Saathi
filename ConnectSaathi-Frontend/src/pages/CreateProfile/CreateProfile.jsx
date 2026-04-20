import React, { useState, useRef, useEffect } from "react";
import { allTechStacks } from "../profile/techStacks";

export default function CreateProfile() {
  const [form, setForm] = useState({
    bio: "",
    linkedin_url: "",
    github_url: "",
    portfolio_url: "",
    years_exp: "",
    skills: [],
    projects: [{ name: "", link: "" }],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showSkillsModal, setShowSkillsModal] = useState(false);
  const [skillsSearch, setSkillsSearch] = useState("");
  const skillsModalRef = useRef(null);

  // Close skills modal on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        skillsModalRef.current &&
        !skillsModalRef.current.contains(event.target)
      ) {
        setShowSkillsModal(false);
        setSkillsSearch("");
      }
    }
    if (showSkillsModal) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showSkillsModal]);

  // Projects array handlers
  const handleProjectChange = (i, field, value) => {
    const projects = [...form.projects];
    projects[i][field] = value;
    setForm({ ...form, projects });
  };
  const addProject = () =>
    setForm({
      ...form,
      projects: [...form.projects, { name: "", link: "" }],
    });
  const removeProject = (i) => {
    const projects = [...form.projects];
    projects.splice(i, 1);
    setForm({ ...form, projects });
  };

  // Skills modal handlers
  const handleSkillToggle = (skill) => {
    setForm((prev) => {
      const skills = prev.skills.includes(skill)
        ? prev.skills.filter((s) => s !== skill)
        : [...prev.skills, skill];
      return { ...prev, skills };
    });
  };

  const handleRemoveSkill = (skill) => {
    setForm((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skill),
    }));
  };

  // Form field handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // Submit handler using fetch and localStorage for username
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const filteredProjects = form.projects.filter(
        (p) => p.name.trim() !== "" || p.link.trim() !== ""
      );
      const payload = {
        ...form,
        years_exp: Number(form.years_exp),
        skills: form.skills.length ? form.skills : undefined,
        projects: filteredProjects.length ? filteredProjects : undefined,
      };
      // AUTH DISABLED FOR NOW — username is hardcoded for testing
      // const userAuth = localStorage.getItem("user_auth");
      // const username = userAuth ? JSON.parse(userAuth).username : null;
      // if (!username) {
      //   setError("Username not found in local storage.");
      //   setLoading(false);
      //   return;
      // }
      const username = "guest_user"; // TODO: replace with real auth when re-enabled
      const res = await fetch(
        `https://connect-saathi.vercel.app/user/save/profile/${username}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );
      if (!res.ok) {
        // Try to extract server error message if available
        let message = "Failed to create profile. Please try again.";
        try {
          const errorData = await res.json();
          if (errorData && errorData.message) {
            message = errorData.message;
          }
        } catch {}
        throw new Error(message);
      }
      window.location.href = "/home"; // was "/" (login) — now goes to Home
    } catch (err) {
      setError(err.message || "Failed to create profile. Please try again.");
      console.error("Profile creation error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Filter tech stacks for search
  const filteredTechStacks = allTechStacks.filter((tech) =>
    tech.toLowerCase().includes(skillsSearch.toLowerCase())
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-purple-500 to-indigo-700">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-lg"
      >
        <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">
          Create Your Profile
        </h2>
        {error && (
          <div className="text-red-600 font-semibold mb-4">{error}</div>
        )}

        {/* Bio */}
        <div className="mb-4">
          <label className="block text-blue-800 font-semibold mb-1">
            Bio
          </label>
          <textarea
            name="bio"
            value={form.bio}
            onChange={handleChange}
            className="w-full border border-purple-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
            rows={3}
            style={{ minHeight: "72px", maxHeight: "72px" }}
            placeholder="Tell us about yourself"
          />
        </div>

        {/* LinkedIn */}
        <div className="mb-4">
          <label className="block text-blue-800 font-semibold mb-1">
            LinkedIn URL <span className="text-red-500">*</span>
          </label>
          <input
            type="url"
            name="linkedin_url"
            value={form.linkedin_url}
            onChange={handleChange}
            required
            className="w-full border border-blue-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="https://linkedin.com/in/yourprofile"
          />
        </div>

        {/* GitHub */}
        <div className="mb-4">
          <label className="block text-blue-800 font-semibold mb-1">
            GitHub URL <span className="text-red-500">*</span>
          </label>
          <input
            type="url"
            name="github_url"
            value={form.github_url}
            onChange={handleChange}
            required
            className="w-full border border-blue-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="https://github.com/yourprofile"
          />
        </div>

        {/* Portfolio */}
        <div className="mb-4">
          <label className="block text-blue-800 font-semibold mb-1">
            Portfolio URL
          </label>
          <input
            type="url"
            name="portfolio_url"
            value={form.portfolio_url}
            onChange={handleChange}
            className="w-full border border-purple-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
            placeholder="https://yourportfolio.com"
          />
        </div>

        {/* Years of Experience */}
        <div className="mb-4">
          <label className="block text-blue-800 font-semibold mb-1">
            Years of Experience <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="years_exp"
            value={form.years_exp}
            onChange={handleChange}
            required
            min={0}
            className="w-full border border-blue-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="e.g. 3"
          />
        </div>

        {/* Skills (Tech Stack) */}
        <div className="mb-4 relative">
          <label className="block text-blue-800 font-semibold mb-1">
            Skills (Tech Stack)
          </label>
          <div
            className="w-full min-h-[44px] border border-purple-300 rounded-lg p-2 flex flex-wrap gap-2 items-center cursor-pointer bg-gray-50"
            onClick={() => setShowSkillsModal(true)}
            tabIndex={0}
          >
            {form.skills.length === 0 && (
              <span className="text-gray-400">Click to select skills</span>
            )}
            {form.skills.map((skill) => (
              <span
                key={skill}
                className="flex items-center bg-gradient-to-r from-blue-400 to-purple-400 text-white px-2 py-1 rounded-full text-sm"
              >
                {skill}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveSkill(skill);
                  }}
                  className="ml-1 text-xs font-bold hover:text-red-200"
                  aria-label={`Remove ${skill}`}
                >
                  &times;
                </button>
              </span>
            ))}
          </div>
          {/* Modal/Dropdown for skills selection */}
          {showSkillsModal && (
            <div
              ref={skillsModalRef}
              className="absolute z-20 mt-2 left-0 w-full bg-white border border-purple-300 rounded-lg shadow-xl max-h-64 overflow-y-auto"
            >
              <div className="p-2 sticky top-0 bg-white z-10">
                <input
                  type="text"
                  value={skillsSearch}
                  onChange={(e) => setSkillsSearch(e.target.value)}
                  className="w-full border border-purple-200 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-purple-400"
                  placeholder="Search tech stack..."
                  autoFocus
                />
              </div>
              <div>
                {filteredTechStacks.length === 0 ? (
                  <div className="p-2 text-gray-400">No results found</div>
                ) : (
                  filteredTechStacks.map((tech) => (
                    <label
                      key={tech}
                      className="flex items-center px-3 py-1 hover:bg-purple-50 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={form.skills.includes(tech)}
                        onChange={() => handleSkillToggle(tech)}
                        className="mr-2 accent-purple-500"
                      />
                      {tech}
                    </label>
                  ))
                )}
              </div>
              <div className="p-2 flex justify-end">
                <button
                  type="button"
                  className="px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded shadow hover:from-blue-600 hover:to-purple-600"
                  onClick={() => {
                    setShowSkillsModal(false);
                    setSkillsSearch("");
                  }}
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Projects */}
        <div className="mb-6">
          <label className="block text-blue-800 font-semibold mb-1">
            Projects
          </label>
          {form.projects.map((project, i) => (
            <div
              key={i}
              className="mb-3 p-3 bg-blue-50 rounded-lg border border-blue-100"
            >
              <input
                type="text"
                value={project.name}
                onChange={(e) =>
                  handleProjectChange(i, "name", e.target.value)
                }
                className="w-full mb-2 border border-purple-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                placeholder="Project Name"
              />
              <textarea
                value={project.link}
                onChange={(e) =>
                  handleProjectChange(i, "link", e.target.value)
                }
                className="w-full border border-purple-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none"
                rows={2}
                style={{ minHeight: "56px", maxHeight: "56px" }}
                placeholder="Project link"
              />
              <button
                type="button"
                onClick={() => removeProject(i)}
                className="mt-2 px-2 py-1 bg-blue-100 text-blue-600 rounded hover:bg-blue-200 disabled:opacity-50"
                disabled={form.projects.length === 1}
              >
                &times; Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addProject}
            className="px-3 py-1 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded shadow hover:from-purple-600 hover:to-blue-600"
          >
            + Add Project
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-lg shadow-lg hover:from-blue-700 hover:to-purple-700 transition"
        >
          {loading ? "Creating..." : "Create Profile"}
        </button>
      </form>
    </div>
  );
}
