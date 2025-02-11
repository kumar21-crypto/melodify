import React, { useEffect, useState, useRef, useContext } from 'react';
import { useLocation } from 'react-router';
import { fetchAlbumDetailData } from '../components/Api';
import { AudioContext } from '../player/AudioContext';

import { GoHeart } from "react-icons/go";
import { PiShareFat } from "react-icons/pi";
import { RxDownload } from "react-icons/rx";
import { FaPlay, FaPause } from "react-icons/fa";
import { IoIosRadio } from "react-icons/io";
import { MdOutlinePlaylistAdd } from "react-icons/md";



function AlbumDetail() {

  const location = useLocation();
  const { data: album } = location.state || {};
  const [albumDetails, setAlbumDetails] = useState(null);
  // const [audioPlay, setAudioPlay] = useState(false);
  const { currentSong, isPlaying, setCurrentSong, setIsPlaying, setPlaylist,isAudioPlayerVisible, setIsAudioPlayerVisible } = useContext(AudioContext);

  useEffect(() => {

    if (album?.perma_url) {
      fetchAlbumDetailData(album.perma_url)
        .then((data) => {
          setAlbumDetails(data);
          console.log(data);
          setPlaylist(data.data.songs);
        })
        .catch((error) => {
          console.error('Error fetching album details:', error);
        });
    }

    // Show the audio player when on the AlbumDetail page
    setIsAudioPlayerVisible(true);

    // Hide the audio player when navigating away from the AlbumDetail page
    return () => {
        setIsAudioPlayerVisible(false);
    };


  }, [album, setPlaylist, setIsAudioPlayerVisible, isPlaying]);

  const handleSongImageClick = (song) => {

    if (currentSong?.id === song.id) {
      setIsPlaying((prev) => !prev); // Toggle play/pause if the same song is clicked
    } else {
      setCurrentSong(song);
      setIsPlaying(true);
      setIsAudioPlayerVisible(true);
    }

  };

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

            <div className='flex justify-around  w-1/2'>
              <PiShareFat size={22} />
              <IoIosRadio size={22} />
              <MdOutlinePlaylistAdd size={22} />
            </div>

          </div>
        </div>


        {/* song works */}
        <div className='w-full h-auto'>
          <h1 style={{ marginLeft: 5 }} className='text-white font-bold'>Playlist songs</h1>
          {
            albumDetails?.data?.songs?.map((song, index) => (

              <div style={{ marginTop: 10 }} className='flex w-full items-center h-25 bg-[#141518] rounded-xl' key={index}>

                {/* song image */}
                <div style={{ padding: 4 }} className='w-1/7 h-22 flex justify-center items-center'>
                  <img src={song?.image[1]?.url} alt="image"
                    className='w-22 h-22 rounded-xl cursor-pointer'
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
                    {
                      formatTime(song.duration)
                    }
                  </div>
                </div>


                {/* song icons */}
                <div className='w-2/7 h-full flex justify-around items-center'>
                  <GoHeart color='white' size={22} />
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
        <div style={{ marginTop: 10, padding: 5 }} className='grid grid-cols-3 gap-2 w-auto h-auto justify-between items-start'>
          {
            albumDetails?.data?.artists?.all?.map((artist, index) => (

              <div style={{}} className='flex flex-col  justify-center items-center w-50 h-50' key={index}>
                <img src={artist.image[1].url} alt="image" className='w-35 h-35 rounded-full' />
                <h2 style={{
                  fontSize: 18, maxLines: 1, maxWidth: 180,
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

    // <div className="p-4 h-auto w-full text-white">
    //   <div className="p-4 h-auto w-full">
    //     <div className='flex'>
    //       {/* left work */}
    //       <div className='flex w-3/5'>

    //         <div className='flex flex-col justify-center items-center w-50  rounded-lg   shadow-md'>
    //           <div> <h2 style={{
    //             fontSize: 15, maxLines: 1, maxWidth: 130,
    //             textOverflow: 'ellipsis',
    //             whiteSpace: 'nowrap',
    //             overflow: 'hidden',
    //             marginTop: 5,
    //             marginBottom: 5,
    //             color: 'white'
    //           }} className="text-xl font-bold">{album.title}</h2></div>
    //           <div><img src={album.image} alt="album image" className='w-40 h-40 rounded-2xl' /></div>
    //         </div>

    //         {/* middle work */}
    //         <div style={{ padding: 5, marginTop: 10, marginLeft: 10 }} className='flex flex-col w-100  h-auto'>

    //           <div>{albumDetails?.data?.description || 'loading description ....'}</div>
    //           <div>{albumDetails?.data?.songCount} songs</div>
    //           <div>{albumDetails?.data?.year}</div>

    //         </div>
    //       </div>


    //       {/* rigth work */}
    //       <div className='w-2/5 h-auto'>

    //         {/* artist work  */}

    //         {albumDetails?.data?.artists?.all?.map((artist, index) => (

    //           <div key={index} style={{ margin: 5 }} className=" items-center flex">

    //             <div><img src={artist?.image[1]?.url} alt="artsit" className='w-16 h-16 rounded-2xl' /></div>
    //             <div style={{ marginLeft: '20px' }} className='font-sans text-sm font-bold' >{artist?.name}</div>

    //           </div>
    //         ))}



    //       </div>

    //     </div>
    //   </div>

    //   {/* song work */}

    //   <div className='w-full text-white'>
    //     <h1>Songs</h1>

    //     {albumDetails?.data?.songs?.map((song, index) => (

    //       <div key={index} style={{ marginTop:10 }} className='bg-[#1d212a] h-20 flex  w-4/5 '>
    //         <div className='flex w-3/5'><img src={song?.image[1]?.url} alt="song image" className='w-16 h-16 rounded-2xl'
    //           onClick={() =>{
    //              handleSongImageClick(song);
    //              console.log(song);
    //           }

    //             }

    //             />

    //             <div style={{marginLeft:10}} className="ml-4">
    //               <div className="text-lg font-bold">{song?.name}</div>
    //               <div className="text-sm text-gray-600">{song?.year} {song?.type}</div>

    //             </div>
    //         </div>


    //         {/* songs icon work */}
    //         <div style={{paddingLeft:5, paddingRight:5}} className=' w-1/5 h-auto flex justify-between items-center '>
    //         <div><FavoriteBorderRoundedIcon/></div>
    //         <div><IosShareRoundedIcon /></div>
    //         <div><PlaylistAddRoundedIcon/></div>
    //         <div><MoreVertRoundedIcon /></div>
    //         </div>
    //       </div>


    //     ))}


    //   </div>
    // </div>


  );
}

export default AlbumDetail;