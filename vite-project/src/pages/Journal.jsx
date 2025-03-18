import React, { useState } from 'react';
import {
  Calendar,
  Moon,
  Smartphone,
  Book,
  Clock,
  Activity,
  MessageSquare,
} from 'lucide-react';

// Single Journal Entry Component
const JournalEntry = ({ entry, index }) => (
  <div
    className="bg-indigo-950/40 rounded-lg p-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 mb-6 border border-indigo-800/30 backdrop-blur-sm "
    style={{ animation: `fadeSlideIn 0.5s ease-out ${index * 0.1}s both` }}
  >
    <div className="grid md:grid-cols-2 gap-6">
      {/* Left Side: Entry Details */}
      <div className="space-y-4">
        {/* Date */}
        <div className="flex items-center gap-3 text-indigo-200">
          <Calendar size={20} className="text-purple-400" />
          <span className="font-semibold">{entry.date}</span>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 gap-4">
          {/* Sleep Quality */}
          <div className="flex items-center gap-2">
            <Moon size={18} className="text-purple-400" />
            <div>
              <p className="text-sm text-indigo-300">Sleep Quality</p>
              <p className="font-semibold text-white">{entry.sleepQuality}/10</p>
            </div>
          </div>

          {/* Screen Time */}
          <div className="flex items-center gap-2">
            <Smartphone size={18} className="text-purple-400" />
            <div>
              <p className="text-sm text-indigo-300">Screen Time</p>
              <p className="font-semibold text-white">{entry.screenTime} hours</p>
            </div>
          </div>

          {/* Study Time */}
          <div className="flex items-center gap-2">
            <Book size={18} className="text-purple-400" />
            <div>
              <p className="text-sm text-indigo-300">Study Time</p>
              <p className="font-semibold text-white">{entry.studyTime} hours</p>
            </div>
          </div>

          {/* Sleep Duration */}
          <div className="flex items-center gap-2">
            <Clock size={18} className="text-purple-400" />
            <div>
              <p className="text-sm text-indigo-300">Sleep Duration</p>
              <p className="font-semibold text-white">{entry.sleepDuration} hours</p>
            </div>
          </div>
        </div>

        {/* Physical Activities */}
        <div className="flex items-start gap-2">
          <Activity size={18} className="text-purple-400 mt-1" />
          <div>
            <p className="text-sm text-indigo-300">Physical Activities</p>
            <p className="font-semibold text-white">{entry.physicalActivities}</p>
          </div>
        </div>
      </div>

      {/* Right Side: AI Recommendation */}
      <div className="bg-indigo-900/30 rounded-lg p-4 flex flex-col backdrop-blur-sm border border-indigo-700/20">
        <div className="flex items-start gap-2 mb-2">
          <MessageSquare size={18} className="text-purple-300 mt-[2px]" />
          <h3 className="font-semibold text-indigo-200">AI Recommendation</h3>
        </div>
        <p className="text-indigo-100/90 leading-relaxed flex-grow">
          {entry.recommendation}
        </p>
      </div>
    </div>
  </div>
);

// Main App Component
function Journal() {
  const [journalEntries] = useState([
    {
      id: 1,
      date: '2024-03-15',
      sleepQuality: 8,
      screenTime: '4.5',
      studyTime: '6',
      sleepDuration: '7.5',
      physicalActivities: '30 min yoga, 20 min walk',
      recommendation:
        'Based on your sleep patterns, try to reduce screen time before bed. Consider meditation for better sleep quality.',
    },
    {
      id: 2,
      date: '2024-03-14',
      sleepQuality: 7,
      screenTime: '5',
      studyTime: '5',
      sleepDuration: '7',
      physicalActivities: '45 min gym workout',
      recommendation:
        'Great job with physical activity! To improve sleep quality, maintain a consistent bedtime routine.',
    },
  ]);

  return (
    <section className="min-h-screen bg-gradient-to-b from-[#0a0225] via-indigo-950 to-purple-950 text-white p-8 ">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?q=80&w=2342')] opacity-5 bg-cover bg-center mix-blend-overlay " />
      <main className="max-w-6xl mx-auto relative">
        {/* Heading */}
        <div className="text-center mb-12 mt-10">
          <h1 className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-purple-200 to-purple-400">
            Your Sleep Journal
          </h1>
          <p className="text-indigo-400/80">Track your sleep patterns and daily activities</p>
        </div>

        {/* Entries List */}
        <div className="space-y-6">
          {journalEntries.length > 0 ? (
            journalEntries.map((entry, index) => (
              <JournalEntry key={entry.id} entry={entry} index={index} />
            ))
          ) : (
            <p className="text-center text-indigo-300">No journal entries found.</p>
          )}
        </div>
      </main>

      {/* Animation Keyframes */}
      <style jsx>{`
        @keyframes fadeSlideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}

export default Journal;
