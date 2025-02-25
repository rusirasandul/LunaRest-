import { useState } from "react";
import WelcomeCard from "./components/WelcomeCard";
import Quiz from "./components/Quiz";

function App() {
  const [quizStart, setQuizStart] = useState(false);

  return quizStart ? <Quiz /> : <WelcomeCard setQuizStart={setQuizStart} />;
}

export default App;
