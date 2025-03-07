import { useState, useEffect } from 'react';
import { Moon, TrendingUp, Sun, Clock, CheckCircle, Loader } from 'lucide-react';

const Recommendations = () => {
    // Enhanced state management
    const [recommendations, setRecommendations] = useState([]);
    const [howToImprove, setHowToImprove] = useState([]);
    const [loading, setLoading] = useState(true);
    //const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('recommendations');
    const [animateIn, setAnimateIn] = useState(false);

    // Color palette mapped to Tailwind classes
    const colors = {
        white: 'bg-white', // FFFFFF
        primary: 'bg-purple-600', // 9F1CFD
        dark: 'bg-indigo-950', // 080030
        neutral: 'bg-gray-400', // AFA99E
        accent: 'bg-purple-500', // B34BFE
        gray: 'bg-gray-500', // 7A7676
        textDark: 'text-indigo-950', // 080030
        textLight: 'text-white', // FFFFFF
        textPrimary: 'text-purple-600', // 9F1CFD
        textAccent: 'text-purple-500', // B34BFE
    };

    useEffect(() => {
        const fetchRecommendations = async () => {
            setLoading(true);
            try {
                // Simulated delay to show loading state
                await new Promise(resolve => setTimeout(resolve, 1000));

                const response = await fetch('/api/sleep-recommendations', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch recommendations');
                }

                const data = await response.json();
                setRecommendations(data.recommendations || []);
                setHowToImprove(data.howToImprove || []);
                //setError(null);

                // Trigger animation after data is loaded
                setTimeout(() => setAnimateIn(true), 100);
            } catch (error) {
                console.error('Error fetching recommendations:', error);
                // Instead of showing error, just set empty arrays
                setRecommendations([]);
                setHowToImprove([]);
                //setError(null); // Clear any previous errors

                // Still trigger animation
                setTimeout(() => setAnimateIn(true), 100);
            } finally {
                setLoading(false);
            }
        };

        fetchRecommendations();
    }, []);

    // Get time of day to personalize greeting
    const getTimeOfDay = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'morning';
        if (hour < 18) return 'afternoon';
        return 'evening';
    };

    return (
        <div className={`min-h-screen ${colors.dark} py-10 px-4 transition-all duration-500`}>
            <div className="max-w-3xl mx-auto">
                {/* Header with animation */}
                <div className={`text-center mb-10 transform transition-all duration-700 ${animateIn ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                    <div className="flex justify-center items-center mb-3">
                        <Moon className={`${colors.textAccent} mr-3`} size={42} />
                    </div>
                    <h1 className={`text-4xl font-extrabold ${colors.textLight} mb-2`}>
                        Your Sleep Insights
                    </h1>
                    <p className={`${colors.textLight} opacity-75 text-lg`}>
                        Good {getTimeOfDay()}! Here is your personalized sleep analysis.
                    </p>
                </div>

                {/* Loading state */}
                {loading && (
                    <div className="flex justify-center items-center py-16">
                        <Loader className={`${colors.textAccent} animate-spin`} size={48} />
                        <span className={`${colors.textLight} ml-4 text-lg`}>Loading your sleep insights...</span>
                    </div>
                )}

                {/* Main content */}
                {!loading && (
                    <div className="space-y-8">
                        {/* Tabs */}
                        <div className="flex bg-gray-800 bg-opacity-50 rounded-lg p-1">
                            <button
                                onClick={() => setActiveTab('recommendations')}
                                className={`flex-1 py-2 rounded-lg transition-all duration-300 flex items-center justify-center ${
                                    activeTab === 'recommendations'
                                        ? `${colors.primary} ${colors.textLight}`
                                        : `${colors.textLight} hover:bg-gray-700`
                                }`}
                            >
                                <Moon className="mr-2" size={18} />
                                Recommendations
                            </button>
                            <button
                                onClick={() => setActiveTab('improvements')}
                                className={`flex-1 py-2 rounded-lg transition-all duration-300 flex items-center justify-center ${
                                    activeTab === 'improvements'
                                        ? `${colors.accent} ${colors.textLight}`
                                        : `${colors.textLight} hover:bg-gray-700`
                                }`}
                            >
                                <TrendingUp className="mr-2" size={18} />
                                Improvements
                            </button>
                        </div>

                        {/* Recommendations Panel */}
                        {activeTab === 'recommendations' && (
                            <div className={`bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-500 ${animateIn ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                                <div className={`${colors.primary} p-4`}>
                                    <div className="flex items-center">
                                        <Moon className="text-white mr-3" size={24} />
                                        <h2 className="text-xl font-bold text-white">Sleep Recommendations</h2>
                                    </div>
                                </div>
                                <div className="p-6">
                                    {recommendations.length > 0 ? (
                                        <ul className="space-y-4">
                                            {recommendations.map((rec, index) => (
                                                <li
                                                    key={index}
                                                    className={`flex items-start p-3 rounded-lg ${index % 2 === 0 ? 'bg-purple-50' : 'bg-white'} transition-all hover:shadow-md`}
                                                >
                                                    <CheckCircle className={`${colors.textPrimary} mt-1 mr-3 flex-shrink-0`} size={20} />
                                                    <span className={`${colors.textDark}`}>{rec}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p className="text-gray-500 py-4 text-center">No recommendations available</p>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Improvements Panel */}
                        {activeTab === 'improvements' && (
                            <div className={`bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-500 ${animateIn ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                                <div className={`${colors.accent} p-4`}>
                                    <div className="flex items-center">
                                        <TrendingUp className="text-white mr-3" size={24} />
                                        <h2 className="text-xl font-bold text-white">How to Improve</h2>
                                    </div>
                                </div>
                                <div className="p-6">
                                    {howToImprove.length > 0 ? (
                                        <ul className="space-y-4">
                                            {howToImprove.map((improve, index) => (
                                                <li
                                                    key={index}
                                                    className={`flex items-start p-3 rounded-lg ${index % 2 === 0 ? 'bg-purple-50' : 'bg-white'} transition-all hover:shadow-md`}
                                                >
                                                    <TrendingUp className={`${colors.textAccent} mt-1 mr-3 flex-shrink-0`} size={20} />
                                                    <span className={`${colors.textDark}`}>{improve}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p className="text-gray-500 py-4 text-center">No improvement suggestions available</p>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Sleep cycle visualization */}
                        <div className={`bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-500 ${animateIn ? 'translate-y-0 opacity-100 delay-100' : 'translate-y-10 opacity-0'}`}>
                            <div className={`${colors.primary} bg-opacity-90 p-4`}>
                                <div className="flex items-center">
                                    <Clock className="text-white mr-3" size={24} />
                                    <h2 className="text-xl font-bold text-white">Sleep Cycle</h2>
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="h-24 flex items-center">
                                    {/* Stylized sleep cycle visualization */}
                                    <div className="w-full flex items-center">
                                        <div className="h-1 bg-gray-200 w-full flex relative">
                                            {/* REM sleep indicators */}
                                            <div className="absolute bottom-0 left-1/4 w-12 h-12 transform -translate-x-1/2">
                                                <div className={`${colors.primary} w-3 h-3 rounded-full mb-1 mx-auto`}></div>
                                                <div className="text-xs text-center">REM</div>
                                            </div>
                                            <div className="absolute bottom-0 left-1/2 w-12 h-12 transform -translate-x-1/2">
                                                <div className={`${colors.primary} w-3 h-3 rounded-full mb-1 mx-auto`}></div>
                                                <div className="text-xs text-center">REM</div>
                                            </div>
                                            <div className="absolute bottom-0 left-3/4 w-12 h-12 transform -translate-x-1/2">
                                                <div className={`${colors.primary} w-3 h-3 rounded-full mb-1 mx-auto`}></div>
                                                <div className="text-xs text-center">REM</div>
                                            </div>

                                            {/* Sleep cycles */}
                                            <div className="absolute -top-10 left-0 right-0 h-10">
                                                <svg className="w-full h-full">
                                                    <path
                                                        d="M0,40 Q50,0 100,40 Q150,80 200,40 Q250,0 300,40 Q350,80 400,40 Q450,0 500,40 Q550,80 600,40"
                                                        fill="none"
                                                        stroke="#9F1CFD"
                                                        strokeWidth="2"
                                                    />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-between text-xs text-gray-500 mt-1">
                                    <span>10 PM</span>
                                    <span>12 AM</span>
                                    <span>2 AM</span>
                                    <span>4 AM</span>
                                    <span>6 AM</span>
                                </div>
                            </div>
                        </div>

                        {/* Tips Card */}
                        <div className={`bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-500 ${animateIn ? 'translate-y-0 opacity-100 delay-200' : 'translate-y-10 opacity-0'}`}>
                            <div className={`bg-gradient-to-r from-purple-600 to-purple-500 p-4`}>
                                <div className="flex items-center">
                                    <Sun className="text-white mr-3" size={24} />
                                    <h2 className="text-xl font-bold text-white">Daily Sleep Tip</h2>
                                </div>
                            </div>
                            <div className="p-6">
                                <blockquote className="border-l-4 border-purple-600 pl-4 py-2 italic text-gray-700">
                                    Creating a consistent sleep schedule helps regulate your bodys internal clock and could help you fall asleep and wake up more easily.
                                </blockquote>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Recommendations;