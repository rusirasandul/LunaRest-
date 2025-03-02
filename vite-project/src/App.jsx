import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./layouts/Header";
import Hero from "./pages/Home";
import Setting from "./pages/Setting";
import Journal from "./pages/Journal";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/Signup";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="min-h-screen overflow-x-hidden font-heading">
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<Hero />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/setting" element={<Setting />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
