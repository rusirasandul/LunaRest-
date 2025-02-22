import { BrowserRouter as Router } from "react-router-dom"
import LandingPage from "./pages/LandingPage"

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <LandingPage />
      </div>
    </Router>
  )
}

export default App

