import React, { Fragment } from 'react';
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
    prevArrow: <Fragment />,
    nextArrow: <Fragment />,
  };

  return (
    <div className="teamSlider">
      <div className="slider">
        <Slider { ...settings }>
          {members.map((member, i) =>
            <TeamWorker key={i} { ...member } />
          )}
        </Slider>
      </div>
    </div>
  )
};

export default TeamSlider;
