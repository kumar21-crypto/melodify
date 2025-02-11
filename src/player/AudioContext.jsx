import React, { createContext, useState, useRef, useEffect } from 'react';
export const AudioContext = createContext();

export const AudioProvider = ({ children }) => {
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playlist, setPlaylist] = useState([]);
  const [isAudioPlayerVisible, setIsAudioPlayerVisible] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);


  return (
    <AudioContext.Provider 
    value={{ 
      currentSong, 
      setCurrentSong, 
      isPlaying, 
      setIsPlaying, 
      playlist, 
      setPlaylist,
      isAudioPlayerVisible,
      setIsAudioPlayerVisible,
      audioRef,
      }}>
      {children}
      <audio ref={audioRef} />
    </AudioContext.Provider>
  );
};