import React, { useContext } from 'react';
import { SearchContext } from '../components/SearchContext';
import { AudioContext } from '../player/AudioContext';

const SearchResults = () => {
  const { searchResults, searchSongResults } = useContext(SearchContext);
  const { setCurrentSong, setIsPlaying, setPlaylist } = useContext(AudioContext);

  const handleSongImageClick = (song) => {  
    setCurrentSong(song);
    setIsPlaying(true);
    setPlaylist(searchSongResults.results);
  };

  return (
    <div className="p-10 w-full h-auto text-black flex flex-col justify-between items-center">
         <h1 className="text-2xl font-bold mb-4">Songs Results</h1>
         <div className="grid grid-cols-1 md:grid-cols-2  w-full lg:grid-cols-2 gap-4">
         {
        
            searchSongResults?.results?.map((song, index) => (
                <div key={index} style={{margin:5}} className='bg-gray-800 rounded-lg text-white w-9/10 h-20 flex justify-start'>
                    <div style={{padding:5}} className='w-20 h-20'>
                        <img 
                        src={song.image[1].url} 
                        alt="" 
                        className='w-full h-full rounded-md cursor-pointer' 
                        onClick={() =>{
                            handleSongImageClick(song);
                            console.log(song);
                        }}
                        /></div>
                    <h1>{song.name}</h1>
                    {/* <h1>{song.more_info.album}</h1>
                    <h1>{song.more_info.artist}</h1> */}
                </div>
            ))
         }
         </div>

      <h1 className="text-2xl font-bold mb-4">Search Results</h1>

      {searchResults.songs?.results?.length > 0 && (
        <div className="w-full mb-4">
          <h2 style={{marginTop:10}} className="text-xl font-semibold mb-2">Songs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {searchResults.songs.results.map((song, index) => (
              <div key={index} className="p-2 bg-gray-800 text-white rounded-lg">
                <img src={song.image[2].url} alt={song.title} className="w-full h-80 object-cover rounded-lg mb-2" />
                <h3 className="text-lg font-bold">{song.title}</h3>
                <p className="text-sm">{song.primaryArtists}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {searchResults.artists?.results?.length > 0 && (
        <div className="w-full mb-4">
          <h2 style={{marginTop:10}} className="text-xl font-semibold mb-2">Artists</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {searchResults.artists.results.map((artist, index) => (
              <div key={index} className="p-2 bg-gray-800 text-white rounded-lg">
                <img src={artist.image[2].url} alt={artist.title} className="w-full h-80 object-cover rounded-lg mb-2" />
                <h3 className="text-lg font-bold">{artist.title}</h3>
              </div>
            ))}
          </div>
        </div>
      )}

      {searchResults.albums?.results?.length > 0 && (
        <div className="w-full mb-4">
          <h2 style={{marginTop:10}} className="text-xl font-semibold mb-2">Albums</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {searchResults.albums.results.map((album, index) => (
              <div key={index} className="p-2 bg-gray-800 text-white rounded-lg">
                <img src={album.image[2].url} alt={album.title} className="w-full h-80 object-cover rounded-lg mb-2" />
                <h3 className="text-lg font-bold">{album.title}</h3>
                <p className="text-sm">{album.artist}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {searchResults.playlists?.results?.length > 0 && (
        <div className="w-full mb-4">
          <h2 style={{marginTop:10}} className="text-xl font-semibold mb-2">Playlists</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {searchResults.playlists.results.map((playlist, index) => (
              <div key={index} className="p-2 bg-gray-800 text-white rounded-lg">
                <img src={playlist.image[2].url} alt={playlist.title} className="w-full h-80 object-cover rounded-lg mb-2" />
                <h3 className="text-lg font-bold">{playlist.title}</h3>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchResults;