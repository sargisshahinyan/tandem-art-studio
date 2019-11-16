import React from 'react';
import Slider from 'react-slick';

import TeamWorker from './TeamWorker';

import './style.scss';

const TeamSlider = ({ members }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    touchMove: false,
    prevArrow: <img src="/images/icons/arrow-left.svg" alt="Left arrow" />,
    nextArrow: <img src="/images/icons/arrow-right.svg" alt="Right arrow" />,
  };

  return (
    <div className="teamSlider">
      <div className="slider">
        <Slider { ...settings }>
          {members.map((member, i) =>
            <TeamWorker key={i} {...member} />
          )}
        </Slider>
      </div>
    </div>
  )
};

export default TeamSlider;
