import React, { useState, useEffect } from 'react';
import { Moon, TrendingUp } from 'lucide-react';

const SleepRecommendations = () => {
    // State to store backend responses
    const [recommendations, setRecommendations] = useState([]);
    const [howToImprove, setHowToImprove] = useState([]);

    useEffect(() => {
        const fetchRecommendations = async () => {
            try {
                // Fetch recommendations from your backend API
                const response = await fetch('/api/sleep-recommendations', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch recommendations');
                }

                // Parse the JSON response from the backend
                const data = await response.json();

                // Set the state with backend responses
                // These should match exactly what your backend sends
                setRecommendations(data.recommendations || []);
                setHowToImprove(data.howToImprove || []);
            } catch (error) {
                console.error('Error fetching recommendations:', error);
            }
        };

        fetchRecommendations();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-extrabold text-gray-800 mb-4 flex justify-center items-center">
                        <Moon className="mr-3 text-blue-600" size={36} />
                        Your Personalized Sleep Insights
                    </h1>
                </div>

                <div className="space-y-6">
                    {/* Recommendations Section */}
                    <div className="bg-white shadow-lg rounded-xl p-6">
                        <div className="flex items-center mb-4 text-blue-600">
                            <TrendingUp className="mr-3 w-8 h-8" />
                            <h2 className="text-xl font-bold">Recommendations</h2>
                        </div>

                        {/* Direct display of backend recommendations */}
                        {recommendations.length > 0 ? (
                            <ul className="space-y-3">
                                {recommendations.map((rec, index) => (
                                    <li
                                        key={index}
                                        className="pl-4 relative before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:rounded-full before:bg-blue-500"
                                    >
                                        {rec}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-500">No recommendations available</p>
                        )}
                    </div>

                    {/* How to Improve Section */}
                    <div className="bg-white shadow-lg rounded-xl p-6">
                        <div className="flex items-center mb-4 text-green-600">
                            <TrendingUp className="mr-3 w-8 h-8" />
                            <h2 className="text-xl font-bold">Improvement</h2>
                        </div>

                        {/* Direct display of backend how to improve suggestions */}
                        {howToImprove.length > 0 ? (
                            <ul className="space-y-3">
                                {howToImprove.map((improve, index) => (
                                    <li
                                        key={index}
                                        className="pl-4 relative before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:rounded-full before:bg-green-500"
                                    >
                                        {improve}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-500">No improvement suggestions available</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SleepRecommendations;