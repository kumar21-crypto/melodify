import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../components/ContextApi';
import AlbumCard from '../parts/AlbumCard';
import { fetchPlaylistByID } from '../components/Api';

const AllCategory = () => {

  const { homeData } = useContext(Context);
  const allCategory = homeData?.global_config?.weekly_top_songs_listid?.hindi?.listid;
  const [allCategoryData, setAllCategoryData] = useState([]);

  useEffect(() => {

    try {
      fetchPlaylistByID(allCategory).then(data => {
        console.log(data);
        setAllCategoryData(data);
      })
    } catch (error) {
      console.log(error);
    }

  }, [])


  return (

    <div style={{marginTop:10}} className="all-category-container p-4 w-full h-full">
      <h1 className='text-white font-semibold text-[20px]'>Popular Songs</h1>
      <div className='grid grid-cols-5 gap-2'>
        {
          allCategoryData?.data?.songs?.map((song, index) => (
            <div style={{}} className='flex flex-col justify-center items-center w-30 h-30' key={index}>
              <img src={song.image[1].url} alt="image" className='w-20 h-20 rounded-lg' />
              <h2 style={{
                    fontSize: 15, maxLines: 1, maxWidth: 180,
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    marginTop: 10,
                  }} className="text-lg text-white font-bold">{song.name}</h2>
            </div>
          ))
        }
      </div>
    </div>

  );
};

export default AllCategory;