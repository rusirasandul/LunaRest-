import React from 'react';
import { Play, Pause, SkipBack, SkipForward, X } from 'lucide-react';
import { useMusicPlayer } from '../pages/MusicPlayerContext'; // Ensure this path is correct


function MiniPlayer() {
  const {
    isPlaying,
    setIsPlaying,
    currentSong,
    handleNext,
    handlePrev,
    playbackProgress,
    handleStop,
    isMiniPlayerVisible,
  } = useMusicPlayer();

  if (!currentSong || !isMiniPlayerVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#1a2b4c] border-t border-blue-900 p-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between relative">
        <button
          onClick={handleStop}
          className="absolute -top-3 right-0 text-blue-300 hover:text-white bg-[#1a2b4c] rounded-full p-1"
        >
          <X size={16} />
        </button>
        
        <div className="flex items-center gap-4">
          <img src={currentSong.coverUrl} alt="Mini Cover" className="w-12 h-12 rounded" />
          <div>
            <p className="font-medium text-white">{currentSong.title}</p>
            <p className="text-sm text-blue-300">{currentSong.artist}</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="text-blue-300 hover:text-white" onClick={handlePrev}>
            <SkipBack size={20} />
          </button>
          <button
            className="bg-blue-400 p-2 rounded-full hover:bg-blue-500"
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
          </button>
          <button className="text-blue-300 hover:text-white" onClick={handleNext}>
            <SkipForward size={20} />
          </button>
        </div>

        <div className="w-1/3">
          <div className="relative h-1 bg-blue-900 rounded-full">
            <div
              className="absolute h-full bg-blue-400 rounded-full"
              style={{ width: `${(playbackProgress / currentSong.duration) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MiniPlayer;
