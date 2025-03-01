import React, { useContext } from 'react';
import { Context } from '../components/ContextApi';

function Browse() {

  const { homeData, loading } = useContext(Context);

  return (
    <div className="flex flex-col mt-5 text-white overflow-hidden w-full h-auto">
      <span className='text-white pl-7 pt-5  font-bold md:ml-[3rem] w-full flex'>Discover something new</span>
      <div className='grid mt-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2  px-5 justify-center items-center'>
      {
        homeData?.browse_discover?.map((item,index) =>(
          <div style={{marginTop:10}} key={index} className='flex flex-col justify-center items-center'>
            <img src={item.image} alt="" className='w-32 h-32 rounded-3xl shadow-2xl cursor-pointer hover:-translate-y-1
          hover:scale-110 duration-500 hover:opacity-80 bg-opacity-80  backdrop-blur-sm' />
            <p className='text-sm font-bold'>{item.title}</p>
          </div>
        ))
      }
      </div>
     </div>
  );
}

export default Browse;