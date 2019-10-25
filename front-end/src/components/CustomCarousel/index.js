import React from 'react';
import Slider from 'react-slick';

import './styles.scss';

export function CustomCarousel({ items }) {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    prevArrow: <img src="/images/icons/arrow-left.svg" alt="Left arrow" />,
    nextArrow: <img src="/images/icons/arrow-right.svg" alt="Right arrow" />,
    appendDots: dots => (
      <div>
        <ul className='slide-dots'>{dots}</ul>
      </div>
    ),
  };

  return (
    <Slider {...settings}>
      {items.map((src, i) => (
        <img
          key={i}
          className="carousel-item"
          src={src}
          alt="Slide"
        />
      ))}
    </Slider>
  );
}

export default CustomCarousel;
