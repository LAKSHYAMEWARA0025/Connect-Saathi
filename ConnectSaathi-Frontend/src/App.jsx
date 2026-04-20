// import LoginSignUp from "./pages/auth/LoginSignUp"; // AUTH DISABLED FOR NOW
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Navigate removed (auth disabled)
import ProfilePage from "./pages/profile/ProfilePage";
import PublicProfilePage from "./pages/viewerSideProfile/PublicProfilePage";
import Homepage from "./pages/Home/HomePage.jsx";
import CreateCommunity from "./pages/Community/CreateCommunity.jsx";
import CommunityInfo from "./pages/Community/CommunityInfo.jsx";
import CreateProfile from "./pages/CreateProfile/CreateProfile.jsx";

function App() {
  // AUTH DISABLED FOR NOW
  // const isAuthenticated = localStorage.getItem("user_auth") !== null;
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth guards removed — all routes accessible directly */}
        <Route path="/home" element={<Homepage />} />
        <Route path="/create-community" element={<CreateCommunity />} />
        <Route path="/communityinfo" element={<CommunityInfo />} />
        <Route path="/profile" element={<ProfilePage />} />
        {/* <Route path="/" element={<LoginSignUp />} /> */}
        <Route path="/" element={<Homepage />} />
        <Route path="/create-profile" element={<CreateProfile />} />
        {/* Add other routes here as needed */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
