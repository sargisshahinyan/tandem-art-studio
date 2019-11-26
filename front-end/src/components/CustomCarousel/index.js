import React, { useEffect, useState, useRef } from 'react';
import Slider from 'react-slick';
import { Animated } from 'react-animated-css';

export function CustomCarousel({ items }) {
  const slider = useRef(null);
  const [loading, toggleLoading] = useState(true);
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    prevArrow: (
      <img
        src="/images/icons/arrow-left.svg"
        alt="Left Arrow"
      />
    ),
    nextArrow: (
      <img
        src="/images/icons/arrow-right.svg"
        alt="Right Arrow"
      />
    ),
    appendDots: dots => (
      <div>
        <ul className="slide-dots">{dots}</ul>
      </div>
    ),
  };

  useEffect(() => {
    slider.current.slickGoTo(Math.ceil(items.length / 2) - 1, true);
    setTimeout(() => {
      toggleLoading(false);
    }, 100);
  });

  return (
    <div hidden={loading} style={{ height: '100%' }}>
      <Slider {...settings} ref={slider}>
        {items.map(({ main, text }, i) => (
          <div
            key={i}
            className="carousel-item"
          >
            <div className="main">
              <Animated animationIn="fadeInLeft" isVisible={!loading}>
                <img
                  src={main.src}
                  alt="Slide"
                />
              </Animated>
            </div>
            <div className="text">
              <Animated animationIn="fadeInRight" isVisible={!loading}>
                <img
                  src={text.src}
                  alt="Text"
                />
              </Animated>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default CustomCarousel;
