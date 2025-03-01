import React, { useEffect, useState } from 'react';
import { db, auth } from '../firebase/firebase';
import { collection, doc, getDocs, getDoc } from 'firebase/firestore';
import { HiOutlineChevronRight } from "react-icons/hi";
import { HiOutlineChevronDown } from "react-icons/hi";

const Profile = () => {
  // const { currentUser } = useAuth();

  const [userData, setuserData] = useState([]);
  const [savedSongs, setSavedSongs] = useState([]);
  const [likedSongs, setLikedSongs] = useState([]);
  const [savedPlaylists, setSavedPlaylists] = useState([]);
  const [isLikedSongsExpanded, setIsLikedSongsExpanded] = useState(false);
  const [isPlaylistExpanded, setIsPlaylistExpanded] = useState(false);

  const fetchUserData = async (user) => {

    try {
      const docsRef = doc(db, 'Users', user.uid);
      const docSnap = await getDoc(docsRef);
      if (docSnap.exists()) {
        console.log(docSnap.data());
        setuserData(docSnap.data());
        
      } else {
        console.log("data does not exist")
      }

    } catch (error) {
      console.log(error);
    }
}

useEffect(() => {
  auth.onAuthStateChanged(async (user) => {
    if(user){
      await fetchUserData(user);
      await fetchLikedSongs(user);
    }
  })
}, []);

const fetchLikedSongs = async (user) => {
    if (user) {
      const likedSongsRef = collection(db, 'Users', user.uid, 'LikedSongs');
      const likedSongsSnapshot = await getDocs(likedSongsRef);
      const likedSongsList = likedSongsSnapshot.docs.map(doc => doc.data());
      setLikedSongs(likedSongsList);
      console.log(likedSongs);
    }
  };

  const toggleLikedSongs = () => {
    setIsLikedSongsExpanded(!isLikedSongsExpanded);
  };

  const togglePlaylist = () => {
    setIsPlaylistExpanded(!isPlaylistExpanded);
  }

return (
  <div className="p-4 h-auto  flex flex-col  text-white">
    <h1 className="text-3xl font-bold mb-6">Profile</h1>
    <div className="w-full max-w-2xl">
      <h2 className="text-2xl font-semibold mb-4">welcome {userData?.Name}</h2>
    </div>
    <div className="w-50 flex flex-col mt-6">
      <div className='flex items-center justify-between'>
      <h2 className="text-2xl font-semibold mb-4">Liked Songs</h2>
      {
        isLikedSongsExpanded 
        ? <HiOutlineChevronDown className='cursor-pointer' color='white' onClick={()=>{toggleLikedSongs()}} /> 
        : <HiOutlineChevronRight className='cursor-pointer' color='white' onClick={()=>{toggleLikedSongs()}} />
      }
      </div>
      { isLikedSongsExpanded && (
      <ul>
          {likedSongs.map((song,index )=> (
            <li key={index} className="mb-2">
              {song.name}
            </li>
          ))}
        </ul>
      )
}
    </div>
    <div className="w-50 max-w-2xl mt-6">
    <div className='flex items-center justify-between'>
      <h2 className="text-2xl font-semibold mb-4">Saved Playlists</h2>
      {
        isPlaylistExpanded 
        ? <HiOutlineChevronDown className='cursor-pointer' color='white' onClick={()=>{togglePlaylist()}} /> 
        : <HiOutlineChevronRight className='cursor-pointer' color='white' onClick={()=>{togglePlaylist()}} />
      }
      {/* <ul>
          {savedPlaylists.map(playlist => (
            <li key={playlist.id} className="mb-2">
              {playlist.name}
            </li>
          ))}
        </ul> */}
        </div>
    </div>
  </div>
);
};

export default Profile;