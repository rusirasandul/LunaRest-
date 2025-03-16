import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const MusicPlayerContext = createContext(undefined);

export function MusicPlayerProvider({ children }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(null);
  const [playlist, setPlaylist] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [accessToken, setAccessToken] = useState('');
  const [playbackProgress, setPlaybackProgress] = useState(0);
  const [isMiniPlayerVisible, setIsMiniPlayerVisible] = useState(false); // Start with mini player hidden

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

  // Show mini player when music starts playing
  useEffect(() => {
    if (isPlaying) {
      setIsMiniPlayerVisible(true);
    }
  }, [isPlaying]);

  // Fetch playlist tracks
  useEffect(() => {
    const fetchPlaylist = async () => {
      if (!accessToken) return;

      try {
        const response = await axios.get(
          'https://api.spotify.com/v1/playlists/5FI8rn340FgsOB7B8Ic0DZ/tracks',
          { headers: { Authorization: `Bearer ${accessToken}` } }
        );

        if (response.data.items.length > 0) {
          setPlaylist(response.data.items);
          const track = response.data.items[0].track;
          setCurrentSong({
            title: track.name,
            artist: track.artists[0].name,
            duration: track.duration_ms / 1000,
            coverUrl: track.album.images[0].url,
          });
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
      setPlaybackProgress(0);
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
      setPlaybackProgress(0);
    }
  };

  // Handle stopping music
  const handleStop = () => {
    setIsPlaying(false);
    setIsMiniPlayerVisible(false);
  };

  return (
    <MusicPlayerContext.Provider
      value={{
        isPlaying,
        setIsPlaying,
        currentSong,
        setCurrentSong,
        playlist,
        currentIndex,
        playbackProgress,
        handleNext,
        handlePrev,
        handleStop,
        isMiniPlayerVisible,
        setIsMiniPlayerVisible,
      }}
    >
      {children}
    </MusicPlayerContext.Provider>
  );
}

export function useMusicPlayer() {
  const context = useContext(MusicPlayerContext);
  if (context === undefined) {
    throw new Error('useMusicPlayer must be used within a MusicPlayerProvider');
  }
  return context;
}