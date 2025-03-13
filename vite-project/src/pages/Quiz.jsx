"use client"

import { useState } from "react";
import { questions } from "../utils/data";
import { useNavigate } from 'react-router-dom';

const Quiz = () => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [answers, setAnswers] = useState({})
    const [quizComplete, setQuizComplete] = useState(false)
    const [validationError, setValidationError] = useState("")
    const navigate = useNavigate(); // Initialize the navigate function

    // Handle radio button selection
    const handleAnswerChange = (option) => {
        setAnswers((prev) => ({ ...prev, [currentIndex]: option }))
        setValidationError("") // Clear validation error when user selects an option
    }

    // Handle text input changes
    // Added this function to handle text input for questions without options
    const handleTextInputChange = (e) => {
        setAnswers((prev) => ({ ...prev, [currentIndex]: e.target.value }))
        setValidationError("") // Clear validation error when user types
    }

    // Validate current question before proceeding
    const validateCurrentQuestion = () => {
        const currentAnswer = answers[currentIndex]
        
        // If no answer is provided
        if (currentAnswer === undefined || currentAnswer === "") {
            setValidationError("Please provide an answer before continuing")
            return false
        }

        // Question-specific validations based on index
        switch (currentIndex) {
            case 0: // Name validation
                if (currentAnswer.trim() === "") {
                    setValidationError("Please enter your name")
                    return false
                }
                // Check for numbers in the name
                if (/\d/.test(currentAnswer)) {
                    setValidationError("Name cannot contain numbers")
                    return false
                }
                break
                
            case 2: // Age validation (18-25)
                const age = Number(currentAnswer)
                if (isNaN(age) || age < 18 || age > 25) {
                    setValidationError("Age must be between 18 and 25")
                    return false
                }
                break
                
            case 4: // Weekday sleep hours (4-9)
                const weekdaySleep = Number(currentAnswer)
                if (isNaN(weekdaySleep) || weekdaySleep < 4 || weekdaySleep > 9) {
                    setValidationError("Sleep hours must be between 4 and 9")
                    return false
                }
                break
                
            case 5: // Weekend sleep hours (4-9)
                const weekendSleep = Number(currentAnswer)
                if (isNaN(weekendSleep) || weekendSleep < 4 || weekendSleep > 9) {
                    setValidationError("Sleep hours must be between 4 and 9")
                    return false
                }
                break
                
            case 6: // Weekday study hours (0.1-12)
                const weekdayStudy = Number(currentAnswer)
                if (isNaN(weekdayStudy) || weekdayStudy < 0.1 || weekdayStudy > 12) {
                    setValidationError("Study hours must be between 0.1 and 12")
                    return false
                }
                break
                
            case 7: // Weekend study hours (0.1-12)
                const weekendStudy = Number(currentAnswer)
                if (isNaN(weekendStudy) || weekendStudy < 0.1 || weekendStudy > 12) {
                    setValidationError("Study hours must be between 0.1 and 12")
                    return false
                }
                break
                
            case 8: // Weekday screen time (1-4)
                const weekdayScreen = Number(currentAnswer)
                if (isNaN(weekdayScreen) || weekdayScreen < 1 || weekdayScreen > 4) {
                    setValidationError("Screen time must be between 1 and 4 hours")
                    return false
                }
                break
                
            case 9: // Weekend screen time (1-4)
                const weekendScreen = Number(currentAnswer)
                if (isNaN(weekendScreen) || weekendScreen < 1 || weekendScreen > 4) {
                    setValidationError("Screen time must be between 1 and 4 hours")
                    return false
                }
                break
                
            case 11: // Physical activity (1-120 minutes)
                const activity = Number(currentAnswer)
                if (isNaN(activity) || activity < 1 || activity > 120) {
                    setValidationError("Physical activity must be between 1 and 120 minutes")
                    return false
                }
                break
                
            case 12: // Sleep quality (1-10)
                const quality = Number(currentAnswer)
                if (isNaN(quality) || quality < 1 || quality > 10) {
                    setValidationError("Sleep quality must be between 1 and 10")
                    return false
                }
                break
        }
        
        // If we reach here, validation passed
        return true
    }

    const handleNext = () => {
        // Validate current question before proceeding
        if (!validateCurrentQuestion()) {
            return
        }
        
        if (currentIndex < questions.length - 1) {
            setCurrentIndex(currentIndex + 1)
            setValidationError("") // Clear validation error when moving to next question
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

    // Helper function to get input type and placeholder based on question index
    const getInputProps = (index) => {
        // Default props
        let props = {
            type: "text",
            placeholder: "Type your answer here",
            min: undefined,
            max: undefined,
            step: undefined
        }
        
        // Customize based on question index
        switch (index) {
            case 2: // Age
                props.type = "number"
                props.placeholder = "Enter age (18-25)"
                props.min = 18
                props.max = 25
                break
                
            case 4: // Weekday sleep
            case 5: // Weekend sleep
                props.type = "number"
                props.placeholder = "Enter hours (4-9)"
                props.min = 4
                props.max = 9
                props.step = 0.1
                break
                
            case 6: // Weekday study
            case 7: // Weekend study
                props.type = "number"
                props.placeholder = "Enter hours (0.1-12)"
                props.min = 0.1
                props.max = 12
                props.step = 0.1
                break
                
            case 8: // Weekday screen
            case 9: // Weekend screen
                props.type = "number"
                props.placeholder = "Enter hours (1-4)"
                props.min = 1
                props.max = 4
                props.step = 0.1
                break
                
            case 11: // Physical activity
                props.type = "number"
                props.placeholder = "Enter minutes (1-120)"
                props.min = 1
                props.max = 120
                break
                
            case 12: // Sleep quality
                props.type = "number"
                props.placeholder = "Rate from 1-10"
                props.min = 1
                props.max = 10
                break
        }
        
        return props
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
                                    <div className="w-[80%] relative mt-15 mb-19">
                                        {/* Get input props based on question index */}
                                        {(() => {
                                            const inputProps = getInputProps(currentIndex)
                                            return (
                                                <input
                                                    type={inputProps.type}
                                                    value={answers[currentIndex] || ""}
                                                    onChange={handleTextInputChange}
                                                    placeholder={inputProps.placeholder}
                                                    min={inputProps.min}
                                                    max={inputProps.max}
                                                    step={inputProps.step}
                                                    className="w-full bg-transparent border-0 border-b-2 border-black p-2 text-lg focus:outline-none focus:border-blue-500"
                                                />
                                            )
                                        })()}
                                    </div>
                                )}
                            </div>
                            
                            {/* Validation Error Message */}
                            {validationError && (
                                <div className="text-red-600 font-medium -mt-5">
                                    {validationError}
                                </div>
                            )}

                            {/* Modified Navigation Buttons Section */}
                            <div
                                className={`w-full mt-6 ${
                                    currentIndex === 0 ? "flex justify-center" : "flex justify-between"
                                }`}
                            >
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



