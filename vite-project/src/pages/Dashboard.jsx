import { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    Area,
    AreaChart
} from 'recharts';
import { AlertCircle, Moon, ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';

const Dashboard = ({ apiUrl = "/api/user-data", authToken = null }) => {
    // Enhanced color palette
    const colors = {
        background: "#080030",
        card: "#FFFFFF",
        text: "#080030",
        accent1: "#9F1CFD",
        accent2: "#B34BFE",
        neutral: "#AFA99E",
        sleepDuration: "#6366F1", // Indigo
        caffeineIntake: "#F59E0B", // Amber
        physicalActivity: "#10B981", // Emerald
        screenTime: "#EC4899", // Pink
        studyHours: "#8B5CF6"  // Violet
    };

    const [allData, setAllData] = useState([]);
    const [displayData, setDisplayData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState(null);
    const [showSleepQuality, setShowSleepQuality] = useState(true);
    const [showSleepFactors, setShowSleepFactors] = useState(true);
    const [animateHeader, setAnimateHeader] = useState(false);
    const [sleepScore, setSleepScore] = useState(0);
    const [currentWeekIndex, setCurrentWeekIndex] = useState(0);
    const [totalWeeks, setTotalWeeks] = useState(1);

    // Function to validate data structure
    const validateDataItem = useCallback((item) => {
        const requiredFields = [
            'date', 'sleepQuality', 'sleepDuration',
            'caffeineIntake', 'physicalActivity',
            'screenTime', 'studyHours'
        ];

        for (const field of requiredFields) {
            if (!(field in item)) {
                return false;
            }
        }

        // Validate data types
        if (typeof item.sleepQuality !== 'number' ||
            typeof item.sleepDuration !== 'number' ||
            typeof item.caffeineIntake !== 'number' ||
            typeof item.physicalActivity !== 'number' ||
            typeof item.screenTime !== 'number' ||
            typeof item.studyHours !== 'number') {
            return false;
        }

        // Validate date
        try {
            if (isNaN(new Date(item.date).getTime())) {
                return false;
            }
        } catch (e) {
            console.error("Error formatting date:", e);
            return false;
        }

        return true;
    }, []);

    // Function to update display data based on week index
    const updateDisplayData = useCallback((data, weekIndex) => {
        const endIndex = data.length - (weekIndex * 7);
        const startIndex = Math.max(0, endIndex - 7);

        const weekData = data.slice(startIndex, endIndex).reverse();
        setDisplayData(weekData);

        // Calculate sleep score from the current week data
        if (weekData.length > 0) {
            const avgSleepQuality = weekData.reduce((acc, day) => acc + day.sleepQuality, 0) / weekData.length;
            setSleepScore(Math.round(avgSleepQuality * 10));
        } else {
            setSleepScore(0);
        }
    }, []);

    // Function to fetch data
    const fetchData = useCallback(async () => {
        try {
            setRefreshing(true);

            const headers = {
                'Content-Type': 'application/json',
            };

            if (authToken) {
                headers['Authorization'] = `Bearer ${authToken}`;
            }

            const response = await fetch(apiUrl, { headers });

            if (!response.ok) {
                // Instead of throwing errors, we'll just log them and continue with empty data
                console.error(`Network response was not ok: ${response.status} ${response.statusText}`);
                setError(`Network response was not ok: ${response.status} ${response.statusText}`);
                setAllData([]);
                setDisplayData([]);
                setRefreshing(false);
                setLoading(false);
                return;
            }

            const result = await response.json();

            // Validate data structure
            if (!Array.isArray(result)) {
                console.error("Invalid data format: expected an array");
                setError("Invalid data format: expected an array");
                setAllData([]);
                setDisplayData([]);
                setRefreshing(false);
                setLoading(false);
                return;
            }

            const validatedData = result.filter(item => validateDataItem(item));

            if (validatedData.length === 0) {
                console.warn("No valid data items found");
                setError("No valid data items found");
                setAllData([]);
                setDisplayData([]);
                setRefreshing(false);
                setLoading(false);
                return;
            }

            if (validatedData.length < result.length) {
                console.warn(`Found ${result.length - validatedData.length} invalid data items`);
            }

            // Sort data by date
            validatedData.sort((a, b) => new Date(a.date) - new Date(b.date));

            setAllData(validatedData);

            // Calculate total weeks available in the data
            const totalDays = validatedData.length;
            const calculatedTotalWeeks = Math.ceil(totalDays / 7);
            setTotalWeeks(calculatedTotalWeeks);

            // Set display data to the most recent week
            updateDisplayData(validatedData, 0);

            setError(null);
            setRefreshing(false);
            setLoading(false);
        } catch (err) {
            console.error("Error fetching data:", err);
            setError(err.message || "An error occurred while fetching data");
            setAllData([]);
            setDisplayData([]);
            setRefreshing(false);
            setLoading(false);
        }
    }, [apiUrl, authToken, validateDataItem, updateDisplayData]);

    // Navigate to previous week
    const goToPreviousWeek = useCallback(() => {
        if (currentWeekIndex < totalWeeks - 1) {
            const newIndex = currentWeekIndex + 1;
            setCurrentWeekIndex(newIndex);
            updateDisplayData(allData, newIndex);
        }
    }, [currentWeekIndex, totalWeeks, allData, updateDisplayData]);

    // Navigate to next week
    const goToNextWeek = useCallback(() => {
        if (currentWeekIndex > 0) {
            const newIndex = currentWeekIndex - 1;
            setCurrentWeekIndex(newIndex);
            updateDisplayData(allData, newIndex);
        }
    }, [currentWeekIndex, allData, updateDisplayData]);

    // Initial data fetch
    useEffect(() => {
        fetchData();

        // Animate header after component mounts
        const animationTimer = setTimeout(() => {
            setAnimateHeader(true);
        }, 300);

        // Load Roboto font from Google Fonts
        const robotoFont = document.createElement('link');
        robotoFont.rel = 'stylesheet';
        robotoFont.href = 'https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap';
        document.head.appendChild(robotoFont);

        return () => {
            clearTimeout(animationTimer);
        };
    }, [fetchData]);

    // Format date for display
    const formatDate = useCallback((dateString) => {
        try {
            const date = new Date(dateString);
            if (isNaN(date.getTime())) {
                throw new Error("Invalid date");
            }
            return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
        } catch (e) {
            console.error("Error formatting date:", e);
            return "Invalid date";
        }
    }, []);

    // Custom tooltip for line chart
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length > 0 && payload[0] && 'value' in payload[0]) {
            return (
                <div className="bg-white p-4 border border-purple-300 rounded shadow-lg" style={{ fontFamily: 'Roboto, sans-serif' }}>
                    <p className="font-bold text-purple-900">{formatDate(label)}</p>
                    <p className="text-purple-800">
                        <span className="font-medium">Sleep Quality: </span>
                        <span>{`${payload[0].value}`}</span>
                    </p>
                </div>
            );
        }
        return null;
    };

    // Prop validation for CustomTooltip
    CustomTooltip.propTypes = {
        active: PropTypes.bool,
        payload: PropTypes.arrayOf(
            PropTypes.shape({
                value: PropTypes.number
            })
        ),
        label: PropTypes.string
    };

    // Card component with toggle
    const Card = ({ title, icon, children, isOpen, toggleOpen }) => {
        return (
            <div className="bg-white rounded-lg shadow-lg mb-6 overflow-hidden transition-all duration-300 hover:shadow-xl" style={{ fontFamily: 'Roboto, sans-serif' }}>
                <div
                    className="p-4 flex justify-between items-center cursor-pointer bg-gradient-to-r from-purple-600 to-indigo-600 text-white"
                    onClick={toggleOpen}
                >
                    <div className="flex items-center">
                        {icon}
                        <h3 className="text-lg font-semibold ml-2">{title}</h3>
                    </div>
                    {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </div>
                {isOpen && (
                    <div className="p-4">
                        {children}
                    </div>
                )}
            </div>
        );
    };

    // Prop validation for Card
    Card.propTypes = {
        title: PropTypes.string.isRequired,
        icon: PropTypes.node,
        children: PropTypes.node,
        isOpen: PropTypes.bool.isRequired,
        toggleOpen: PropTypes.func.isRequired
    };

    // Background pattern
    const BackgroundPattern = () => (
        <div className="absolute inset-0 overflow-hidden z-0">
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-purple-800 opacity-10 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-indigo-600 opacity-10 blur-3xl"></div>
            <div className="absolute top-1/2 left-1/3 w-40 h-40 rounded-full bg-pink-600 opacity-10 blur-3xl"></div>
        </div>
    );

    // Loading indicators
    if (loading) {
        return (
            <div style={{ backgroundColor: colors.background, fontFamily: 'Roboto, sans-serif' }} className="p-5 pt-16 min-h-screen flex items-center justify-center">
                <div className="animate-pulse flex flex-col items-center">
                    <div className="w-12 h-12 border-4 border-t-purple-500 border-r-transparent border-b-purple-500 border-l-transparent rounded-full animate-spin mb-4"></div>
                    <p className="text-xl text-white">Loading your sleep insights...</p>
                </div>
            </div>
        );
    }

    return (
        <div style={{ backgroundColor: colors.background, fontFamily: 'Roboto, sans-serif' }} className="p-5 pt-16 min-h-screen relative">
            <BackgroundPattern />

            <div className={`relative z-10 transition-all duration-700 ${animateHeader ? 'opacity-100' : 'opacity-0'}`}>
                <div className="flex flex-col items-center mb-8">
                    <h2 className="text-3xl font-bold text-center text-white mb-2">Sleep & Lifestyle Analytics</h2>
                    <div className="h-1 w-40 bg-gradient-to-r from-purple-500 to-indigo-500 rounded"></div>
                </div>

                {refreshing && (
                    <div className="fixed top-16 left-0 right-0 z-50">
                        <div className="h-1 bg-purple-500 animate-pulse"></div>
                    </div>
                )}

                {/* Date navigation */}
                <div className="mb-4 flex justify-between items-center">
                    <button
                        onClick={goToPreviousWeek}
                        disabled={currentWeekIndex >= totalWeeks - 1}
                        className={`flex items-center px-3 py-2 rounded bg-purple-600 text-white ${currentWeekIndex >= totalWeeks - 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-purple-700'}`}
                    >
                        <ChevronLeft size={16} className="mr-1" />
                        <span>Previous</span>
                    </button>

                    <div className="text-white">
                        {displayData.length > 0 ? (
                            <span>
                                {formatDate(displayData[displayData.length - 1]?.date || '')} - {formatDate(displayData[0]?.date || '')}
                            </span>
                        ) : (
                            <span>No data available</span>
                        )}
                    </div>

                    <button
                        onClick={goToNextWeek}
                        disabled={currentWeekIndex <= 0}
                        className={`flex items-center px-3 py-2 rounded bg-purple-600 text-white ${currentWeekIndex <= 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-purple-700'}`}
                    >
                        <span>Next</span>
                        <ChevronRight size={16} className="ml-1" />
                    </button>
                </div>

                {/* Refresh button */}
                <div className="mb-6 flex justify-end">
                    <button
                        onClick={fetchData}
                        disabled={refreshing}
                        className={`px-3 py-2 rounded bg-indigo-600 text-white ${refreshing ? 'opacity-50 cursor-not-allowed' : 'hover:bg-indigo-700'}`}
                    >
                        {refreshing ? 'Refreshing...' : 'Refresh Data'}
                    </button>
                </div>

                {/* Sleep Scorecard */}
                <div className="mb-6">
                    <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg shadow-lg p-4 flex items-center justify-between">
                        <div className="text-white">
                            <h3 className="text-lg font-semibold mb-1">Sleep Score</h3>
                            <p className="text-sm opacity-80">
                                {displayData.length > 0
                                    ? `${formatDate(displayData[displayData.length - 1]?.date || '')} - ${formatDate(displayData[0]?.date || '')}`
                                    : 'No data available'}
                            </p>
                        </div>
                        <div className="flex items-center">
                            <div className="text-4xl font-bold text-white mr-2">{sleepScore}</div>
                            <div className="text-lg text-white opacity-80">/100</div>
                        </div>
                    </div>
                </div>

                {/* Line Chart: Sleep Quality Over Time */}
                <Card
                    title="Sleep Quality Trends"
                    icon={<Moon size={20} />}
                    isOpen={showSleepQuality}
                    toggleOpen={() => setShowSleepQuality(!showSleepQuality)}
                >
                    {displayData.length > 0 ? (
                        <ResponsiveContainer width="100%" height={300}>
                            <AreaChart data={displayData}>
                                <defs>
                                    <linearGradient id="colorSleep" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor={colors.accent1} stopOpacity={0.8}/>
                                        <stop offset="95%" stopColor={colors.accent1} stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                                <XAxis
                                    dataKey="date"
                                    stroke={colors.text}
                                    tickFormatter={formatDate}
                                    style={{ fontFamily: 'Roboto, sans-serif' }}
                                />
                                <YAxis
                                    label={{
                                        value: 'Sleep Quality (1-10)',
                                        angle: -90,
                                        position: 'insideLeft',
                                        style: { fill: colors.text, fontFamily: 'Roboto, sans-serif' }
                                    }}
                                    domain={[0, 10]}
                                    stroke={colors.text}
                                    style={{ fontFamily: 'Roboto, sans-serif' }}
                                />
                                <Tooltip content={<CustomTooltip />} />
                                <Legend wrapperStyle={{ fontFamily: 'Roboto, sans-serif' }} />
                                <Area
                                    type="monotone"
                                    dataKey="sleepQuality"
                                    stroke={colors.accent1}
                                    strokeWidth={3}
                                    fillOpacity={1}
                                    fill="url(#colorSleep)"
                                    name="Sleep Quality"
                                    activeDot={{ r: 8, fill: colors.accent2 }}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    ) : (
                        <div className="text-center p-6 text-gray-500">No sleep quality data available for this period</div>
                    )}
                </Card>

                {/* Multi-Bar Chart: Sleep Factors Comparison */}
                <Card
                    title="Sleep Factors Analysis"
                    icon={<AlertCircle size={20} />}
                    isOpen={showSleepFactors}
                    toggleOpen={() => setShowSleepFactors(!showSleepFactors)}
                >
                    <div className="mb-4 flex flex-wrap gap-3">
                        <div className="flex items-center">
                            <div className="w-3 h-3 rounded-full bg-indigo-500 mr-1"></div>
                            <span className="text-xs">Sleep Duration</span>
                        </div>
                        <div className="flex items-center">
                            <div className="w-3 h-3 rounded-full bg-amber-500 mr-1"></div>
                            <span className="text-xs">Caffeine</span>
                        </div>
                        <div className="flex items-center">
                            <div className="w-3 h-3 rounded-full bg-emerald-500 mr-1"></div>
                            <span className="text-xs">Activity</span>
                        </div>
                        <div className="flex items-center">
                            <div className="w-3 h-3 rounded-full bg-pink-500 mr-1"></div>
                            <span className="text-xs">Screen Time</span>
                        </div>
                        <div className="flex items-center">
                            <div className="w-3 h-3 rounded-full bg-violet-500 mr-1"></div>
                            <span className="text-xs">Study</span>
                        </div>
                    </div>
                    {displayData.length > 0 ? (
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={displayData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                                <XAxis
                                    dataKey="date"
                                    stroke={colors.text}
                                    tickFormatter={formatDate}
                                    style={{ fontFamily: 'Roboto, sans-serif' }}
                                />
                                <YAxis
                                    stroke={colors.text}
                                    style={{ fontFamily: 'Roboto, sans-serif' }}
                                />
                                <Tooltip
                                    formatter={(value, name) => [value, name]}
                                    labelFormatter={formatDate}
                                    contentStyle={{ fontFamily: 'Roboto, sans-serif' }}
                                />
                                <Legend wrapperStyle={{ fontFamily: 'Roboto, sans-serif' }} />
                                <Bar
                                    dataKey="sleepDuration"
                                    fill={colors.sleepDuration}
                                    name="Sleep Duration (hrs)"
                                />
                                <Bar
                                    dataKey="caffeineIntake"
                                    fill={colors.caffeineIntake}
                                    name="Caffeine Intake (cups)"
                                />
                                <Bar
                                    dataKey="physicalActivity"
                                    fill={colors.physicalActivity}
                                    name="Physical Activity (hrs)"
                                />
                                <Bar
                                    dataKey="screenTime"
                                    fill={colors.screenTime}
                                    name="Screen Time (hrs)"
                                />
                                <Bar
                                    dataKey="studyHours"
                                    fill={colors.studyHours}
                                    name="Study Hours"
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    ) : (
                        <div className="text-center p-6 text-gray-500">No sleep factors data available for this period</div>
                    )}
                </Card>
            </div>
        </div>
    );
};

// PropTypes validation
Dashboard.propTypes = {
    apiUrl: PropTypes.string,
    authToken: PropTypes.string
};

export default Dashboard;