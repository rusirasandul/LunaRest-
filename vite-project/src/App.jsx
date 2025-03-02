import { Routes, Route } from "react-router-dom";
import Navbar from "./layouts/Header";
import Home from "./pages/Home";
import Setting from "./pages/Setting";
import Journal from "./pages/Journal";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import "./App.css";

function App() {
  return (
    <div className="min-h-screen overflow-x-hidden font-heading">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/journal" element={<Journal />} />
        <Route path="/setting" element={<Setting />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
    </div>
  );
}

export default App;
