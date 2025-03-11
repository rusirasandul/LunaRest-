import React, { useState, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Shuffle, Repeat, Heart, Minimize2, Maximize2 } from 'lucide-react';

function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isMinimized, setIsMinimized] = useState(true);
  
  // Sample song data
  const currentSong = {
    title: "Midnight Dreams",
    artist: "Electronic Waves",
    duration: 214, // duration in seconds
    coverUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop"
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Simulate time progress when playing
  useEffect(() => {
    let interval;
    if (isPlaying && currentTime < currentSong.duration) {
      interval = setInterval(() => {
        setCurrentTime(prev => Math.min(prev + 1, currentSong.duration));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentTime, currentSong.duration]);

  // Full player component
  const FullPlayer = () => (
    <div className="w-full max-w-4xl bg-blue-950 rounded-lg shadow-2xl p-8 transition-all duration-300">
      {/* Main content */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Album art */}
        <div className="w-full md:w-1/3">
          <img 
            src={currentSong.coverUrl} 
            alt="Album Cover" 
            className="w-full aspect-square rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300"
          />
        </div>

        {/* Player controls */}
        <div className="w-full md:w-2/3 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold mb-2">{currentSong.title}</h1>
              <p className="text-lg text-blue-300 mb-8">{currentSong.artist}</p>
            </div>
            <button 
              onClick={() => setIsMinimized(true)}
              className="text-blue-300 hover:text-white p-2"
            >
              <Minimize2 size={20} />
            </button>
          </div>

          {/* Progress bar */}
          <div className="mb-6">
            <div className="relative h-1 bg-blue-900 rounded-full">
              <div 
                className="absolute h-full bg-blue-400 rounded-full"
                style={{ width: `${(currentTime / currentSong.duration) * 100}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-sm mt-2 text-blue-300">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(currentSong.duration)}</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-center gap-8">
              <button className="text-blue-300 hover:text-white transition-colors">
                <Shuffle size={20} />
              </button>
              <button className="text-blue-300 hover:text-white transition-colors">
                <SkipBack size={24} />
              </button>
              <button 
                className="bg-blue-400 p-4 rounded-full hover:bg-blue-500 transition-colors"
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {isPlaying ? <Pause size={24} /> : <Play size={24} />}
              </button>
              <button className="text-blue-300 hover:text-white transition-colors">
                <SkipForward size={24} />
              </button>
              <button className="text-blue-300 hover:text-white transition-colors">
                <Repeat size={20} />
              </button>
            </div>

            {/* Volume control */}
            <div className="flex items-center gap-4">
              <Volume2 size={20} className="text-blue-300" />
              <div className="flex-1 h-1 bg-blue-900 rounded-full">
                <div className="h-full w-3/4 bg-blue-400 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Mini player component
  const MiniPlayer = () => (
    <div className="bg-blue-950 rounded-lg shadow-lg p-3 flex items-center gap-3 max-w-md transition-all duration-300">
      <button 
        onClick={() => setIsMinimized(false)}
        className="text-blue-300 hover:text-white p-1"
      >
        <Maximize2 size={16} />
      </button>
      
      <img 
        src={currentSong.coverUrl} 
        alt="Mini Cover" 
        className="w-12 h-12 rounded"
      />
      
      <div className="flex-1 min-w-0">
        <p className="font-medium text-white truncate">{currentSong.title}</p>
        <p className="text-sm text-blue-300 truncate">{currentSong.artist}</p>
      </div>
      
      <div className="flex items-center gap-2">
        <button className="text-blue-300 hover:text-white transition-colors">
          <SkipBack size={18} />
        </button>
        <button 
          className="bg-blue-400 p-2 rounded-full hover:bg-blue-500 transition-colors"
          onClick={() => setIsPlaying(!isPlaying)}
        >
          {isPlaying ? <Pause size={16} /> : <Play size={16} />}
        </button>
        <button className="text-blue-300 hover:text-white transition-colors">
          <SkipForward size={18} />
        </button>
      </div>
    </div>
  );

  return (
    <div className="fixed bottom-4 right-4 z-50 transition-all duration-300 ease-in-out">
      {isMinimized ? <MiniPlayer /> : <FullPlayer />}
    </div>
  );
}

export default MusicPlayer;