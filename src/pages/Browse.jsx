import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Browse() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };
  return (
    <div className="p-4 w-screen h-100 flex flex-col justify-center items-center bg-amber-500">
      <h1 className="text-2xl font-bold mb-4">Browse</h1>
      <p>Welcome to the Browse page!</p>
      <div className="w-screen h-50">
      <Slider {...settings}>
        <div><h1>1</h1></div>
        <div><h1>2</h1></div>
        <div><h1>3</h1></div>
        <div><h1>4</h1></div>
        <div><h1>5</h1></div>
        <div><h1>6</h1></div>

      </Slider>
      </div>
    </div>
  );
}

export default Browse;