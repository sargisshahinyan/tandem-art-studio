import React, {Fragment} from 'react';
import Slider from 'react-slick';
import { Animated } from 'react-animated-css';

import './styles.scss';

export function CustomCarousel({ items }) {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: !true,
    speed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    prevArrow: (
      <img
        src="/images/icons/arrow-left.svg"
        alt="Arrow"
      />
    ),
    nextArrow: (
      <img
        src="/images/icons/arrow-right.svg"
        alt="Arrow"
      />
    ),
    appendDots: dots => (
      <div>
        <ul className='slide-dots'>{dots}</ul>
      </div>
    ),
  };

  return (
    <Slider {...settings}>
      {items.map(({ main, text }, i) => (
        <div
          key={i}
          className="carousel-item"
        >
          <div className="main">
            <Animated animationIn="fadeInLeft">
              <img
                src={main}
                alt="Slide"
              />
            </Animated>
          </div>
          <div className="text">
            <Animated animationIn="fadeInRight">
              <img
                src={text}
                alt="Text"
              />
            </Animated>
          </div>
        </div>
      ))}
    </Slider>
  );
}

export default CustomCarousel;
