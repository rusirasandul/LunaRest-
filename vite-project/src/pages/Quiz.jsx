"use client"

import { useState, useEffect } from "react";
import { questions } from "../utils/data";
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from "framer-motion";

const Quiz = () => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [answers, setAnswers] = useState({})
    const [quizComplete, setQuizComplete] = useState(false)
    const [validationError, setValidationError] = useState("")
    const [progress, setProgress] = useState(0)
    const navigate = useNavigate();

    useEffect(() => {
        setProgress((currentIndex / (questions.length - 1)) * 100);
    }, [currentIndex]);

    // Handle radio button selection
    const handleAnswerChange = (option) => {
        setAnswers((prev) => ({ ...prev, [currentIndex]: option }))
        setValidationError("")
    }

    // Handle text input changes
    const handleTextInputChange = (e) => {
        setAnswers((prev) => ({ ...prev, [currentIndex]: e.target.value }))
        setValidationError("")
    }

    // Validate current question before proceeding
    const validateCurrentQuestion = () => {
        const currentAnswer = answers[currentIndex]
        
        if (currentAnswer === undefined || currentAnswer === "") {
            setValidationError("Please provide an answer before continuing")
            return false
        }

        switch (currentIndex) {
            case 0:
                if (currentAnswer.trim() === "") {
                    setValidationError("Please enter your name")
                    return false
                }
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
        
        return true
    }

    const handleNext = () => {
        if (!validateCurrentQuestion()) {
            return
        }
        
        if (currentIndex < questions.length - 1) {
            setCurrentIndex(currentIndex + 1)
            setValidationError("")
        } else {
            setQuizComplete(true)
        }
    }

    const handlePrevious = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1)
        }
    }

    // Navigation handlers
    const goToRecommendations = () => {
        navigate('/Recommendation');
    }

    const goToJournal = () => {
        navigate('/Journal');
    }

    // Helper function to get input props
    const getInputProps = (index) => {
        let props = {
            type: "text",
            placeholder: "Type your answer here",
            min: undefined,
            max: undefined,
            step: undefined
        }
        
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

    // Animation variants
    const cardVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
        exit: { opacity: 0, y: -50, transition: { duration: 0.3 } }
    };

    const buttonVariants = {
        hover: { scale: 1.05, transition: { duration: 0.2 } },
        tap: { scale: 0.95, transition: { duration: 0.1 } }
    };

    const optionVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: i => ({ 
            opacity: 1, 
            x: 0, 
            transition: { 
                delay: i * 0.1,
                duration: 0.3
            } 
        }),
        hover: { 
            backgroundColor: "rgba(219, 234, 254, 0.8)", 
            scale: 1.02,
            transition: { duration: 0.2 } 
        }
    };

    return (
        <div className="h-screen w-screen bg-[url(/background.jpg)] bg-cover bg-center overflow-hidden">
            {/* Animated stars background overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-blue-950/30 to-black/50"></div>
            
            {/* Centered Quiz Card */}
            <div className="relative flex items-center justify-center min-h-screen p-4">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 w-[650px] min-h-[500px] flex flex-col items-center shadow-2xl border border-white/30"
                >
                    {/* Logo */}
                    <motion.div 
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        className="w-14 h-14 self-start"
                    >
                        <img src="/logo.png" alt="Logo" className="w-full h-full object-contain" />
                    </motion.div>

                    {/* Progress bar */}
                    <motion.div 
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: "90%", opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                        className="w-[90%] h-2 bg-gray-200 rounded-full mt-4 overflow-hidden"
                    >
                        <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.5 }}
                            className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"
                        />
                    </motion.div>
                    
                    <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.7 }}
                        className="text-sm text-blue-900 mt-1"
                    >
                        Question {currentIndex + 1} of {questions.length}
                    </motion.p>

                    {!quizComplete ? (
                        <AnimatePresence mode="wait">
                            <motion.div 
                                key={currentIndex}
                                variants={cardVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                className="w-full flex flex-col items-center text-center gap-8 mt-5"
                            >
                                {/* Question */}
                                <motion.h3 
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2, duration: 0.5 }}
                                    className="text-2xl font-heading font-semibold text-blue-950 px-4"
                                >
                                    {questions[currentIndex].question}
                                </motion.h3>

                                {/* Options or Text Input based on question type */}
                                <div className="w-full flex flex-col items-center gap-3">
                                    {questions[currentIndex].options.length > 0 ? (
                                        // Render radio buttons for questions with options
                                        questions[currentIndex].options.map((option, idx) => (
                                            <motion.label
                                                key={idx}
                                                custom={idx}
                                                variants={optionVariants}
                                                initial="hidden"
                                                animate="visible"
                                                whileHover="hover"
                                                className="flex items-center gap-3 w-[85%] bg-white/90 p-4 rounded-lg border border-gray-300 cursor-pointer shadow-sm transition-all"
                                            >
                                                <input
                                                    type="radio"
                                                    name={`question-${currentIndex}`}
                                                    value={option}
                                                    checked={answers[currentIndex] === option}
                                                    onChange={() => handleAnswerChange(option)}
                                                    className="h-5 w-5 accent-blue-600"
                                                />
                                                <span className="text-lg text-gray-800">{option}</span>
                                            </motion.label>
                                        ))
                                    ) : (
                                        // Render text input for questions without options
                                        <motion.div 
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.3, duration: 0.5 }}
                                            className="w-[85%] relative mt-4 mb-6"
                                        >
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
                                                        className="w-full bg-white/80 backdrop-blur-sm border-0 border-b-2 border-blue-500 p-3 text-lg rounded-t-lg focus:outline-none focus:border-blue-700 focus:ring-2 focus:ring-blue-200 transition-all shadow-sm"
                                                    />
                                                )
                                            })()}
                                        </motion.div>
                                    )}
                                </div>
                                
                                {/* Validation Error Message */}
                                <AnimatePresence>
                                    {validationError && (
                                        <motion.div 
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            className="text-red-600 font-medium -mt-4 bg-red-50 px-4 py-2 rounded-lg border border-red-100"
                                        >
                                            {validationError}
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Navigation Buttons Section */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4, duration: 0.5 }}
                                    className={`w-full mt-4 ${
                                        currentIndex === 0 ? "flex justify-center" : "flex justify-between"
                                    }`}
                                >
                                    {currentIndex > 0 && (
                                        <motion.button
                                            variants={buttonVariants}
                                            whileHover="hover"
                                            whileTap="tap"
                                            onClick={handlePrevious}
                                            className="h-[50px] w-[40%] rounded-lg text-lg font-semibold bg-gradient-to-r from-blue-800 to-blue-950 text-white shadow-lg shadow-blue-900/20 transition-all"
                                        >
                                            Previous
                                        </motion.button>
                                    )}

                                    <motion.button
                                        variants={buttonVariants}
                                        whileHover="hover"
                                        whileTap="tap"
                                        onClick={handleNext}
                                        className={`h-[50px] rounded-lg text-lg font-semibold bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg shadow-indigo-900/20 transition-all ${
                                            currentIndex === 0 ? "w-[60%]" : "w-[40%]"
                                        }`}
                                    >
                                        {currentIndex === questions.length - 1 ? "Submit" : "Next"}
                                    </motion.button>
                                </motion.div>
                            </motion.div>
                        </AnimatePresence>
                    ) : (
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6 }}
                            className="text-center w-full py-6"
                        >
                            <motion.div
                                initial={{ y: -20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.2, duration: 0.5 }}
                            >
                                <h3 className="text-3xl font-bold text-blue-950 mb-2">Rest Assured!</h3>
                                <h4 className="text-xl font-semibold text-gray-700 mb-8">Your Sleep Insights Are In!</h4>
                            </motion.div>
                            
                            <div className="flex justify-center gap-8 mb-12">
                                <motion.div 
                                    initial={{ opacity: 0, x: -30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.4, duration: 0.5 }}
                                    className="w-[40%] bg-gradient-to-br from-blue-900 to-indigo-900 p-6 rounded-2xl shadow-xl"
                                >
                                    <div className="text-5xl font-bold text-white mb-4">85</div>
                                    <h3 className="text-xl font-heading font-semibold text-blue-100">Sleep Score</h3>
                                </motion.div>

                                <motion.div 
                                    initial={{ opacity: 0, x: 30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.5, duration: 0.5 }}
                                    className="w-[40%] bg-gradient-to-br from-indigo-800 to-purple-900 p-6 rounded-2xl shadow-xl"
                                >
                                    <div className="text-2xl font-bold text-white mb-4">Good</div>
                                    <h3 className="text-xl font-heading font-semibold text-blue-100">Sleep Status</h3>
                                </motion.div>
                            </div>

                            <div className="flex justify-center gap-6 mt-6">
                                <motion.button
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.6, duration: 0.5 }}
                                    variants={buttonVariants}
                                    whileHover="hover"
                                    whileTap="tap"
                                    onClick={goToRecommendations}
                                    className="h-[50px] w-[45%] rounded-lg text-lg font-semibold bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg shadow-blue-900/20 transition-all"
                                >
                                    Recommendation Log
                                </motion.button>
                                
                                <motion.button
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.7, duration: 0.5 }}
                                    variants={buttonVariants}
                                    whileHover="hover"
                                    whileTap="tap"
                                    onClick={goToJournal}
                                    className="h-[50px] w-[45%] rounded-lg text-lg font-semibold bg-gradient-to-r from-indigo-600 to-indigo-800 text-white shadow-lg shadow-indigo-900/20 transition-all"
                                >
                                    Sleep Journal
                                </motion.button>
                            </div>
                        </motion.div>
                    )}
                </motion.div>
            </div>
        </div>
    )
}

export default Quiz



