import React, { memo } from 'react';
import Slider from 'react-slick';

import Header from '../Header';
import BasicFooter from '../BasicFooter';
import Signature from '../Signature';

import { clients } from '../../data/clients';

import { convertText } from '../../utils';

import './styles.scss';
import {connect} from 'react-redux';

export const Clients = memo(
  function Clients({ title, description, width }) {
    let amountInSlide;

    switch (true) {
      case width < 768:
        amountInSlide = 3;
        break;
      default:
        amountInSlide = 9;
    }

    const settings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: amountInSlide,
      slidesToScroll: amountInSlide,
      prevArrow: <img src="/images/icons/arrow-left.svg" alt="Left arrow" />,
      nextArrow: <img src="/images/icons/arrow-right.svg" alt="Right arrow" />,
      appendDots: dots => (
        <div>
          <ul className='slide-dots'>{dots}</ul>
        </div>
      ),
    };

    return (
      <article>
        <div className="bg_sim_styles bg_clients" />
        <Header />
        <main className="our_clients centering_content">
          <div className="title">
            <div className="wrapper">
              <h1>Our Clients</h1>
            </div>
          </div>
          <div className="clients_slider">
            <div className="slider">
              <Slider {...settings}>
                {clients.map((client, i) => (
                  <div key={i} className="slide_item">
                    <img
                      src={client}
                      alt="Client"
                      className="client_logo"
                    />
                  </div>
                ))}
              </Slider>
            </div>
          </div>
          <div className="text_content">
            <div className="wrapper">
              <div className="content">
                <h2>{title}</h2>
                <p>{convertText(description)}</p>
              </div>
            </div>
          </div>
          <Signature />
        </main>
        <BasicFooter />
      </article>
    );
  }
);

function mapToStateProps({ common: { width } }) {
  return {
    width,
  };
}

export default connect(mapToStateProps)(Clients);
