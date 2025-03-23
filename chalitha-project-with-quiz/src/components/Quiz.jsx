"use client"

import { useState } from "react"
import { questions } from "../data"

const Quiz = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [quizComplete, setQuizComplete] = useState(false)
  const [error, setError] = useState("")

  // Handle radio button selection
  const handleAnswerChange = (option) => {
    setAnswers((prev) => ({ ...prev, [currentIndex]: option }))
    setError("")
  }

  // Handle text input changes
  const handleTextInputChange = (e) => {
    const value = e.target.value
    setAnswers((prev) => ({ ...prev, [currentIndex]: value }))

    // Validate input as user types
    const currentQuestion = questions[currentIndex]
    if (currentQuestion.validate && value.trim() !== "") {
      const validationError = currentQuestion.validate(value)
      setError(validationError || "")
    } else {
      setError("")
    }
  }

  const handleNext = () => {
    const currentAnswer = answers[currentIndex]
    const currentQuestion = questions[currentIndex]

    // Check if question is answered
    if (!currentAnswer || (typeof currentAnswer === "string" && currentAnswer.trim() === "")) {
      setError("Please answer the question before proceeding")
      return
    }

    // Validate answer format if validation exists
    if (currentQuestion.validate && typeof currentAnswer === "string") {
      const validationError = currentQuestion.validate(currentAnswer)
      if (validationError) {
        setError(validationError)
        return
      }
    }

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setError("")
    } else {
      setQuizComplete(true)
    }
  }

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
      setError("")
    }
  }

  return (
    <div className="h-screen w-screen bg-[url(/background.jpg)] bg-cover bg-center">
      <div className="relative flex items-center justify-center min-h-screen p-4">
        <div className="bg-white/70 rounded-3xl p-6 w-[650px] min-h-[500px] flex flex-col items-center shadow-2xl border border-white/30">
          <div className="w-12 h-12 self-start">
            <img src="/logo.png" alt="Logo" className="w-full h-full object-contain" />
          </div>

          {!quizComplete ? (
            <div className="w-full flex flex-col items-center text-center gap-10 mt-5">
              <h3 className="text-2xl font-heading semibold text-blue-950">{questions[currentIndex].question}</h3>
              <div className="w-full mt-2 mb-4">
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-in-out"
                    style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-600 mt-1">
                  <span>
                    Question {currentIndex + 1} of {questions.length}
                  </span>
                  <span>{Math.round(((currentIndex + 1) / questions.length) * 100)}% complete</span>
                </div>
              </div>

              {error && (
                <div className="w-[80%] p-3 bg-red-100 border border-red-400 text-red-700 rounded-md">{error}</div>
              )}

              <div className="w-full flex flex-col items-center gap-3">
                {questions[currentIndex].options.length > 0 ? (
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
                  <div className="w-[80%] relative mt-15 mb-19">
                    <input
                      type="text"
                      value={answers[currentIndex] || ""}
                      onChange={handleTextInputChange}
                      placeholder="Type your answer here"
                      className={`w-full bg-transparent border-0 border-b-2 p-2 text-lg focus:outline-none focus:border-blue-500 ${
                        error ? "border-red-500" : "border-black"
                      }`}
                    />
                  </div>
                )}
              </div>

              <div className={`w-full mt-6 ${currentIndex === 0 ? "flex justify-center" : "flex justify-between"}`}>
                {currentIndex > 0 && (
                  <button
                    onClick={handlePrevious}
                    className="h-[50px] w-[40%] rounded-lg text-lg font-semibold bg-blue-950 text-white hover:bg-blue-900 shadow-md shadow-gray-600 transition-colors"
                  >
                    Previous
                  </button>
                )}

                <button
                  onClick={handleNext}
                  className={`h-[50px] rounded-lg text-lg font-semibold bg-blue-950 text-white hover:bg-blue-900 shadow-md shadow-gray-600 transition-colors ${
                    currentIndex === 0 ? "w-[60%]" : "w-[40%]"
                  }`}
                >
                  {currentIndex === questions.length - 1 ? "Submit" : "Next"}
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center w-full">
              <h3 className="text-2xl font-bold text-blue-950 mb-4">Rest Assured!</h3>
              <h4 className="text-xl font-semibold text-gray-700">Your Sleep Insights Are In!</h4>
              <div className="w-full mt-4 mb-6">
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-green-600 h-2.5 rounded-full" style={{ width: "100%" }}></div>
                </div>
                <div className="flex justify-end text-xs text-gray-600 mt-1">
                  <span>100% complete</span>
                </div>
              </div>
              <div className="flex justify-center gap-20 mb-8 mt-15">
                <div className="w-[40%]">
                  <input
                    type="text"
                    value={answers[currentIndex] || ""}
                    onChange={handleTextInputChange}
                    placeholder="Type your answer here"
                    className="w-full bg-black text-white border-0 rounded-md p-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 mb-2"
                  />
                  <h3 className="text-2xl font-heading semibold text-blue-950">Sleep Score</h3>
                </div>

                <div className="w-[40%]">
                  <input
                    type="text"
                    value={answers[currentIndex] || ""}
                    onChange={handleTextInputChange}
                    placeholder="Type your answer here"
                    className="w-full bg-black text-white border-0 rounded-md p-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 mb-2"
                  />
                  <h3 className="text-2xl font-heading semibold text-blue-950">Sleep Status</h3>
                </div>
              </div>

              <div className="flex justify-center gap-24 mt-25">
                <button className="h-[50px] w-[40%] rounded-lg text-lg font-semibold bg-blue-950 text-white hover:bg-blue-900 shadow-md shadow-gray-600 transition-colors">
                  Recommandation log
                </button>
                <button className="h-[50px] w-[40%] rounded-lg text-lg font-semibold bg-blue-950 text-white hover:bg-blue-900 shadow-md shadow-gray-600 transition-colors">
                  Sleep Journal
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Quiz

