import React from 'react';
import { Play, Pause, SkipBack, SkipForward, Repeat, Heart } from 'lucide-react';
import { useMusicPlayer } from './MusicPlayerContext';

function Art3() {
  const {
    isPlaying,
    setIsPlaying,
    currentSong,
    handleNext,
    handlePrev,
    playbackProgress,
  } = useMusicPlayer();

  if (!currentSong) return <p>Loading playlist...</p>;

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-[#0a1128] text-white flex items-center justify-center p-8">
      <div className="w-full max-w-4xl bg-[#1a2b4c] rounded-lg shadow-2xl p-8">
        {/* Main content */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Album art */}
          <div className="w-full md:w-1/3">
            <img
              src={currentSong.coverUrl}
              alt="Album Cover"
              className="w-full aspect-square rounded-lg shadow-xl"
            />
          </div>

          {/* Player controls */}
          <div className="w-full md:w-2/3 flex flex-col justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">{currentSong.title}</h1>
              <p className="text-lg text-blue-300 mb-8">{currentSong.artist}</p>
            </div>

            {/* Progress bar */}
            <div className="mb-6">
              <div className="relative h-1 bg-blue-900 rounded-full">
                <div
                  className="absolute h-full bg-blue-400 rounded-full"
                  style={{ width: `${(playbackProgress / currentSong.duration) * 100}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-blue-300 mt-2">
                <span>{formatTime(playbackProgress)}</span>
                <span>{formatTime(currentSong.duration)}</span>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-8">
              <button className="text-blue-300 hover:text-white" onClick={handlePrev}>
                <SkipBack size={24} />
              </button>
              <button
                className="bg-blue-400 p-4 rounded-full hover:bg-blue-500"
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {isPlaying ? <Pause size={24} /> : <Play size={24} />}
              </button>
              <button className="text-blue-300 hover:text-white" onClick={handleNext}>
                <SkipForward size={24} />
              </button>
              <button className="text-blue-300 hover:text-white">
                <Repeat size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Currently playing bar */}
        <div className="mt-8 pt-6 border-t border-blue-900 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src={currentSong.coverUrl} alt="Mini Cover" className="w-12 h-12 rounded" />
            <div>
              <p className="font-medium">{currentSong.title}</p>
              <p className="text-sm text-blue-300">{currentSong.artist}</p>
            </div>
          </div>
          <button className="text-blue-300 hover:text-red-400">
            <Heart size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Art3;