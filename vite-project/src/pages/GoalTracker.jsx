import { useState, useEffect } from "react";
import PropTypes from "prop-types"; // Import PropTypes
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
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

// Add PropTypes validation for Button
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

// Add PropTypes validation for Card
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
    };

    const BADGES = {
        bronze: "#cd7f32",
        silver: "#c0c0c0",
        gold: "#ffd700"
    };

    // Fetch data from database when component mounts
    useEffect(() => {
        const fetchUserSleepData = async () => {
        setLoading(true);
        try {
            // Replace with your actual API endpoint
            // This is a simulated API response for demonstration
            // const response = await fetch('/api/sleep-data');
            // const data = await response.json();
            
            // Simulated API response
            await new Promise(resolve => setTimeout(resolve, 800)); // Simulate network delay
            const data = {
            previousPredictedQuality: 6.5,
            currentPredictedQuality: 7.2,
            userGoal: 8,
            currentStreak: 3,
            badge: "Bronze Sleeper",
            weeklyData: [
                { day: "Mon", quality: 5.8 },
                { day: "Tue", quality: 6.2 },
                { day: "Wed", quality: 6.5 },
                { day: "Thu", quality: 6.8 },
                { day: "Fri", quality: 7.0 },
                { day: "Sat", quality: 7.2 },
                { day: "Sun", quality: 0 } // Predicted value
            ]
            };
            
            // Update state with database values
            setPrevQuality(data.previousPredictedQuality);
            setLatestQuality(data.currentPredictedQuality);
            setGoal(data.userGoal);
            setStreak(data.currentStreak);
            setBadge(data.badge);
            setWeeklyData(data.weeklyData);
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
        if (latestQuality >= goal && !loading) {
        setStreak(prevStreak => {
            const newStreak = prevStreak + 1;
            // Update badge based on streak
            if (newStreak === 3) setBadge("Bronze Sleeper");
            if (newStreak === 5) setBadge("Silver Sleeper");
            if (newStreak === 7) setBadge("Gold Sleeper");
            return newStreak;
        });
        }
    }, [latestQuality, goal, loading]);

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

    // Goal progress calculation
    const progressPercentage = Math.min(100, (latestQuality / goal) * 100);
    
    // Calculate improvement
    const improvement = (latestQuality - prevQuality).toFixed(1);
    const improvementColor = improvement >= 0 ? COLORS.success : COLORS.warning;

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
        <div className="min-h-screen p-4 sm:p-6 bg-gray-50" style={{ marginTop: '20px' }}>
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
                        fill={COLORS.primary} 
                        radius={[4, 4, 0, 0]}
                        />
                    </BarChart>
                    </ResponsiveContainer>
                </div>
                <div className="mt-2 text-sm text-center text-gray-500">
                    <span className="inline-block px-2 py-1 text-indigo-700 bg-indigo-100 rounded-md">
                    Today's Predicted Quality: {latestQuality.toFixed(1)}/10
                    </span>
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
                    <p className="mb-1 text-sm text-gray-600">Current Goal: <span className="font-semibold text-indigo-600">{goal}/10</span></p>
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
                        <p className="text-xs text-gray-500">consecutive days on target</p>
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
                        <span className="font-semibold text-indigo-600">{prevQuality.toFixed(1)}/10</span>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded-md bg-gray-50">
                        <span className="text-sm text-gray-600">Predicted Quality</span>
                        <span className="font-semibold text-indigo-600">{latestQuality.toFixed(1)}/10</span>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded-md bg-gray-50">
                        <span className="text-sm text-gray-600">Improvement</span>
                        <span className="font-semibold" style={{ color: improvementColor }}>
                        {improvement > 0 ? '+' : ''}{improvement}
                        </span>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded-md bg-gray-50">
                        <span className="text-sm text-gray-600">From Goal</span>
                        <span className="font-semibold text-indigo-600">
                        {(goal - latestQuality).toFixed(1)}
                        </span>
                    </div>
                    </div>
                </Card>
                </div>

                {/* Recommendations */}
                {latestQuality < goal && (
                <Card className="p-4 mt-6 border-indigo-100 bg-indigo-50">
                    <h2 className="mb-2 text-lg font-semibold text-indigo-700">
                    Personalized Recommendations
                    </h2>
                    <ul className="space-y-2">
                    <li className="flex items-start text-sm text-gray-700">
                        <span className="mr-2 text-indigo-500">•</span> 
                        Try to maintain a consistent sleep schedule, even on weekends
                    </li>
                    <li className="flex items-start text-sm text-gray-700">
                        <span className="mr-2 text-indigo-500">•</span> 
                        Consider reducing screen time 1 hour before bed
                    </li>
                    <li className="flex items-start text-sm text-gray-700">
                        <span className="mr-2 text-indigo-500">•</span> 
                        Your sleep shows improvement - keep focusing on your bedtime routine
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