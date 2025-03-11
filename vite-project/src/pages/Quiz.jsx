"use client"

import { useState } from "react";
import { questions } from "../utils/data";
import { useNavigate } from 'react-router-dom';

const Quiz = () => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [answers, setAnswers] = useState({})
    const [quizComplete, setQuizComplete] = useState(false)
    const navigate = useNavigate(); // Initialize the navigate function

    // Handle radio button selection
    const handleAnswerChange = (option) => {
        setAnswers((prev) => ({ ...prev, [currentIndex]: option }))
    }

    // Handle text input changes
    // Added this function to handle text input for questions without options
    const handleTextInputChange = (e) => {
        setAnswers((prev) => ({ ...prev, [currentIndex]: e.target.value }))
    }

    const handleNext = () => {
        if (currentIndex < questions.length - 1) {
            setCurrentIndex(currentIndex + 1)
        } else {
            setQuizComplete(true)
        }
    }

    const handlePrevious = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1)
        }
    }

    // Navigation handlers for recommendation and journal pages
    const goToRecommendations = () => {
        navigate('/Recommendation');
    }

    const goToJournal = () => {
        navigate('/Journal');
    }

    return (
        <div className="h-screen w-screen bg-[url(/background.jpg)] bg-cover bg-center">
            {/* Centered Quiz Card */}
            <div className="relative flex items-center justify-center min-h-screen p-4">
                <div className="bg-white/70 rounded-3xl p-6 w-[650px] min-h-[500px] flex flex-col items-center shadow-2xl border border-white/30">
                    {/* Logo */}
                    <div className="w-12 h-12 self-start">
                        <img src="/logo.png" alt="Logo" className="w-full h-full object-contain" />
                    </div>

                    {!quizComplete ? (
                        <div className="w-full flex flex-col items-center text-center gap-10 mt-5">
                            {/* Question */}
                            <h3 className="text-2xl font-heading semibold text-blue-950">{questions[currentIndex].question}</h3>

                            {/* Options or Text Input based on question type */}
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
                                    // Replace the existing text input with a line-style text field
                                    <div className="w-[80%] relative mt-15 mb-19">
                                        <input
                                            type="text"
                                            value={answers[currentIndex] || ""}
                                            onChange={handleTextInputChange}
                                            placeholder="Type your answer here"
                                            className="w-full bg-transparent border-0 border-b-2 border-black p-2 text-lg focus:outline-none focus:border-blue-500"
                                        />
                                    </div>
                                )}
                            </div>

                            {/* Modified Navigation Buttons Section */}
                            {/* Changed the button layout for the first question (currentIndex === 0) */}
                            <div
                                className={`w-full mt-6 ${
                                    // Center align for first question, space-between for others
                                    currentIndex === 0 ? "flex justify-center" : "flex justify-between"
                                }`}
                            >
                                {/* Only show Previous button after first question */}
                                {currentIndex > 0 && (
                                    <button
                                        onClick={handlePrevious}
                                        className="h-[50px] w-[40%] rounded-lg text-lg font-semibold bg-blue-950 text-white hover:bg-blue-900 shadow-md shadow-gray-600 transition-colors"
                                    >
                                        Previous
                                    </button>
                                )}

                                {/* Next/Submit button with adjusted width for first question */}
                                <button
                                    onClick={handleNext}
                                    className={`h-[50px] rounded-lg text-lg font-semibold bg-blue-950 text-white hover:bg-blue-900 shadow-md shadow-gray-600 transition-colors ${
                                        // Make button wider on first question since it's centered
                                        currentIndex === 0 ? "w-[60%]" : "w-[40%]"
                                    }`}
                                >
                                    {currentIndex === questions.length - 1 ? "Submit" : "Next"}
                                </button>
                            </div>
                            {/* End of Modified Navigation Buttons Section */}
                        </div>
                    ) : (
                        <div className="text-center w-full">
                            <h3 className="text-2xl font-bold text-blue-950 mb-4">Rest Assured!</h3>
                            <h4 className="text-xl font-semibold text-gray-700">Your Sleep Insights Are In!</h4>
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
                                <button
                                    onClick={goToRecommendations}
                                    className="h-[50px] w-[40%] rounded-lg text-lg font-semibold bg-blue-950 text-white hover:bg-blue-900 shadow-md shadow-gray-600 transition-colors"
                                >
                                    Recommendation log
                                </button>
                                <button
                                    onClick={goToJournal}
                                    className="h-[50px] w-[40%] rounded-lg text-lg font-semibold bg-blue-950 text-white hover:bg-blue-900 shadow-md shadow-gray-600 transition-colors"
                                >
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



