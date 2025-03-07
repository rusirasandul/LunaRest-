import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const SleepGoalTracker = () => {
    const [prevQuality, setPrevQuality] = useState(6); // Example previous score
    const [latestQuality, setLatestQuality] = useState(7); // Example latest score
    const [goal, setGoal] = useState(8); // User-defined goal
    const [streak, setStreak] = useState(0);
    const [badge, setBadge] = useState(null);
    const [inputGoal, setInputGoal] = useState("");

    const COLORS = ["#8884d8", "#82ca9d"];

    useEffect(() => {
        if (latestQuality >= goal) {
            setStreak(streak + 1);
            if (streak + 1 === 3) setBadge("Bronze Sleeper");
            if (streak + 1 === 5) setBadge("Silver Sleeper");
            if (streak + 1 === 7) setBadge("Gold Sleeper");
        }
        }, [latestQuality, goal]);
    
        const handleSetGoal = () => {
        const numGoal = parseInt(inputGoal);
        if (!isNaN(numGoal) && numGoal > 0 && numGoal <= 10) {
            setGoal(numGoal);
            setInputGoal("");
        }
        };
    
        const data = [
        { name: "Previous", value: prevQuality },
        { name: "Latest", value: latestQuality }
        ];
    
        return (
        <div className="flex flex-col items-center p-6 space-y-6">
            <h2 className="text-2xl font-bold">Sleep Goal Tracker</h2>
    
            {/* Donut Chart */}
            <PieChart width={300} height={300}>
            <Pie
                data={data}
                cx={150}
                cy={150}
                innerRadius={60}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label
            >
                {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
            </Pie>
            <Tooltip />
            <Legend />
            </PieChart>
    
            {/* Goal Setting */}
            <Card className="w-full max-w-md p-4">
            <CardContent className="flex flex-col items-center space-y-4">
                <p>Current Goal: <span className="font-semibold">{goal}/10</span></p>
                <input
                type="number"
                min="1"
                max="10"
                value={inputGoal}
                onChange={(e) => setInputGoal(e.target.value)}
                className="w-full p-2 text-center border rounded"
                placeholder="Set new goal (1-10)"
                />
                <Button onClick={handleSetGoal}>Set Goal</Button>
            </CardContent>
            </Card>
    
            {/* Streak System */}
            <div className="text-center">
            <p className="text-lg font-semibold">Streak: {streak} days</p>
            {badge && <p className="font-bold text-green-500">🏆 {badge} Badge Earned!</p>}
            </div>
        </div>
    );
    };

export default SleepGoalTracker;