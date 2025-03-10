import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Cell } from "recharts";
import { Moon, Award, TrendingUp, Activity } from "lucide-react";

// Utility function for combining class names
const cn = (...inputs) => {
    return inputs.filter(Boolean).join(" ");
};

// Button component
const Button = ({ className, children, ...props }) => {
    return (
        <button
        className={cn(
            "inline-flex items-center justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50",
            className
        )}
        {...props}
        >
        {children}
        </button>
    );
};

Button.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node.isRequired
};

// Card component
const Card = ({ className, children }) => {
    return (
        <div className={cn("bg-white rounded-lg shadow-md border border-gray-100", className)}>
        {children}
        </div>
    );
};

Card.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node.isRequired
};

const SleepQualityTracker = () => {
    // States for sleep data
    const [prevQuality, setPrevQuality] = useState(0);
    const [latestQuality, setLatestQuality] = useState(0);
    const [goal, setGoal] = useState(8);
    const [streak, setStreak] = useState(0);
    const [badge, setBadge] = useState(null);
    const [inputGoal, setInputGoal] = useState("");
    const [loading, setLoading] = useState(true);
    const [weeklyData, setWeeklyData] = useState([]);
    const [error, setError] = useState(null);

    // Color palette
    const COLORS = {
        primary: "#4f46e5", // indigo-600
        secondary: "#c7d2fe", // indigo-200
        accent: "#818cf8", // indigo-400
        success: "#10b981", // emerald-500
        warning: "#f59e0b", // amber-500
        optimal: "#4f46e5", // blue for optimal sleep (≤ 5)
        excessive: "#ef4444", // red for excessive sleep (> 5)
    };

    const BADGES = {
        bronze: "#cd7f32",
        silver: "#c0c0c0",
        gold: "#ffd700"
    };

    // Fetch data from JSON file or API endpoint
    useEffect(() => {
        const fetchUserSleepData = async () => {
            setLoading(true);
            try {
                // Fetch data from your JSON file or API endpoint
                const response = await fetch('/data/sleep-data.json');
                
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                
                const data = await response.json();
                
                // Process and set the data
                // Get the previous day's quality (second to last in the weekly data)
                const prevIndex = data.weeklyData.length - 2;
                const prevDayQuality = prevIndex >= 0 ? data.weeklyData[prevIndex].quality : 0;
                
                // Get the latest prediction (last in the weekly data)
                const latestQuality = data.weeklyData[data.weeklyData.length - 1].quality;
                
                setPrevQuality(prevDayQuality);
                setLatestQuality(latestQuality);
                setGoal(data.userGoal || 5); // Updated default goal to 5
                setStreak(data.currentStreak || 0);
                setBadge(data.badge || null);
                setWeeklyData(data.weeklyData || []);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching sleep data:', error);
                setError("Failed to load sleep data. Please try again later.");
                setLoading(false);
            }
        };

        fetchUserSleepData();
    }, []);

    // Update streak and badge when latest quality changes
    useEffect(() => {
        // Changed to consider optimal sleep as 5 or below
        if (latestQuality <= 5 && !loading) {
            setStreak(prevStreak => {
                const newStreak = prevStreak + 1;
                // Update badge based on streak
                if (newStreak === 3) setBadge("Bronze Sleeper");
                if (newStreak === 5) setBadge("Silver Sleeper");
                if (newStreak === 7) setBadge("Gold Sleeper");
                return newStreak;
            });
        }
    }, [latestQuality, loading]);

    const handleSetGoal = () => {
        const numGoal = parseFloat(inputGoal);
        if (!isNaN(numGoal) && numGoal > 0 && numGoal <= 10) {
            setGoal(numGoal);
            setInputGoal("");
            
            // Here you would typically update the user's goal in your database
            // saveUserGoal(numGoal);
        }
    };

    // Function to get badge color
    const getBadgeColor = () => {
        if (badge?.includes("Bronze")) return BADGES.bronze;
        if (badge?.includes("Silver")) return BADGES.silver;
        if (badge?.includes("Gold")) return BADGES.gold;
        return COLORS.primary;
    };

    // Goal progress calculation - Modified to consider lower values as better
    // If goal is 5, and user has 4, they're at 100% of goal (or better)
    const progressPercentage = goal >= 5 
        ? Math.min(100, ((5 - Math.abs(latestQuality - 5)) / 5) * 100)
        : Math.min(100, (latestQuality / goal) * 100);
    
    // Calculate improvement - lower is better if above 5, higher is better if below 5
    const isCurrentExcessive = latestQuality > 5;
    const isPrevExcessive = prevQuality > 5;
    
    let improvement;
    if (isCurrentExcessive && isPrevExcessive) {
        // Both excessive, lower is better
        improvement = (prevQuality - latestQuality).toFixed(1);
    } else if (!isCurrentExcessive && !isPrevExcessive) {
        // Both optimal, higher is better (up to 5)
        improvement = (latestQuality - prevQuality).toFixed(1);
        // But cap at 5
        if (latestQuality > 5 && prevQuality <= 5) {
            improvement = -Math.abs(improvement);
        }
    } else if (isCurrentExcessive && !isPrevExcessive) {
        // Was optimal, now excessive - that's bad
        improvement = -Math.abs((latestQuality - 5).toFixed(1));
    } else {
        // Was excessive, now optimal - that's good
        improvement = Math.abs((5 - latestQuality).toFixed(1));
    }

    const improvementColor = parseFloat(improvement) >= 0 ? COLORS.success : COLORS.warning;

    // Determine color for each bar based on quality value
    const getBarColor = (quality) => {
        return quality > 5 ? COLORS.excessive : COLORS.optimal;
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen p-6 bg-gray-50" style={{ marginTop: '20px' }}>
                <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 border-4 border-indigo-500 rounded-full border-t-transparent animate-spin"></div>
                    <p className="font-medium text-indigo-600">Loading your sleep data...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen p-6 bg-gray-50" style={{ marginTop: '20px' }}>
                <Card className="max-w-md p-6 text-center">
                    <h2 className="mb-2 text-xl font-bold text-red-600">Error</h2>
                    <p className="text-gray-700">{error}</p>
                    <Button className="mt-4" onClick={() => window.location.reload()}>
                        Try Again
                    </Button>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen p-4 sm:p-6 bg-gray-50" >
            <div className="max-w-4xl mx-auto ">
                <Card className="overflow-hidden">
                    <div className="p-4 text-white sm:p-6 md:p-8 bg-gradient-to-r from-indigo-500 to-purple-600">
                        <div className="flex items-center mb-2">
                            <Moon className="w-6 h-6 mr-3" />
                            <h1 className="text-xl font-bold sm:text-2xl">Sleep Quality Prediction</h1>
                        </div>
                        <p className="text-sm text-indigo-100">Personalized sleep tracking with AI prediction</p>
                    </div>
                    
                    <div className="p-4 sm:p-6 md:p-8">
                        {/* Weekly Trend Chart */}
                        <Card className="p-4 mb-6">
                            <h2 className="flex items-center mb-4 text-lg font-semibold text-gray-800">
                                <Activity className="w-5 h-5 mr-2 text-indigo-500" />
                                Weekly Sleep Quality Trend
                            </h2>
                            <div className="w-full h-64">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart
                                        data={weeklyData}
                                        margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
                                    >
                                        <XAxis dataKey="day" />
                                        <YAxis domain={[0, 10]} />
                                        <Tooltip 
                                            formatter={(value) => [`${value}/10`, 'Sleep Quality']}
                                            labelFormatter={(label) => `Day: ${label}`}
                                        />
                                        <Legend />
                                        <Bar 
                                            name="Sleep Quality" 
                                            dataKey="quality" 
                                            radius={[4, 4, 0, 0]}
                                        >
                                            {weeklyData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={getBarColor(entry.quality)} />
                                            ))}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="mt-2 text-center">
                                <span className="inline-block px-2 py-1 text-sm rounded-md" 
                                      style={{ 
                                          backgroundColor: latestQuality > 5 ? 'rgba(239, 68, 68, 0.1)' : 'rgba(79, 70, 229, 0.1)',
                                          color: latestQuality > 5 ? 'rgb(220, 38, 38)' : 'rgb(67, 56, 202)'
                                      }}>
                                    Today's Predicted Quality: {latestQuality.toFixed(1)}/10
                                    {latestQuality > 5 ? " (Excessive)" : " (Optimal)"}
                                </span>
                                <p className="mt-1 text-xs text-gray-500">
                                    Optimal sleep quality is 5 or below. Values above 5 indicate excessive sleep.
                                </p>
                            </div>
                        </Card>

                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                            {/* Goal Setting Card */}
                            <Card className="p-4">
                                <h2 className="flex items-center mb-3 text-lg font-semibold text-gray-800">
                                    <TrendingUp className="w-5 h-5 mr-2 text-indigo-500" />
                                    Sleep Goal
                                </h2>
                                <div className="mb-4">
                                    <p className="mb-1 text-sm text-gray-600">Target Quality: <span className="font-semibold text-indigo-600">{goal}/10</span></p>
                                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                                        <div 
                                            className="bg-indigo-600 h-2.5 rounded-full transition-all duration-500" 
                                            style={{ width: `${progressPercentage}%` }}
                                        ></div>
                                    </div>
                                    <p className="mt-1 text-xs text-gray-500">
                                        {progressPercentage < 100 
                                            ? `You're ${progressPercentage.toFixed(1)}% of the way there` 
                                            : 'Goal achieved! 🎉'}
                                    </p>
                                </div>
                                <div className="flex gap-2">
                                    <input
                                        type="number"
                                        min="1"
                                        max="10"
                                        step="0.1"
                                        value={inputGoal}
                                        onChange={(e) => setInputGoal(e.target.value)}
                                        className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        placeholder="New goal (1-10)"
                                    />
                                    <Button onClick={handleSetGoal}>Update</Button>
                                </div>
                            </Card>

                            {/* Achievement Card */}
                            <Card className="p-4">
                                <h2 className="flex items-center mb-3 text-lg font-semibold text-gray-800">
                                    <Award className="w-5 h-5 mr-2 text-indigo-500" />
                                    Achievements
                                </h2>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-600">Current Streak</p>
                                        <p className="text-3xl font-bold text-indigo-600">{streak}</p>
                                        <p className="text-xs text-gray-500">consecutive days with optimal sleep</p>
                                    </div>
                                    {badge && (
                                        <div 
                                            className="px-3 py-2 text-sm font-medium rounded-full" 
                                            style={{ backgroundColor: getBadgeColor(), color: badge.includes("Gold") ? "#333" : "white" }}
                                        >
                                            🏆 {badge}
                                        </div>
                                    )}
                                </div>
                            </Card>

                            {/* Stats Card */}
                            <Card className="p-4">
                                <h2 className="mb-3 text-lg font-semibold text-gray-800">Quick Stats</h2>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between p-2 rounded-md bg-gray-50">
                                        <span className="text-sm text-gray-600">Previous Quality</span>
                                        <span 
                                            className="font-semibold" 
                                            style={{ color: prevQuality > 5 ? COLORS.excessive : COLORS.optimal }}
                                        >
                                            {prevQuality.toFixed(1)}/10
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between p-2 rounded-md bg-gray-50">
                                        <span className="text-sm text-gray-600">Predicted Quality</span>
                                        <span 
                                            className="font-semibold" 
                                            style={{ color: latestQuality > 5 ? COLORS.excessive : COLORS.optimal }}
                                        >
                                            {latestQuality.toFixed(1)}/10
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between p-2 rounded-md bg-gray-50">
                                        <span className="text-sm text-gray-600">Improvement</span>
                                        <span className="font-semibold" style={{ color: improvementColor }}>
                                            {improvement > 0 ? '+' : ''}{improvement}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between p-2 rounded-md bg-gray-50">
                                        <span className="text-sm text-gray-600">Optimal Range</span>
                                        <span className="font-semibold text-indigo-600">
                                            1-5
                                        </span>
                                    </div>
                                </div>
                            </Card>
                        </div>

                        {/* Recommendations */}
                        {latestQuality > 5 ? (
                            <Card className="p-4 mt-6 border-red-100 bg-red-50">
                                <h2 className="mb-2 text-lg font-semibold text-red-700">
                                    Recommendations for Excessive Sleep
                                </h2>
                                <ul className="space-y-2">
                                    <li className="flex items-start text-sm text-gray-700">
                                        <span className="mr-2 text-red-500">•</span> 
                                        Try to limit your sleep duration to 7-8 hours per night
                                    </li>
                                    <li className="flex items-start text-sm text-gray-700">
                                        <span className="mr-2 text-red-500">•</span> 
                                        Set a consistent wake-up time and avoid oversleeping on weekends
                                    </li>
                                    <li className="flex items-start text-sm text-gray-700">
                                        <span className="mr-2 text-red-500">•</span> 
                                        If you consistently need more than 9 hours of sleep, consider consulting a healthcare provider
                                    </li>
                                </ul>
                            </Card>
                        ) : (
                            <Card className="p-4 mt-6 border-indigo-100 bg-indigo-50">
                                <h2 className="mb-2 text-lg font-semibold text-indigo-700">
                                    Personalized Recommendations
                                </h2>
                                <ul className="space-y-2">
                                    <li className="flex items-start text-sm text-gray-700">
                                        <span className="mr-2 text-indigo-500">•</span> 
                                        You're sleeping at an optimal level, maintain your current sleep routine
                                    </li>
                                    <li className="flex items-start text-sm text-gray-700">
                                        <span className="mr-2 text-indigo-500">•</span> 
                                        Continue to maintain a consistent sleep schedule
                                    </li>
                                    <li className="flex items-start text-sm text-gray-700">
                                        <span className="mr-2 text-indigo-500">•</span> 
                                        Your sleep quality is excellent - keep focusing on your bedtime routine
                                    </li>
                                </ul>
                            </Card>
                        )}
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default SleepQualityTracker;