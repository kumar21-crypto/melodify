import React, { useState, useContext, useEffect } from 'react';
import { MdArrowForwardIos } from "react-icons/md";
import { MdArrowBackIosNew } from "react-icons/md";
import { Chip, Stack } from '@mui/material';
import AllCategory from '../homecategory/AllCategory'; // Import the AllCategory c
import { Context } from '../components/ContextApi';
import { fetchPlaylistByID } from '../components/Api';

const HomeSelector = () => {

  const [selectedCategory, setSelectedCategory] = useState('New'); // State to manage selected category
  const { homeData } = useContext(Context);

  const allCategory = homeData?.global_config?.weekly_top_songs_listid?.hindi?.listid;
  const [allCategoryData, setAllCategoryData] = useState([]);

  const devotionalCategory = homeData?.['promo:vx:data:107'];
  const [devotionalCategoryData, setDevotionalCategoryData] = useState([]);

  useEffect(() => {

    fetchData();
  }, [allCategory]);

  const fetchData = async () => {
    try {

      // all category api fetch
      const data = await fetchPlaylistByID(allCategory);
      setAllCategoryData(data);

      // devotional category api fetch
     

    } 
    catch (error) {
      console.log(error);
    }
  };


  const handleClick = (category) => {
    setSelectedCategory(category);
  };

  // all or new category container
  const allCategoryContainer = () => {

    return (
      <div style={{ marginTop: 10 }} className="all-category-container p-4 w-full h-full">
        <h1 className='text-white font-semibold text-[20px]'>Popular Songs</h1>
        <div>{console.log(allCategory)}</div>
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
    )

  }

  const trendingCategoryContainer = () => {

    return (
      <div>trending section</div>
    )

  }


  // Devotional category container
  const DevotionalCategoryContainer = () => {

    return (
      
      <div style={{ marginTop: 10 }} className="all-category-container p-4 w-full h-full">
        <h1 className='text-white font-semibold text-[20px]'>Devotional Songs</h1>
        <div className='grid grid-cols-5 gap-2'>
          {
            devotionalCategory?.map((album, index) => (
              <div style={{}} className='flex flex-col justify-center items-center w-30 h-30' key={index}>
                <img src={album.image} alt="image" className='w-20 h-20 rounded-lg' />
                <h2 style={{
                  fontSize: 15, maxLines: 1, maxWidth: 180,
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  marginTop: 10,
                }} className="text-lg text-white font-bold">{album.title}</h2>
              </div>
            ))
          }
        </div>
      </div>
    )
  }



  return (
    <div className="w-full h-auto">
      {/* select category */}
      <div className='flex justify-between'>
        <div className='font-bold text-white text-2xl'>Select Categories</div>
        <div className='flex w-15 text-white justify-between items-center'>
          <MdArrowBackIosNew />
          <MdArrowForwardIos />
        </div>
      </div>

      {/* select category header */}
      <div className='w-full h-10 flex items-center'>
        <Stack sx={{ color: 'white' }} direction="row" spacing={1}>

          <Chip onClick={() => handleClick('New')} label="New"
            sx={{
              color: 'white', borderColor: 'white',
              border: selectedCategory === 'New' ? 'none' : '1px solid white',
              backgroundColor: selectedCategory === 'New' ? '#21897f' : 'transparent'
            }} />

          <Chip onClick={() => handleClick('Devotional')} label="Devotional"
            sx={{
              color: 'white', borderColor: 'white',
              border: selectedCategory === 'Devotional' ? 'none' : '1px solid white',
              backgroundColor: selectedCategory === 'Devotional' ? '#21897f' : 'transparent'
            }} />

          <Chip onClick={() => handleClick('Party')} label="Party"
            sx={{
              color: 'white', borderColor: 'white',
              border: selectedCategory === 'Party' ? 'none' : '1px solid white',
              backgroundColor: selectedCategory === 'Party' ? '#21897f' : 'transparent'
            }} />

          <Chip onClick={() => handleClick('Chill')} label="Chill"
            sx={{
              color: 'white', borderColor: 'white',
              border: selectedCategory === 'Chill' ? 'none' : '1px solid white',
              backgroundColor: selectedCategory === 'Chill' ? '#21897f' : 'transparent'
            }} />

          <Chip onClick={() => handleClick('Genres')} label="Genres"
            sx={{
              color: 'white', borderColor: 'white',
              border: selectedCategory === 'Genres' ? 'none' : '1px solid white',
              backgroundColor: selectedCategory === 'Genres' ? '#21897f' : 'transparent'
            }} />

          <Chip onClick={() => handleClick('Moods')} label="Moods"
            sx={{
              color: 'white', borderColor: 'white',
              border: selectedCategory === 'Moods' ? 'none' : '1px solid white',
              backgroundColor: selectedCategory === 'Moods' ? '#21897f' : 'transparent'
            }} />

          <Chip onClick={() => handleClick('Decades')} label="Decades"
            sx={{
              color: 'white', borderColor: 'white',
              border: selectedCategory === 'Decades' ? 'none' : '1px solid white',
              backgroundColor: selectedCategory === 'Decades' ? '#21897f' : 'transparent'
            }} />
        </Stack>
      </div>

      {/* category container */}
      <main className='w-full h-auto'>
        {selectedCategory === 'New' && allCategoryContainer()}
        {selectedCategory === 'Devotional' && DevotionalCategoryContainer()}
        {selectedCategory === 'Party' && <div>Artists Content</div>}
        {selectedCategory === 'Chill' && <div>Albums Content</div>}
        {selectedCategory === 'Genres' && <div>Genres Content</div>}
        {selectedCategory === 'Moods' && <div>Moods Content</div>}
        {selectedCategory === 'Decades' && <div>Decades Content</div>}
      </main>
    </div>
  );
};

export default HomeSelector;