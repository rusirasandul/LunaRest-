import { Routes, Route } from "react-router-dom";
import {useState, useEffect } from "react";
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
//import WelcomeCard from "./pages/WelcomeCard";
//import Quiz from "./pages/Quiz";


function App() {
  const[isLoading,setIsLoading] = useState(true)

  useEffect (()=>{
    //loading time or wait for actual resources to load 
    const timer =setTimeout(()=>{
      setIsLoading(false)
    },3000) // this is for 3 s loading time 

    return () => clearTimeout(timer)
  },[])

  if (isLoading){
    return <LoadingPage/>
  }
  
  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden font-heading">
      <Navbar />
      
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/setting" element={<Setting />} />cd
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/about" element={<AboutAndFAQ/>} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/recommendation" element={<Recommendation />} />
          <Route path="/article" element={<Article />} />
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