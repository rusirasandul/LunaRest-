import { useState } from "react";
import { questions } from "../data";

const Quiz = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [quizComplete, setQuizComplete] = useState(false);

  const handleAnswerChange = (option) => {
    setAnswers((prev) => ({ ...prev, [currentIndex]: option }));
  };

    // Added this function to handle text input for questions without options
    const handleTextInputChange = (e) => {
      setAnswers((prev) => ({ ...prev, [currentIndex]: e.target.value }))
    }

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setQuizComplete(true);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="h-screen w-screen bg-[url(/background.jpg)] bg-cover bg-center">
      {/* Centered Quiz Card */}
      <div className="relative flex items-center justify-center min-h-screen p-4">
        <div className="bg-white/70 rounded-3xl p-6 w-[650px] min-h-[500px] flex flex-col items-center shadow-2xl border border-white/30">
          {/* Logo */}
          <div className="w-12 h-12 self-start">
            <img
              src="/logo.png"
              alt="Logo"
              className="w-full h-full object-contain"
            />
          </div>

          {!quizComplete ? (
            <div className="w-full flex flex-col items-center text-center gap-6">
              {/* Question */}
              <h3 className="text-2xl font-heading font-semibold text-blue-950">
                {questions[currentIndex].question}
              </h3>

              {/* Options */}
              <div className="w-full flex flex-col items-center gap-3">
                {questions[currentIndex].options.length > 0 ? (
                  // Render radio buttons for questions with options
                  questions[currentIndex].options.map((option, idx) => (
                  <label
                    key={idx}
                    className="flex items-center gap-3 w-[80%] bg-white/90 p-3 rounded-md border border-gray-300 cursor-pointer hover:bg-blue-100 transition"
                  >
                    <input
                      type="radio"
                      name={`question-${currentIndex}`}
                      value={option}
                      checked={answers[currentIndex] === option}
                      onChange={() => handleAnswerChange(option)}
                      className="h-5 w-5"
                    />
                    <span className="text-lg">{option}</span>
                  </label>
                ))
              ) : (
                // Render text input for questions without options
                // part that provides text fields for user input
                <input
                  type="text"
                  value={answers[currentIndex] || ""}
                  onChange={handleTextInputChange}
                  placeholder="Enter your answer here"
                  className="w-[80%] bg-white/90 p-3 rounded-md border border-gray-300 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              )}
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-between w-full mt-6">
                <button
                  onClick={handlePrevious}
                  disabled={currentIndex === 0}
                  className={`h-[50px] w-[40%] rounded-lg text-lg font-semibold shadow-md shadow-gray-600 transition-colors ${
                    currentIndex === 0
                      ? "bg-gray-400 text-white cursor-not-allowed"
                      : "bg-blue-950 text-white hover:bg-blue-900"
                  }`}
                >
                  Previous
                </button>

                <button
                  onClick={handleNext}
                  className="h-[50px] w-[40%] rounded-lg text-lg font-semibold bg-blue-950 text-white hover:bg-blue-900 cursor-pointer transition-colors shadow-md shadow-gray-600"
                >
                  {currentIndex === questions.length - 1 ? "Submit" : "Next"}
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center w-full">
              <h3 className="text-2xl font-bold text-blue-950 mb-4">
                Quiz Completed!
              </h3>
              <h4 className="text-xl font-semibold text-gray-700">
                Your Answers:
              </h4>
              <ul className="text-left mt-3 space-y-3">
                {questions.map((q, index) => (
                  <li key={index} className="border-b border-gray-300 pb-2">
                    <p className="font-medium">{q.question}</p>
                    <p>
                      <strong>Selected:</strong> {answers[index] || "No answer"}
                    </p>
                    <p>
                      <strong>Correct:</strong> {q.answer}
                    </p>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => window.location.reload()}
                className="mt-6 h-[50px] w-[60%] rounded-lg text-lg font-semibold bg-green-600 text-white hover:bg-green-700 transition-colors shadow-md shadow-gray-600"
              >
                Restart Quiz
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
