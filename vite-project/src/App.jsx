import { Routes, Route } from "react-router-dom";
import Navbar from "./layouts/Header";
import Home from "./pages/Home";
import Setting from "./pages/Setting";
import Journal from "./pages/Journal";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import Footer from "./layouts/Footer";
import AboutAndFAQ from "./pages/About";
import ContactPage from "./pages/ContactPage";
import "./App.css";

function App() {
  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden font-heading">
      <Navbar />
      
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/setting" element={<Setting />} />
          <Route path="/landing" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/about" element={<AboutAndFAQ/>} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </div>

      <Footer /> 
    </div>
  );
}

export default App;
