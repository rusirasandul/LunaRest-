import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Play, Pause, SkipBack, SkipForward, Volume2, Shuffle, Repeat, Heart } from 'lucide-react';

function Art3() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(null);
  const [playlist, setPlaylist] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [accessToken, setAccessToken] = useState('');
  const [playbackProgress, setPlaybackProgress] = useState(0);

  // Fetch access token on mount
  useEffect(() => {
    const fetchToken = async () => {
      try {
        const response = await axios.post(
          'https://accounts.spotify.com/api/token',
          new URLSearchParams({
            grant_type: 'client_credentials',
            client_id: 'eb55132fff314b0ea6d834d68275e7e4',
            client_secret: '9493d5abe7074482a5186bad79bdc96c',
          }),
          { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
        );
        setAccessToken(response.data.access_token);
      } catch (error) {
        console.error('Error fetching access token:', error);
      }
    };

    fetchToken();
  }, []);

  // Fetch playlist tracks
  useEffect(() => {
    const fetchPlaylist = async () => {
      if (!accessToken) return;

      try {
        const response = await axios.get(
          'https://api.spotify.com/v1/playlists/5FI8rn340FgsOB7B8Ic0DZ/tracks',
          { headers: { Authorization: `Bearer ${accessToken}` } }
        );

        // Make sure the playlist is not empty
        if (response.data.items.length > 0) {
          setPlaylist(response.data.items);
          const track = response.data.items[0].track;
          setCurrentSong({
            title: track.name,
            artist: track.artists[0].name,
            duration: track.duration_ms / 1000,
            coverUrl: track.album.images[0].url,
          });
        } else {
          console.log('No tracks found in the playlist');
        }
      } catch (error) {
        console.error('Error fetching playlist:', error);
      }
    };

    fetchPlaylist();
  }, [accessToken]);

  // Update playback progress if playing
  useEffect(() => {
    if (isPlaying && currentSong) {
      const interval = setInterval(() => {
        setPlaybackProgress((prev) => {
          if (prev < currentSong.duration) {
            return prev + 1;
          }
          clearInterval(interval);
          return currentSong.duration;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isPlaying, currentSong]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleNext = () => {
    if (currentIndex < playlist.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      const track = playlist[nextIndex].track;
      setCurrentSong({
        title: track.name,
        artist: track.artists[0].name,
        duration: track.duration_ms / 1000,
        coverUrl: track.album.images[0].url,
      });
      setPlaybackProgress(0); // Reset progress for new track
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      setCurrentIndex(prevIndex);
      const track = playlist[prevIndex].track;
      setCurrentSong({
        title: track.name,
        artist: track.artists[0].name,
        duration: track.duration_ms / 1000,
        coverUrl: track.album.images[0].url,
      });
      setPlaybackProgress(0); // Reset progress for new track
    }
  };

  if (!currentSong) return <p>Loading playlist...</p>;

  return (
    <div className="min-h-screen bg-[#0a1128] text-white flex items-center justify-center p-8">
      <div className="w-full max-w-4xl bg-[#1a2b4c] rounded-lg shadow-2xl p-8">
        {/* Main content */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Album art */}
          <div className="w-full md:w-1/3">
            <img src={currentSong.coverUrl} alt="Album Cover" className="w-full aspect-square rounded-lg shadow-xl" />
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
