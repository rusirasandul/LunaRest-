import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./layouts/Header";
import Hero from "./pages/Home";
import Prediction from "./pages/prediction";
import Setting from "./pages/Setting";
import Journal from "./pages/Journal";
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
