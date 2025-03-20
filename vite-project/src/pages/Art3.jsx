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
    <>
      <section className="w-full py-16 text-white bg-herobg2">
        <div className="container px-8 mx-auto">
          <div className="grid items-center gap-8 md:grid-cols-2">
            {/* Left Text Content */}
            <div className="max-w-2xl">
              <h2 className="text-xl font-semibold text-purple-300">
                Relax and Sleep Soundly with
              </h2>
              <h3 className="mt-2 text-4xl font-bold text-white">
                LunaRest's Sleep Sounds
              </h3>
              <p className="mt-4 leading-relaxed text-gray-300">
                LunaRest's 100+ soothing sleep sounds are designed to promote relaxation and 
                improve your sleep quality. From gentle rain to ocean waves and white noise, 
                our soundscapes are carefully crafted to mask disruptive noises and create 
                a peaceful sleep environment.
              </p>
              <p className="mt-4 leading-relaxed text-gray-300">
                Download LunaRest today and start enjoying a better night's sleep.
              </p>
            </div>

            {/* Right side - Music Player */}
            <div className="relative flex justify-center">
              <div className="w-full max-w-md">
                {/* Music Player */}
                <div className="bg-gradient-to-br from-[#2d1f54] to-[#1a1033] rounded-2xl shadow-2xl p-6 border border-purple-900/30 backdrop-blur-sm">
                  {/* Main content */}
                  <div className="flex flex-col gap-6">
                    {/* Album art with glow effect */}
                    <div className="w-full relative">
                      <div className="absolute inset-0 bg-purple-500/20 rounded-xl blur-xl transform -translate-y-4"></div>
                      <img
                        src={currentSong.coverUrl}
                        alt="Album Cover"
                        className="w-full aspect-square rounded-xl shadow-xl relative z-10 object-cover"
                      />
                    </div>

                    {/* Player controls */}
                    <div className="w-full flex flex-col justify-between">
                      <div>
                        <h1 className="text-2xl font-bold mb-1 text-white">{currentSong.title}</h1>
                        <p className="text-sm text-purple-300 mb-4">{currentSong.artist}</p>
                      </div>

                      {/* Progress bar */}
                      <div className="mb-6">
                        <div className="relative h-1.5 bg-purple-900/50 rounded-full">
                          <div
                            className="absolute h-full bg-gradient-to-r from-purple-500 to-purple-300 rounded-full"
                            style={{ width: `${(playbackProgress / currentSong.duration) * 100}%` }}
                          ></div>
                          <div 
                            className="absolute h-3 w-3 bg-white rounded-full shadow-md top-1/2 transform -translate-y-1/2"
                            style={{ left: `calc(${(playbackProgress / currentSong.duration) * 100}% - 6px)` }}
                          ></div>
                        </div>
                        <div className="flex justify-between text-xs text-purple-300 mt-2 font-medium">
                          <span>{formatTime(playbackProgress)}</span>
                          <span>{formatTime(currentSong.duration)}</span>
                        </div>
                      </div>

                      {/* Controls */}
                      <div className="flex items-center justify-between gap-2 px-4">
                        <button className="text-purple-300 hover:text-white transition-colors" onClick={handlePrev}>
                          <SkipBack size={24} />
                        </button>
                        <button
                          className="bg-gradient-to-r from-purple-600 to-purple-400 p-4 rounded-full hover:from-purple-500 hover:to-purple-300 transition-all shadow-lg shadow-purple-900/30 transform hover:scale-105"
                          onClick={() => setIsPlaying(!isPlaying)}
                        >
                          {isPlaying ? <Pause size={24} className="text-white" /> : <Play size={24} className="text-white ml-1" />}
                        </button>
                        <button className="text-purple-300 hover:text-white transition-colors" onClick={handleNext}>
                          <SkipForward size={24} />
                        </button>
                        <button className="text-purple-400 hover:text-white transition-colors">
                          <Repeat size={20} />
                        </button>
                        <button className="text-purple-400 hover:text-pink-400 transition-colors">
                          <Heart size={20} />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Wave animation at bottom */}
                  <div className="mt-6 flex items-center justify-center gap-1 h-4 overflow-hidden">
                    {Array.from({ length: 12 }).map((_, i) => (
                      <div 
                        key={i}
                        className={`w-1 bg-purple-400 rounded-full ${isPlaying ? 'animate-pulse' : ''}`}
                        style={{ 
                          height: `${Math.floor(Math.random() * 16) + 4}px`,
                          animationDelay: `${i * 0.1}s`,
                          opacity: isPlaying ? 0.7 : 0.3
                        }}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Art3;