import React, { useEffect, useState, useRef, useContext } from 'react';
import { useLocation } from 'react-router';
import { fetchAlbumDetailData } from '../components/Api';
import { AudioContext } from '../player/AudioContext';

import { GoHeart, GoHeartFill } from "react-icons/go";
import { PiShareFat } from "react-icons/pi";
import { RxDownload } from "react-icons/rx";
import { FaPlay, FaPause } from "react-icons/fa";
import { IoIosRadio } from "react-icons/io";
import { MdOutlinePlaylistAdd, MdOutlinePlaylistAddCheck } from "react-icons/md";

import { UserContext, useUser } from '../firebase/UserContext';
import { doc, getDoc, getDocs, setDoc, collection } from 'firebase/firestore';
import { db, auth } from '../firebase/firebase';
import { toast } from 'react-toastify';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { Skeleton } from '@mui/material';



function AlbumDetail() {

  const location = useLocation();
  const { data: album } = location.state || {};
  const [albumDetails, setAlbumDetails] = useState(null);
  const { currentSong, isPlaying, setCurrentSong, setIsPlaying, setPlaylist, isAudioPlayerVisible, setIsAudioPlayerVisible } = useContext(AudioContext);
  const { userData } = useUser();
  const [likedSongs, setLikedSongs] = useState([]);
  const [playlistAdd, setplaylistAdd] = useState([]);
  const [animatingSongId, setAnimatingSongId] = useState(null);
  const [albumLoading, setalbumLoading] = useState(false);


  useEffect(() => {

    if (album?.perma_url) {
      setalbumLoading(true);
      try {
        fetchAlbumDetailData(album.perma_url)
        .then((data) => {
          setAlbumDetails(data);
          fetchLikedSongs();
          fetchSavedPlaylist();
          console.log(data);
          setPlaylist(data.data.songs);
        })
      } catch (error) {
        console.log("error")
      } 
    finally {
      setalbumLoading(false);
    }
      
}
  }, []);

const handleSongImageClick = (song) => {

  if (currentSong?.id === song.id) {
    setIsPlaying((prev) => !prev); // Toggle play/pause if the same song is clicked
  } else {
    setCurrentSong(song);
    setIsPlaying(true);
    setIsAudioPlayerVisible(true);
  }

};

const handleLikedSong = async (song) => {
  console.log("currentuser : ", auth.currentUser?.uid);
  auth.onAuthStateChanged(async (user) => {
    if (!user) {
      console.log("user not logged in");
      return;
    }
    console.log(userData);
    const songRef = doc(db, 'Users', user.uid, 'LikedSongs', song.id);

    try {

      const songDoc = await getDoc(songRef);
      if (songDoc.exists()) {
        console.log("song already liked")
        toast.success("already liked");

      } else {
        await setDoc(songRef, song);
        setAnimatingSongId(song.id);
        setTimeout(() => {
          setLikedSongs([...likedSongs, song.id]);
          setAnimatingSongId(null);
          console.log('Song saved successfully');
          toast.success("song saved successfully");
        }, 500);
      }
    } catch (error) {
      console.error('Error saving song:', error);
      toast.error("error saving song");
    }
  })
}

const handlePlaylist = async (playlist) => {
  auth.onAuthStateChanged(async (user) => {
    if (!user) {
      console.log("user not logged in");
      return;
    }
    const playlistRef = doc(db, 'Users', user.uid, 'SavedPlaylist', playlist.id);

    try {
      const playlistDoc = await getDoc(playlistRef);
      if (playlistDoc.exists()) {
        toast.success("playlist already added");
      } else {
        await setDoc(playlistRef, playlist);
        setplaylistAdd([...playlistAdd, playlist.id]);
        console.log('playlist saved successfully');
        toast.success("playlist saved successfully");
      }

    } catch (error) {
      console.error("error saving playlist : ", error);
    }
  })
}

const fetchLikedSongs = async () => {
  const user = auth.currentUser;
  if (user) {
    const likedSongsRef = collection(db, 'Users', user.uid, 'LikedSongs');
    const likedSongsSnapshot = await getDocs(likedSongsRef);
    const likedSongsList = likedSongsSnapshot.docs.map(doc => doc.id);
    setLikedSongs(likedSongsList);
  }
};

const fetchSavedPlaylist = async () => {
  const user = auth.currentUser;
  if (user) {
    const playlistAddRef = collection(db, 'Users', user.uid, 'SavedPlaylist');
    const playlistAddSnapshot = await getDocs(playlistAddRef);
    const playlistAddList = playlistAddSnapshot.docs.map(doc => doc.id);
    setplaylistAdd(playlistAddList);
  }
}

const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

if (!album) {
  return <div className="p-4">No album data available.</div>;
}

return (
  <div className='w-full h-auto flex'>
    {/* left work */}
    <div style={{ margin: 5, padding: 5 }} className='w-3/5 h-auto bg-[#1d212a] rounded-2xl flex flex-col'>
      <div className='w-full h-100 flex justify-center items-center'>
        {/* album image */}
        <div style={{ margin: 5 }} className=' w-1/2 h-9/10 flex justify-center items-center'>
          <img src={album.image} alt="album image" className='h-70 w-70 rounded-2xl' />
        </div>

        {/* album description */}
        <div style={{ margin: 5 }} className=' text-white w-1/2 h-9/10 flex flex-col justify-center items-center'>
          <div style={{ margin: 5 }} className='h-70 w-full'>
            <div className=' text-3xl font-bold'>{album.title}</div>
            <div style={{ marginTop: 5 }} className=' text-lg'>{albumDetails?.data?.description || 'loading description ....'}</div>
            <div style={{ marginTop: 5 }} className=' text-lg'>{albumDetails?.data?.songCount || '10 songs'} songs</div>
            <div style={{ marginTop: 5 }} className=' text-lg'>{albumDetails?.data?.year}</div>
          </div>

          <div className='flex justify-start  w-full'>
            <div className='flex w-1/2 justify-between'>
              <PiShareFat size={22} />
              <IoIosRadio size={22} />
              {
                playlistAdd.includes(albumDetails?.data?.id)
                  ? <MdOutlinePlaylistAddCheck size={22} color='green' onClick={() => { handlePlaylist(albumDetails?.data) }} />
                  : <MdOutlinePlaylistAdd size={22} color='white' onClick={() => { handlePlaylist(albumDetails?.data) }} />
              }
            </div>
          </div>

        </div>
      </div>

      {/* song work */}


      <div className='w-full h-auto'>
        <h1 style={{ marginLeft: 5 }} className='text-white font-bold'>Playlist songs</h1>
        {
          albumDetails?.data?.songs?.map((song, index) => (

            <div style={{ marginTop: 10 }}
              className={`flex w-full items-center h-25 rounded-xl 
                ${currentSong?.id === song.id && isPlaying ? 'bg-blue-800' : 'bg-[#141518]'}`} key={index}>
              {/* song image */}
              <div style={{ padding: 4 }} className='w-1/7 h-22 flex justify-center items-center'>

                <div className='w-15 h-8 absolute'>
                  {
                    currentSong?.id === song.id && isPlaying ?
                      <DotLottieReact
                        src='https://lottie.host/b66f89ed-402c-4177-8ec4-ae4daab39fa0/rwFnrlLZUi.lottie'
                        loop autoplay
                      /> : ''
                  }
                </div>

                <img src={song?.image[1]?.url} alt="image"
                  className={`w-22 h-22 rounded-xl cursor-pointer ${currentSong?.id === song.id && isPlaying ? 'blur-[1/2px]' : ''}`}
                  onClick={() => {
                    handleSongImageClick(song);
                  }}
                />
              </div>

              {/* song details */}
              <div className='w-4/7 h-full flex '>
                <div className='w-1/2 h-full flex flex-col justify-center'>
                  <h2 style={{
                    fontSize: 17, maxLines: 1, maxWidth: 250,
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    marginTop: 5,
                  }} className="text-lg text-white font-semibold">{song.name}</h2>
                  <p className='text-white' style={{ marginTop: 5 }}>{song.year}</p>
                </div>
                <div className='w-1/2 h-full text-white flex justify-center items-center'>
                  {formatTime(song.duration)}
                </div>
              </div>


              {/* song icons */}
              <div className='w-2/7 h-full flex justify-around items-center'>
                {
                  likedSongs.includes(song.id) || animatingSongId === song.id
                    ? <GoHeartFill style={{ cursor: 'pointer' }} className={animatingSongId === song.id ? 'animate-heart' : ''} color='red' size={22} onClick={() => { handleLikedSong(song) }} />
                    : <GoHeart style={{ cursor: 'pointer' }} color='white' size={22} onClick={() => { handleLikedSong(song) }} />
                }

                <PiShareFat color='white' size={22} />
                <RxDownload color='white' size={22} />
                {currentSong?.id === song.id && isPlaying ? (
                  <FaPause color='white' className='cursor-pointer' size={22} onClick={() => handleSongImageClick(song)} />
                ) : (
                  <FaPlay color='white' className='cursor-pointer' size={22} onClick={() => handleSongImageClick(song)} />
                )}
              </div>

            </div>

          ))
        }
      </div>

    </div>


    {/* right work */}
    <div style={{ margin: 5, padding: 10 }} className='w-2/5 h-auto bg-[#1d212a] justify-center rounded-2xl'>
      <h1 style={{ marginLeft: 20 }} className='text-white font-bold'>Related artists</h1>
      <div style={{ marginTop: 5, padding: 5 }} className='grid grid-cols-3 gap-2 w-auto h-auto justify-between items-start'>
        {
          albumDetails?.data?.artists?.all?.map((artist, index) => (

            <div style={{}} className='flex flex-col  justify-center items-center w-50 h-50' key={index}>
              <img src={artist?.image[1]?.url} alt="image" className='w-27 h-27 rounded-full' />
              <h2 style={{
                fontSize: 14, maxLines: 1, maxWidth: 180,
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                marginTop: 10,
              }} className="text-lg text-white font-bold">{artist.name}</h2>
            </div>

          ))
        }
      </div>
    </div>
  </div>
);
}

export default AlbumDetail;