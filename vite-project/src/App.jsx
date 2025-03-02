import {BrowserRouter as Router, Route} from "react-router-dom";
import Navbar from "./layouts/Header";
import Hero from "./pages/Home";
import Prediction from "./pages/prediction";
import Setting from "./pages/Setting";
import Journal from "./pages/Journal";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="min-h-screen overflow-x-hidden font-heading">
        <Navbar />
        <Hero />
        <Prediction />
        <Journal />
        <Setting />
        <LandingPage />
      </div>
      <Route path="/" element={<LoginPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
    </Router>
  );
}

export default App;
