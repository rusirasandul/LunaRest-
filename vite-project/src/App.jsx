import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./layouts/Header";
import Home from "./pages/Home";
import Setting from "./pages/Setting";
import Journal from "./pages/Journal";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import Footer from "./layouts/Footer";
import AboutAndFAQ from "./pages/About";
import ContactPage from "./pages/ContactPage";
import LoadingPage from "./pages/LoadingPage";
import Dashboard from "./pages/Dashboard.jsx";
import Recommendation from "./pages/Recommendation.jsx";
import Article from "./pages/Article.jsx";
import GoalTracker from "./pages/GoalTracker.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
//import WelcomeCard from "./pages/WelcomeCard";
import Quiz from "./pages/Quiz";
import PrivacyPolicy from "./pages/PrivacyPolicy.jsx";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [pageChanged, setPageChanged] = useState(false);

  useEffect(() => {
    // Initial loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // 3s loading time for initial page load

    return () => clearTimeout(timer);
  }, []);

  // Listen for route changes to show loading screen
  useEffect(() => {
    if (pageChanged) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
        setPageChanged(false);
      }, 1500); // shorter loading time for subsequent page changes

      return () => clearTimeout(timer);
    }
  }, [pageChanged]);

  // Function to handle page changes
  const handlePageChange = () => {
    setPageChanged(true);
  };

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden font-heading">
      {/* Fixed navbar with z-index to ensure it stays on top */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
        <Navbar />
      </div>
      
      {/* Main content with padding-top to account for fixed navbar height */}
      <div className="flex-grow pt-5 mt-16">
        {/* The mt-16 accounts for navbar height, pt-5 gives the 20px spacing */}
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
    </div>
  );
}

export default App;

/*function App() {
  const [quizStart, setQuizStart] = useState(false);

  return quizStart ? <Quiz /> : <WelcomeCard setQuizStart={setQuizStart} />;
} */