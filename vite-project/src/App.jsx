import { Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./layouts/Header";
import Footer from "./layouts/Footer";
import Home from "./pages/Home";
import Journal from "./pages/Journal";
import Setting from "./pages/Setting";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import AboutAndFAQ from "./pages/About";
import ContactPage from "./pages/ContactPage";
import Dashboard from "./pages/Dashboard.jsx";
import Recommendation from "./pages/Recommendation.jsx";
import Article from "./pages/Article.jsx";
import GoalTracker from "./pages/GoalTracker.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import Quiz from "./pages/Quiz";
import PrivacyPolicy from "./pages/PrivacyPolicy.jsx";
import LoadingPage from "./pages/LoadingPage";
import MusicPlayer from "./pages/MusicPlayer"; // Import the player

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden font-heading">
      <Navbar />

      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/setting" element={<Setting />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/goalTracker" element={<GoalTracker />} />
          <Route path="/about" element={<AboutAndFAQ />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/recommendation" element={<Recommendation />} />
          <Route path="/article" element={<Article />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/privacyPolicy" element={<PrivacyPolicy />} />
        </Routes>
      </div>

      <Footer />

      {/* Music Player - Full player only on Home, Mini on other pages */}
      {location.pathname !== "/" && <MusicPlayer />}
    </div>
  );
}

export default App;