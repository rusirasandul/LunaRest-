import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from "react-router-dom";
import { MusicPlayerProvider } from './pages/MusicPlayerContext'; // Fixed import path
import Navbar from "./layouts/Header";
import Footer from "./layouts/Footer";
import Journal from "./pages/Journal";
import Setting from "./pages/Setting";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import AboutAndFAQ from "./pages/About";
import ContactPage from "./pages/ContactPage";
import Dashboard from "./pages/Dashboard";
import Recommendation from "./pages/Recommendation";
import Article from "./pages/Article";
import GoalTracker from "./pages/GoalTracker";
import ProfilePage from "./pages/ProfilePage";
import Quiz from "./pages/Quiz";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import LoadingPage from "./pages/LoadingPage";
import MiniPlayer from "./pages/MiniPlayer"; // Fixed import path
import Home from "./pages/Home"; // Added missing import

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
    <MusicPlayerProvider>
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
        
        {/* Show MiniPlayer on all pages except home (/) */}
        {location.pathname !== "/" && <MiniPlayer />}
      </div>
    </MusicPlayerProvider>
  );
}

export default App;
