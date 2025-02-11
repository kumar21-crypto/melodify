import React, { useContext } from 'react';
import { Skeleton } from '@mui/material';
import { Context } from '../components/ContextApi';
import AlbumCard from '../parts/AlbumCard';

function Trending() {
  const { homeData, loading } = useContext(Context);

  return (
    <div className='flex flex-col mt-5 text-white overflow-hidden w-full h-auto'>
      <span className='text-white pl-7 pt-5  font-bold md:ml-[3rem] w-full flex'>New Trending</span>

      <div className='grid mt-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2  px-5'>
        {
          loading ? (
            Array.from(new Array(10)).map((_, index) => (
              <div key={index} className='flex flex-col items-center'>
                <Skeleton sx={{ bgcolor: '#ABB2B9', marginRight: 2, marginTop: 2, marginLeft: 2, borderRadius: 5 }} variant="rectangular" width={128} height={128} />
                <Skeleton sx={{ bgcolor: '#ABB2B9', marginTop: 1, borderRadius: 5 }} variant="text" width={100} height={18} />
              </div>
            ))
          ) : (
            homeData?.new_trending?.map((item) => (
              <AlbumCard
                key={item?.id}
                album={item}
              />
            ))
          )
        }
      </div>
    </div>
  );
}

export default Trending;