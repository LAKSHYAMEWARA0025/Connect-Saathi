# ConnectSaathi 🤝

> **A place where builders find builders.**

ConnectSaathi is a collaboration network for developers, designers, and builders who want to find the right teammates for hackathons, open-source projects, startup ideas, and side projects.

---

## 🚀 What We've Built — Current Version (V0)

This is the **first working version** of ConnectSaathi. The focus of V0 was to build a fully functional, responsive frontend that covers the core user journeys: discovering the platform, building a profile, and creating a community/project.

### ✅ Pages Delivered

| Page | Route | Status |
|---|---|---|
| 🏠 Landing / Home Page | `/` | ✅ Built |
| 🧑‍💻 Builder Profile Page | `/profile` | ✅ Built |
| 📝 Create Profile Form | `/create-profile` | ✅ Built |
| 🏘️ Create Community Form | `/create-community` | ✅ Built |
| 📋 Community Info Page | `/communityinfo` | ✅ Built |
| 👁️ Public Builder Profile | `/public-profile` | ✅ Built |

---

### 🏠 Landing Page (`/`)

The home page is the discovery hub of ConnectSaathi. It includes:

- **Sticky Header / Navbar** — Logo, navigation links (About, Contact, Notifications), mobile hamburger sidebar, and profile avatar shortcut
- **Hero Section** — Full-width banner with headline *"Build Teams. Connect Skills. Create Together."*, background image overlay, and tagline
- **Search Section** — Skill-based search bar with filter chips (Frontend, Backend, ML, Design, etc.) to discover builders
- **Communities Section** — Showcases active communities on the platform
- **Happy Users Section** — Social proof section highlighting active collaborators
- **About Section** — Product overview and value proposition
- **Footer** — Copyright and links

---

### 🧑‍💻 Builder Profile Page (`/profile`)

A complete, interactive builder identity page:

- **Profile Header** — Avatar, name, username, bio, location, role, social links (GitHub, LinkedIn, Portfolio, Website)
- **Skills Section** — Tech stack tags displayed as pill badges; fully editable in edit mode with the complete tech stack library
- **Hackathon Section** — Past hackathon entries with achievements; add/remove in edit mode
- **Team Preferences** — "Looking for Team?" toggle visible to other builders
- **Go to My Community** — Quick access button to builder's communities via a modal
- **Edit / Save Mode** — Toggle between view and edit mode with unsaved-change protection
- **Dark Mode** — Full dark/light mode toggle with smooth transitions (powered by Framer Motion)

---

### 📝 Create Builder Profile (`/create-profile`)

A focused form for new builders to set up their identity:

- **Bio** — Short description textarea
- **LinkedIn URL** — Required social link
- **GitHub URL** — Required social link
- **Portfolio URL** — Optional external link
- **Years of Experience** — Number input
- **Skills / Tech Stack** — Multi-select dropdown with live search across the full tech stack library (100+ technologies)
- **Projects** — Dynamic list with add/remove; each project has a name and link
- **API Integration** — Submits data to the ConnectSaathi backend (`/user/save/profile/:username`)

---

### 🏘️ Create Community (`/create-community`)

Builders can form a project team or community:

- **Community Name** — Required text field
- **Tech Skills Needed** — Searchable, multi-select skill picker
- **Address / Location** — Optional context field
- **Profile Icon Picker** — Grid of 12 generated avatars to choose from
- **Experience** — Description textarea for team background
- **Team Members** — Dynamic member list with username inputs and a **Verify** button that checks if the user exists in the system
- **API Integration** — Posts community to the backend (`/community/create`)

---

### 👁️ Public Builder Profile (`/public-profile`)

A read-only view of any builder's profile for external visitors:

- Profile header (name, bio, role)
- Skills tags
- Hackathon history

---

### 📁 Project Structure

```
src/
├── pages/
│   ├── Home/
│   │   ├── HomePage.jsx          # Page assembly
│   │   ├── Header.jsx            # Sticky navbar + mobile sidebar
│   │   ├── SearchSection.jsx     # Skill search + filter chips
│   │   ├── CommunitiesSection.jsx
│   │   ├── HappyUserSection.jsx
│   │   ├── AboutSection.jsx
│   │   └── (Footer inline in HomePage)
│   ├── profile/
│   │   ├── ProfilePage.jsx       # Full profile with edit mode
│   │   ├── ProfileHeader.jsx
│   │   ├── SkillsSection.jsx
│   │   ├── HackathonSection.jsx
│   │   ├── GoToMyCommunity.jsx
│   │   ├── Modal.jsx
│   │   └── techStacks.js         # Master list of 100+ technologies
│   ├── CreateProfile/
│   │   └── CreateProfile.jsx     # Profile creation form
│   ├── Community/
│   │   ├── CreateCommunity.jsx   # Community creation form
│   │   ├── CommunityInfo.jsx     # Community detail view
│   │   └── EditCommunity.jsx     # Community editing form
│   ├── viewerSideProfile/
│   │   ├── PublicProfilePage.jsx
│   │   ├── ProfileHeader.jsx
│   │   ├── SkillsSection.jsx
│   │   └── HackathonSection.jsx
│   └── auth/                     # ⚠️ Code preserved — disabled in V0
│       ├── LoginSignUp.jsx
│       └── AuthForm.jsx
├── App.jsx                        # Routing (auth guards removed for V0)
├── main.jsx
└── index.css
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend Framework | React 18 + Vite |
| Styling | Tailwind CSS |
| Routing | React Router v6 |
| Animations | Framer Motion |
| Icons | Heroicons |
| Backend API | Node.js / Express |
| Database | MongoDB |
| Hosting | Vercel |

---

## ⚙️ Getting Started

### Prerequisites
- Node.js ≥ 18
- npm ≥ 9

### Installation & Local Development

```bash
# Clone the repository
git clone https://github.com/your-org/ConnectSaathi-Frontend.git
cd ConnectSaathi-Frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

App runs at `http://localhost:5173`

---

## 🔮 Next Phase — Planned Features

The following features are **planned for the next development phase** and are not yet implemented:

### Phase 2 — Authentication & Core Matching

| Feature | Description |
|---|---|
| 🔐 User Authentication | Signup, Login, and session management (code scaffolded in `/auth`, will be re-enabled) |
| 🔍 Skill-Based Matching Engine | Algorithm to suggest builders based on complementary skills |
| 📨 In-App Messaging | Direct messaging between builders (currently replaced by Discord/WhatsApp links) |
| 🐙 GitHub OAuth | One-click signup via GitHub for faster onboarding |
| 🔎 Project Discovery Feed | Browse all active projects and hackathon teams in one feed |

### Phase 3 — Community & Reputation

| Feature | Description |
|---|---|
| 🏆 Hackathon Discovery | Browse and join hackathon teams forming on the platform |
| 🌐 Open-Source Project Discovery | Find OSS projects looking for contributors |
| ⭐ Collaboration Reputation System | Build credibility through completed projects and peer reviews |
| 🤖 GitHub Auto-Tagging | Automatically suggest skills from a user's GitHub activity |
| 📊 Team Recommendations | Platform-suggested teammates based on project requirements |

### Phase 4 — Builder Network

| Feature | Description |
|---|---|
| 🧠 AI Teammate Matching | Intelligent matching using skill graphs and collaboration history |
| ✅ Verified Builder Badges | Verified reputation signals for serious builders |
| 🚀 Startup Co-founder Matching | Dedicated flow for founders looking for technical co-founders |
| 💳 Pro Builder Tier | Advanced filters, priority visibility — ₹199/month |

---

## 📊 Product Metrics

**North Star Metric:** Successful collaborations formed  
*(Defined as: a project where 2+ builders connect and start collaboration)*

**Target OKRs:**
- 500+ builder profiles created in first 3 months
- 300 successful collaborations in 6 months
- 30% project-to-team formation rate within 6 months

---

## ⚠️ Known Risks & Mitigations

| Risk | Mitigation |
|---|---|
| Low early network density | Start with college builders + hackathon communities |
| Fake / inactive profiles | GitHub verification + activity signals (Phase 2) |
| Skill mismatch | Better skill tagging + reputation signals (Phase 3) |
| MongoDB free tier limits | Monitor usage; upgrade on growth |

---

## 💬 Contact & Community

> *Stop scrolling Discord. Start building.*

Reach out via GitHub Issues for bugs and feature requests.

---

*Built with ❤️ by the ConnectSaathi team.*
