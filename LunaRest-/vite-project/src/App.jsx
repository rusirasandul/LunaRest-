import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Prediction from "./components/Prediction";
import Setting from "./components/Setting";
import Journal from "./components/Journal";
import LandingPage from "./pages/LandingPage";
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
    </Router>
  );
}

export default App;
