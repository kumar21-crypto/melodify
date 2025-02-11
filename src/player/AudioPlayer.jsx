import React, { useContext, useRef, useEffect, useState } from 'react';
import { AudioContext } from './AudioContext';
import { IconButton } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';

import PlayCircleRoundedIcon from '@mui/icons-material/PlayCircleRounded';
import PauseCircleRoundedIcon from '@mui/icons-material/PauseCircleRounded';
import SkipNextRoundedIcon from '@mui/icons-material/SkipNextRounded';
import SkipPreviousRoundedIcon from '@mui/icons-material/SkipPreviousRounded';
import ShuffleRoundedIcon from '@mui/icons-material/ShuffleRounded';
import RepeatRoundedIcon from '@mui/icons-material/RepeatRounded';
import VolumeUpRoundedIcon from '@mui/icons-material/VolumeUpRounded';
import VolumeDownRoundedIcon from '@mui/icons-material/VolumeDownRounded';


const AudioPlayer = () => {

    const { currentSong, setCurrentSong,
        isPlaying, setIsPlaying,
        playlist, setPlaylist,
        isAudioPlayerVisible, audioRef } = useContext(AudioContext);

    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(1);

    useEffect(() => {

        if (audioRef.current) {
            const updateCurrentTime = () => {
                setCurrentTime(audioRef.current.currentTime);
            };

            const updateDuration = () => {
                setDuration(audioRef.current.duration);
            };

            const handleSongEnd = () => {
                handleNext();
            };

            if (audioRef.current) {
                audioRef.current.addEventListener('timeupdate', updateCurrentTime);
                audioRef.current.addEventListener('loadedmetadata', updateDuration);
                audioRef.current.addEventListener('ended', handleSongEnd);
            }

            return () => {
                if (audioRef.current) {
                    audioRef.current.removeEventListener('timeupdate', updateCurrentTime);
                    audioRef.current.removeEventListener('loadedmetadata', updateDuration);
                    audioRef.current.removeEventListener('ended', handleSongEnd);
                }

            };
        }


    }, [audioRef]);

    const handlePlayPause = () => {
        setIsPlaying(!isPlaying);
    };

    const handleNext = () => {
        const currentIndex = playlist.findIndex(song => song.id === currentSong.id);
        const nextIndex = (currentIndex + 1) % playlist.length;
        setCurrentSong(playlist[nextIndex]);
    };

    const handlePrevious = () => {
        const currentIndex = playlist.findIndex(song => song.id === currentSong.id);
        const previousIndex = (currentIndex - 1 + playlist.length) % playlist.length;
        setCurrentSong(playlist[previousIndex]);
    };

    const handleSeek = (event) => {
        const seekTime = event.target.value;
        audioRef.current.currentTime = seekTime;
        setCurrentTime(seekTime);
    };

    // for calculate time
    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    const handleVolumeChange = (event) => {
        const newVolume = event.target.value;
        audioRef.current.volume = newVolume;
        setVolume(newVolume);
    };

    if (!currentSong) return null;


    return (
        isAudioPlayerVisible && (
            <div className="fixed bottom-1  w-full h-20   p-4 flex justify-center">
                <div className='bg-gradient-to-r from-slate-900 to-slate-700 bg-opacity-90 text-white w-3/4 flex justify-between items-center rounded-2xl'>

                    {/* player image */}
                    <div className='w-1/4 h-full flex justify-between items-center'>
                        <div style={{ margin: 5 }} className='flex justify-self-center w-1/4'><img src={currentSong.image[1].url} alt="song image" className="w-16 h-16 rounded-lg" /></div>
                        <div style={{ margin: 5 }} className='flex flex-col justify-self-center w-3/4'>
                            <div className='font-bold'>{currentSong.name}</div>
                            <div className='flex flex-col'>
                                {
                                    currentSong?.artists?.all?.map((artist, index) => {
                                        if (index <= 1) {
                                            return <div key={index} style={{ marginLeft: 2 }} className="text-sm font-semibold text-white">{artist.name}</div>
                                        }
                                    })
                                }
                            </div>
                        </div>
                    </div>

                    {/* music controls */}
                    <div className='w-2/4 h-full flex flex-col justify-between items-center'>
                        <div style={{ padding: 5, marginTop: 5 }} className='flex h-10  justify-between items-center w-3/5'>
                            <ShuffleRoundedIcon sx={{ fontSize: 27 }} />

                            <IconButton onClick={handlePrevious} color="inherit">
                                <SkipPreviousRoundedIcon sx={{ fontSize: 30 }} />
                            </IconButton>

                            <IconButton onClick={handlePlayPause} color="inherit">
                                {
                                    isPlaying ? <PauseCircleRoundedIcon sx={{ fontSize: 35 }} /> :
                                        <PlayCircleRoundedIcon sx={{ fontSize: 35 }} />
                                }
                            </IconButton>

                            <IconButton onClick={handleNext} color="inherit">
                                <SkipNextIcon sx={{ fontSize: 30 }} />
                            </IconButton>

                            <RepeatRoundedIcon sx={{ fontSize: 27 }} />
                        </div>

                        <div className='w-8/9 flex'>
                            <span style={{ marginRight: 5 }}>{formatTime(currentTime)}</span>
                            <input
                                type="range"
                                min="0"
                                max={duration}
                                value={currentTime}
                                onChange={handleSeek}
                                className='w-full'
                            />
                            <span style={{ marginLeft: 5 }}>{formatTime(duration)}</span>

                        </div>
                    </div>


                    {/* volume control */}
                    <div className="w-1/4 h-full flex justify-center items-center">
                        <VolumeDownRoundedIcon />
                        <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.01"
                            value={volume}
                            onChange={handleVolumeChange}
                            className="mx-2"
                        />
                        <VolumeUpRoundedIcon />

                    </div>


                </div>
                <audio ref={audioRef} src={currentSong?.downloadUrl[3]?.url} />
            </div>
        )
    );
};

export default AudioPlayer;