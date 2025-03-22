import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Cell } from "recharts";
import { Moon, Award, TrendingUp, Activity, Coffee, UserPlus, Settings, Bell } from "lucide-react";

// Utility function for combining class names
const cn = (...inputs) => {
    return inputs.filter(Boolean).join(" ");
};

// Button component with hover animation
const Button = ({ className, children, icon, ...props }) => {
    return (
        <button
        className={cn(
            "inline-flex items-center justify-center rounded-md bg-purple-700 px-4 py-2 text-sm font-medium text-white transition-all duration-300 hover:bg-purple-800 hover:shadow-lg hover:shadow-purple-900/20 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 transform hover:-translate-y-0.5",
            className
        )}
        {...props}
        >
            {icon && <span className="mr-2">{icon}</span>}
            {children}
        </button>
    );
};

Button.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
    icon: PropTypes.node
};

// Card component with hover effect
const Card = ({ className, children, hoverEffect = false }) => {
    return (
        <div className={cn(
            "bg-gray-800 rounded-lg shadow-md border border-gray-700 transition-all duration-300",
            hoverEffect && "hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-900/20",
            className
        )}>
            {children}
        </div>
    );
};

Card.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
    hoverEffect: PropTypes.bool
};

// Badge component
const Badge = ({ children, color = "purple" }) => {
    const colorClasses = {
        purple: "bg-purple-500/20 text-purple-300",
        blue: "bg-blue-500/20 text-blue-300",
        red: "bg-red-500/20 text-red-300",
        green: "bg-green-500/20 text-green-300"
    };

    return (
        <span className={cn(
            "inline-block px-2 py-1 text-xs font-medium rounded-full",
            colorClasses[color]
        )}>
            {children}
        </span>
    );
};

Badge.propTypes = {
    children: PropTypes.node.isRequired,
    color: PropTypes.string
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
    const [showMenu, setShowMenu] = useState(false);
    const [animatedEntries, setAnimatedEntries] = useState(false);

    // Color palette - Updated for dark theme
    const COLORS = {
        primary: "#a78bfa", // purple-400
        secondary: "#7c3aed", // purple-600
        accent: "#8b5cf6", // violet-500
        success: "#10b981", // emerald-500
        warning: "#f59e0b", // amber-500
        optimal: "#818cf8", // indigo-400
        excessive: "#f87171", // red-400
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
                // Simulate API call with timeout
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                // Mock data
                const data = {
                    weeklyData: [
                        { day: "Mon", quality: 4.2 },
                        { day: "Tue", quality: 3.8 },
                        { day: "Wed", quality: 4.5 },
                        { day: "Thu", quality: 6.2 },
                        { day: "Fri", quality: 5.9 },
                        { day: "Sat", quality: 4.7 },
                        { day: "Sun", quality: 4.1 }
                    ],
                    userGoal: 5,
                    currentStreak: 3,
                    badge: "Bronze Sleeper"
                };
                
                // Process and set the data
                const prevIndex = data.weeklyData.length - 2;
                const prevDayQuality = prevIndex >= 0 ? data.weeklyData[prevIndex].quality : 0;
                const latestQuality = data.weeklyData[data.weeklyData.length - 1].quality;
                
                setPrevQuality(prevDayQuality);
                setLatestQuality(latestQuality);
                setGoal(data.userGoal || 5);
                setStreak(data.currentStreak || 0);
                setBadge(data.badge || null);
                setWeeklyData(data.weeklyData || []);
                setLoading(false);
                
                // Trigger animations after data is loaded
                setTimeout(() => setAnimatedEntries(true), 300);
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
        if (latestQuality <= 5 && !loading) {
            setStreak(prevStreak => {
                const newStreak = prevStreak + 1;
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
    const progressPercentage = goal >= 5 
        ? Math.min(100, ((5 - Math.abs(latestQuality - 5)) / 5) * 100)
        : Math.min(100, (latestQuality / goal) * 100);
    
    // Calculate improvement
    const isCurrentExcessive = latestQuality > 5;
    const isPrevExcessive = prevQuality > 5;
    
    let improvement;
    if (isCurrentExcessive && isPrevExcessive) {
        improvement = (prevQuality - latestQuality).toFixed(1);
    } else if (!isCurrentExcessive && !isPrevExcessive) {
        improvement = (latestQuality - prevQuality).toFixed(1);
        if (latestQuality > 5 && prevQuality <= 5) {
            improvement = -Math.abs(improvement);
        }
    } else if (isCurrentExcessive && !isPrevExcessive) {
        improvement = -Math.abs((latestQuality - 5).toFixed(1));
    } else {
        improvement = Math.abs((5 - latestQuality).toFixed(1));
    }

    const improvementColor = parseFloat(improvement) >= 0 ? COLORS.success : COLORS.warning;

    // Determine color for each bar based on quality value
    const getBarColor = (quality) => {
        return quality > 5 ? COLORS.excessive : COLORS.optimal;
    };

    // Loading screen with animation
    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen p-6 bg-gray-900">
                <div className="text-center">
                    <div className="relative w-16 h-16 mx-auto mb-6">
                        <div className="absolute top-0 w-16 h-16 border-4 border-purple-500 rounded-full opacity-25"></div>
                        <div className="absolute top-0 w-16 h-16 border-4 border-purple-500 rounded-full border-t-transparent animate-spin"></div>
                        <Moon className="absolute top-0 bottom-0 left-0 right-0 w-6 h-6 m-auto text-purple-300 animate-pulse" />
                    </div>
                    <h3 className="mb-2 text-xl font-semibold text-purple-400">SleepTracker</h3>
                    <p className="text-gray-400">Loading your sleep insights...</p>
                </div>
            </div>
        );
    }

    // Error screen
    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen p-6 bg-gray-900">
                <Card className="max-w-md p-6 text-center">
                    <h2 className="mb-2 text-xl font-bold text-red-400">Error</h2>
                    <p className="mb-4 text-gray-300">{error}</p>
                    <Button onClick={() => window.location.reload()}>
                        Try Again
                    </Button>
                </Card>
            </div>
        );
    }

    // Main UI
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-950 to-gray-900">
            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-10 border-b border-gray-800 shadow-lg bg-gray-900/90 backdrop-blur-sm">
                <div className="flex items-center justify-between max-w-6xl px-4 py-4 mx-auto">
                    <div className="flex items-center">
                        <Moon className="w-6 h-6 mr-2 text-purple-500" />
                        <span className="text-xl font-bold text-white">SleepTracker</span>
                    </div>
                    
                    {/* Desktop nav */}
                    <div className="items-center hidden space-x-6 md:flex">
                        <a href="#" className="text-sm font-medium text-gray-300 transition-colors hover:text-white">Dashboard</a>
                        <a href="#" className="text-sm font-medium text-gray-300 transition-colors hover:text-white">Insights</a>
                        <a href="#" className="text-sm font-medium text-gray-300 transition-colors hover:text-white">Community</a>
                        <a href="#" className="text-sm font-medium text-gray-300 transition-colors hover:text-white">Help</a>
                    </div>
                    
                    {/* User menu */}
                    <div className="flex items-center space-x-3">
                        <button className="p-2 text-gray-300 transition-colors hover:text-white">
                            <Bell className="w-5 h-5" />
                        </button>
                        <div className="relative">
                            <button 
                                className="flex items-center space-x-2"
                                onClick={() => setShowMenu(!showMenu)}
                            >
                                <div className="flex items-center justify-center w-8 h-8 bg-purple-600 rounded-full">
                                    <span className="text-xs font-medium text-white">JD</span>
                                </div>
                                <span className="hidden text-sm font-medium text-white md:inline">John Doe</span>
                            </button>
                            
                            {showMenu && (
                                <div className="absolute right-0 w-48 mt-2 overflow-hidden bg-gray-800 border border-gray-700 rounded-md shadow-lg animate-fadeIn">
                                    <div className="py-2">
                                        <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-300 transition-colors hover:bg-gray-700 hover:text-white">
                                            <UserPlus className="w-4 h-4 mr-2" />
                                            Profile
                                        </a>
                                        <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-300 transition-colors hover:bg-gray-700 hover:text-white">
                                            <Settings className="w-4 h-4 mr-2" />
                                            Settings
                                        </a>
                                        <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-300 transition-colors hover:bg-gray-700 hover:text-white">
                                            <Coffee className="w-4 h-4 mr-2" />
                                            Support
                                        </a>
                                        <hr className="my-1 border-gray-700" />
                                        <a href="#" className="flex items-center px-4 py-2 text-sm text-red-400 transition-colors hover:bg-gray-700">
                                            Sign out
                                        </a>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main content */}
            <div className="max-w-6xl px-4 pt-24 pb-12 mx-auto sm:px-6 md:px-8">
                <div className={cn(
                    "mb-8 opacity-0 transform translate-y-4 transition-all duration-500", 
                    animatedEntries && "opacity-100 translate-y-0"
                )}>
                    <h1 className="text-3xl font-bold text-white">Sleep Goal Tracker</h1>
                    <p className="mt-2 text-gray-400">Track, analyze, and improve your sleep quality</p>
                </div>

                <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-3">
                    {/* Key metrics */}
                    {[
                        {
                            title: "Current Sleep Quality",
                            value: `${latestQuality.toFixed(1)}/10`,
                            desc: latestQuality > 5 ? "Excessive" : "Optimal",
                            color: latestQuality > 5 ? "red" : "blue",
                            icon: <Moon className="w-5 h-5" />
                        },
                        {
                            title: "Success Streak",
                            value: streak,
                            desc: "consecutive optimal days",
                            color: "purple",
                            icon: <TrendingUp className="w-5 h-5" />
                        },
                        {
                            title: "Today's Goal",
                            value: `${goal}/10`,
                            desc: `${progressPercentage.toFixed(0)}% complete`,
                            color: "green",
                            icon: <Award className="w-5 h-5" />
                        }
                    ].map((metric, index) => (
                        <Card 
                            key={index} 
                            hoverEffect={true}
                            className={cn(
                                "p-6 opacity-0 transform translate-y-4 transition-all duration-500",
                                animatedEntries && "opacity-100 translate-y-0",
                                // Stagger the animations
                                animatedEntries && `transition-delay-${index * 100}`
                            )}
                        >
                            <div className="flex items-center mb-4">
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-3 bg-${metric.color === "red" ? "red" : metric.color === "blue" ? "blue" : metric.color === "green" ? "green" : "purple"}-500/20`}>
                                    <span className={`text-${metric.color === "red" ? "red" : metric.color === "blue" ? "blue" : metric.color === "green" ? "green" : "purple"}-400`}>
                                        {metric.icon}
                                    </span>
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium text-gray-400">{metric.title}</h3>
                                    <div className="flex items-center">
                                        <p className="text-2xl font-bold text-white">{metric.value}</p>
                                        <Badge color={metric.color} className="ml-2">{metric.desc}</Badge>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>

                {/* Main content grid */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    {/* Chart - takes up 2 columns */}
                    <Card className={cn(
                        "p-6 lg:col-span-2 opacity-0 transform translate-y-4 transition-all duration-500",
                        animatedEntries && "opacity-100 translate-y-0 transition-delay-300"
                    )}>
                        <h2 className="flex items-center mb-4 text-lg font-semibold text-white">
                            <Activity className="w-5 h-5 mr-2 text-purple-400" />
                            Weekly Sleep Quality Trend
                        </h2>
                        <div className="w-full h-64 mb-4">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                    data={weeklyData}
                                    margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
                                >
                                    <XAxis dataKey="day" stroke="#9ca3af" />
                                    <YAxis domain={[0, 10]} stroke="#9ca3af" />
                                    <Tooltip 
                                        formatter={(value) => [`${value}/10`, 'Sleep Quality']}
                                        labelFormatter={(label) => `Day: ${label}`}
                                        contentStyle={{ backgroundColor: '#374151', borderColor: '#4B5563', color: '#F9FAFB' }}
                                        labelStyle={{ color: '#F9FAFB' }}
                                    />
                                    <Legend wrapperStyle={{ color: '#D1D5DB' }} />
                                    <Bar 
                                        name="Sleep Quality" 
                                        dataKey="quality" 
                                        radius={[4, 4, 0, 0]}
                                        animationBegin={300}
                                        animationDuration={1500}
                                    >
                                        {weeklyData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={getBarColor(entry.quality)} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="p-3 mt-2 text-center border border-gray-700 rounded-lg bg-gray-800/50">
                            <p className="text-sm text-gray-300">
                                <span className="font-medium">Sleep quality optimal range: </span> 
                                Values between 1-5 indicate optimal sleep quality, while values above 5 suggest excessive sleep.
                            </p>
                        </div>
                    </Card>

                    {/* Right column */}
                    <div className="flex flex-col space-y-6">
                        {/* Goal setting */}
                        <Card className={cn(
                            "p-6 opacity-0 transform translate-y-4 transition-all duration-500",
                            animatedEntries && "opacity-100 translate-y-0 transition-delay-400"
                        )}>
                            <h2 className="flex items-center mb-4 text-lg font-semibold text-white">
                                <TrendingUp className="w-5 h-5 mr-2 text-purple-400" />
                                Set Sleep Goal
                            </h2>
                            <div className="mb-4">
                                <p className="mb-2 text-sm text-gray-300">Target Quality: <span className="font-semibold text-purple-400">{goal}/10</span></p>
                                <div className="w-full h-2 overflow-hidden bg-gray-700 rounded-full">
                                    <div 
                                        className="h-full transition-all duration-1000 ease-out rounded-full bg-gradient-to-r from-purple-600 to-blue-600"
                                        style={{ width: `${progressPercentage}%` }}
                                    ></div>
                                </div>
                                <p className="mt-2 text-xs text-gray-400">
                                    {progressPercentage < 100 
                                        ? `You're ${progressPercentage.toFixed(1)}% of the way to your goal` 
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
                                    className="flex-1 px-3 py-2 text-sm text-gray-200 transition-colors bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    placeholder="New goal (1-10)"
                                />
                                <Button onClick={handleSetGoal}>Update</Button>
                            </div>
                        </Card>

                        {/* Achievements */}
                        <Card className={cn(
                            "p-6 opacity-0 transform translate-y-4 transition-all duration-500",
                            animatedEntries && "opacity-100 translate-y-0 transition-delay-500"
                        )}>
                            <h2 className="flex items-center mb-4 text-lg font-semibold text-white">
                                <Award className="w-5 h-5 mr-2 text-purple-400" />
                                Achievements
                            </h2>

                            {badge && (
                                <div className="flex items-center p-4 mb-4 border border-gray-700 rounded-lg bg-gray-800/50">
                                    <div 
                                        className="flex items-center justify-center w-12 h-12 mr-4 rounded-full"
                                        style={{ backgroundColor: getBadgeColor(), color: badge.includes("Gold") ? "#333" : "white" }}
                                    >
                                        <span className="text-xl">🏆</span>
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-white">{badge}</h3>
                                        <p className="text-sm text-gray-400">Earned for {streak} days of optimal sleep</p>
                                    </div>
                                </div>
                            )}

                            <div className="p-4 border border-gray-700 rounded-lg bg-gray-800/50">
                                <h3 className="mb-2 font-medium text-white">Next milestones</h3>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-300">7 days streak</span>
                                        <Badge color="purple">Gold Sleeper</Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-300">14 days streak</span>
                                        <Badge color="blue">Sleep Master</Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-300">30 days streak</span>
                                        <Badge color="green">Sleep Legend</Badge>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>

                {/* Recommendations */}
                <Card className={cn(
                    "p-6 mt-6 opacity-0 transform translate-y-4 transition-all duration-500",
                    animatedEntries && "opacity-100 translate-y-0 transition-delay-600"
                )}>
                    <h2 className="mb-4 text-lg font-semibold text-white">
                        {latestQuality > 5 ? "Recommendations for Excessive Sleep" : "Personalized Recommendations"}
                    </h2>
                    
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        {latestQuality > 5 ? (
                            // Excessive sleep recommendations
                            [
                                {
                                    icon: <Moon className="w-5 h-5" />,
                                    title: "Limit Sleep Duration",
                                    desc: "Try to limit your sleep to 7-8 hours per night for optimal rest."
                                },
                                {
                                    icon: <Activity className="w-5 h-5" />,
                                    title: "Consistent Wake-Up",
                                    desc: "Set a consistent wake-up time and avoid oversleeping on weekends."
                                },
                                {
                                    icon: <Coffee className="w-5 h-5" />,
                                    title: "Morning Routine",
                                    desc: "Establish an energizing morning routine to start your day effectively."
                                }
                            ].map((item, index) => (
                                <div 
                                    key={index} 
                                    className={cn(
                                        "p-4 rounded-lg bg-gray-800/50 border border-gray-700 hover:border-red-500/30 transition-colors",
                                        "opacity-0 transform translate-y-4 transition-all duration-500",
                                        animatedEntries && "opacity-100 translate-y-0",
                                        // Stagger the animations
                                        animatedEntries && `transition-delay-${600 + index * 100}`
                                    )}
                                >
                                    <div className="flex items-center mb-2">
                                        <div className="flex items-center justify-center w-8 h-8 mr-3 text-red-400 rounded-lg bg-red-500/20">
                                            {item.icon}
                                        </div>
                                        <h3 className="font-medium text-white">{item.title}</h3>
                                    </div>
                                    <p className="text-sm text-gray-300">{item.desc}</p>
                                </div>
                            ))
                        ) : (
                            // Optimal sleep recommendations
                            [
                                {
                                    icon: <Moon className="w-5 h-5" />,
                                    title: "Maintain Your Routine",
                                    desc: "You're sleeping at an optimal level. Keep your current sleep schedule."
                                },
                                {
                                    icon: <Activity className="w-5 h-5" />,
                                    title: "Pre-Sleep Relaxation",
                                    desc: "Continue your effective pre-sleep relaxation techniques."
                                },
                                {
                                    icon: <Coffee className="w-5 h-5" />,
                                    title: "Bedtime Consistency",
                                    desc: "Your consistent bedtime is working well. Keep it up!"
                                }
                            ].map((item, index) => (
                                <div 
                                    key={index} 
                                    className={cn(
                                        "p-4 rounded-lg bg-gray-800/50 border border-gray-700 hover:border-purple-500/30 transition-colors",
                                        "opacity-0 transform translate-y-4 transition-all duration-500",
                                        animatedEntries && "opacity-100 translate-y-0",
                                        // Stagger the animations
                                        animatedEntries && `transition-delay-${600 + index * 100}`
                                    )}
                                >
                                    <div className="flex items-center mb-2">
                                        <div className="flex items-center justify-center w-8 h-8 mr-3 text-purple-400 rounded-lg bg-purple-500/20">
                                            {item.icon}
                                        </div>
                                        <h3 className="font-medium text-white">{item.title}</h3>
                                    </div>
                                    <p className="text-sm text-gray-300">{item.desc}</p>
                                </div>
                            ))
                        )}
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default SleepQualityTracker;