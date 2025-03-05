import { useState, useEffect } from 'react';
import {
    LineChart,
    BarChart,
    Line,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts';

const Analytics = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("/api/user-data");
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                setData(result);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading data: {error.message}</p>;

    return (
        <div className="p-5 bg-gray-100 min-h-screen">
            <h2 className="text-2xl font-bold text-center mb-5">Sleep & Lifestyle Analytics</h2>

            {/* Line Chart: Sleep Quality Over Time */}
            <div className="bg-white p-4 rounded-lg shadow-md mb-8">
                <h3 className="text-lg font-semibold mb-3">Sleep Quality Over Time</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis
                            label={{ value: 'Sleep Quality (1-10)', angle: -90, position: 'insideLeft' }}
                            domain={[0, 10]}
                        />
                        <Tooltip />
                        <Legend />
                        <Line
                            type="monotone"
                            dataKey="sleepQuality"
                            stroke="#4f46e5"
                            strokeWidth={2}
                            name="Sleep Quality"
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            {/* Multi-Bar Chart: Sleep Factors Comparison */}
            <div className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-3">Sleep Factors Comparison</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar
                            dataKey="sleepDuration"
                            fill="#34d399"
                            name="Sleep Duration (hrs)"
                        />
                        <Bar
                            dataKey="caffeineIntake"
                            fill="#f87171"
                            name="Caffeine Intake (cups)"
                        />
                        <Bar
                            dataKey="physicalActivity"
                            fill="#60a5fa"
                            name="Physical Activity (hrs)"
                        />
                        <Bar
                            dataKey="screenTime"
                            fill="#fbbf24"
                            name="Screen Time (hrs)"
                        />
                        <Bar
                            dataKey="studyHours"
                            fill="#10b981"
                            name="Study Hours"
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default Analytics;