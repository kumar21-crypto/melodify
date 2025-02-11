import React, { useEffect, useState, useContext } from 'react';
import Trending from './Trending';
import { Context } from '../components/ContextApi';
import Slider from 'react-slick';
import { CiPlay1 } from "react-icons/ci";
import HomeSelector from '../parts/HomeSelector';


function Home() {
  const { homeData } = useContext(Context);

  console.log(homeData);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,

  };

  return (
    <div  className="p-4  h-auto text-black  flex flex-col justify-between items-center">

      {/* slider function */}
      <div style={{margin:5}} className='w-[80vw] text-white h-100 bg-gray-800 flex rounded-[40px] flex-col justify-center items-center '>
        <Slider className='w-full flex flex-col justify-center items-center' {...settings}>
          {
            homeData?.new_albums?.map((item, index) => (

              <div key={index} className="p-2 relative ">
                <div className="p-4 rounded-lg flex flex-col justify-center items-center">
                  <img src={item.image} alt={item.title} className="hover:-translate-y-1 
                  hover:scale-110 duration-500 hover:opacity-80 backdrop-blur-sm w-70 h-70 object-cover cursor-pointer rounded-lg mb-2" />
                  <h3 style={{
                    fontSize: 15, maxLines: 1, maxWidth: 180,
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    marginTop: 10,
                  }} className="text-lg font-bold">{item.title}</h3>
                  <CiPlay1 className="absolute bottom-15 right-35 text-white  rounded-full p-1 cursor-pointer" size={25} />

                </div>
              </div>
            ))
          }
        </Slider>
      </div>


      {/* home selector */}
      <HomeSelector />

      {/* trending */}
      <Trending />
    </div>
  );
}

export default Home;