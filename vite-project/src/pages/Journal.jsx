import React, { useState } from 'react';
import { Calendar, Moon, Smartphone, Book, Clock, Activity, MessageSquare } from 'lucide-react';

function Journal() {
  // Sample journal entries data
  const [journalEntries] = useState([
    {
      id: 1,
      date: "2024-03-15",
      sleepQuality: 8,
      screenTime: "4.5",
      studyTime: "6",
      sleepDuration: "7.5",
      physicalActivities: "30 min yoga, 20 min walk",
      recommendation: "Based on your sleep patterns, try to reduce screen time before bed. Consider meditation for better sleep quality."
    },
    {
      id: 2,
      date: "2024-03-14",
      sleepQuality: 7,
      screenTime: "5",
      studyTime: "5",
      sleepDuration: "7",
      physicalActivities: "45 min gym workout",
      recommendation: "Great job with physical activity! To improve sleep quality, maintain a consistent bedtime routine."
    }
  ]);

  return (
    <div className="min-h-screen bg-[#0a1128] text-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 mt-10">
          Your Sleep Journal
        </h1>

        <div className="grid gap-6">
          {journalEntries.map((entry, index) => (
            <div
              key={entry.id}
              className="bg-[#1a2b4c] rounded-lg p-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
              style={{
                animation: `fadeSlideIn 0.5s ease-out ${index * 0.1}s both`
              }}
            >
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-blue-300">
                    <Calendar size={20} />
                    <span className="font-semibold">{entry.date}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <Moon size={18} className="text-blue-400" />
                      <div>
                        <p className="text-sm text-blue-300">Sleep Quality</p>
                        <p className="font-semibold">{entry.sleepQuality}/10</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Smartphone size={18} className="text-blue-400" />
                      <div>
                        <p className="text-sm text-blue-300">Screen Time</p>
                        <p className="font-semibold">{entry.screenTime} hours</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Book size={18} className="text-blue-400" />
                      <div>
                        <p className="text-sm text-blue-300">Study Time</p>
                        <p className="font-semibold">{entry.studyTime} hours</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Clock size={18} className="text-blue-400" />
                      <div>
                        <p className="text-sm text-blue-300">Sleep Duration</p>
                        <p className="font-semibold">{entry.sleepDuration} hours</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <Activity size={18} className="text-blue-400 mt-1" />
                    <div>
                      <p className="text-sm text-blue-300">Physical Activities</p>
                      <p className="font-semibold">{entry.physicalActivities}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-[#243b6b] rounded-lg p-4">
                  <div className="flex items-start gap-2 mb-2">
                    <MessageSquare size={18} className="text-blue-300" />
                    <h3 className="font-semibold">AI Recommendation</h3>
                  </div>
                  <p className="text-blue-100 leading-relaxed">
                    {entry.recommendation}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Journal;