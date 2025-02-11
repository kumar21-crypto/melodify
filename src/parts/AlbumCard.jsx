import React from 'react';
import { useNavigate } from 'react-router';

function AlbumCard({ album }) {

  const navigate = useNavigate();

  return (
    <div style={{margin:5}} className="flex flex-col justify-center items-center rounded-lg p-4  shadow-md">

      <img src={album?.image} alt={album.title} className="w-32 h-32 rounded-3xl shadow-2xl cursor-pointer hover:-translate-y-1
          hover:scale-110 duration-500 hover:opacity-80 bg-opacity-80  backdrop-blur-sm"
          onClick={() => {
            navigate('/albumdetail', { state: { data: album } });
          }}
           />

      <h2 style={{fontSize: 15, maxLines: 1, maxWidth: 130,
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          marginTop: 5,
          }} className="text-xl font-bold">{album.title}</h2>
      <p className="text-gray-600">{album.artist}</p>
    </div>
  );
}

export default AlbumCard;