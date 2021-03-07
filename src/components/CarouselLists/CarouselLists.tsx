import React from 'react';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import Slider from 'react-slick';

import './CarouselLists.scss';

type TProps = {
  attractions: any;
};

const CarouselLists: React.FC<TProps> = ({ attractions }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  const renderSlides = () =>
    attractions.map(
      (item: { name: string; image: string; description: string }) => (
        <div key={item.name}>
          <span> {item.name}</span>
          <img src={item.image} alt={item.name} />
          <span>{item.description}</span>
        </div>
      )
    );

  return (
    <div className="carousel-countainer">
      <h2> Single Item</h2>
      <Slider {...settings}>{renderSlides()}</Slider>
    </div>
  );
};

export default CarouselLists;
