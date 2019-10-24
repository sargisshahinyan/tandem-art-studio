import React, { useEffect, useRef, useState } from 'react';
import Slider from 'react-slick';

import Service from './Service';
import './style.scss';

const ServiceSlider = ({ services, selected = 1, global }) => {
  const slider = useRef(null);
  const [loading, toggleLoading] = useState(true);
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    touchMove: false,
    prevArrow: <img src="/images/icons/arrow-left.svg" alt="Left arrow" />,
    nextArrow: <img src="/images/icons/arrow-right.svg" alt="Right arrow" />,
  };

  useEffect(() => {
    slider.current.slickGoTo(selected, true);
    toggleLoading(false);
    return () => toggleLoading(true);
  }, [selected]);

  return (
    <div className={"singleService " + (!global ? 'globalClosed' : '')} hidden={loading}>
      <Slider ref={slider} { ...settings }>
        {services.map((service, i) =>
          <Service key={i} { ...service } />
        )}
      </Slider>
    </div>
  )
};

export default ServiceSlider;
