// App.jsx
import Navbar from "./layouts/Header";
import Home from "./pages/Home";
import Prediction from "./pages/prediction";
import Setting from "./pages/Setting";
import Journal from "./pages/Journal";
import LandingPage from "./pages/LandingPage";
import "./App.css";

function App() {
  return (
    <div className="min-h-screen overflow-x-hidden font-heading">
      <Navbar />
      <Home />
      <Prediction />
      <Journal />
      <Setting />
      <LandingPage />
    </div>
  );
}

export default App;
