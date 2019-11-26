import React, { memo } from 'react';
import Slider from 'react-slick';
import { connect } from 'react-redux';
import Swipe from 'react-easy-swipe';

import Header from '../Header';
import BasicFooter from '../BasicFooter';
import MobileFooter from '../MobileFooter';
import Signature from '../Signature';

import { convertText } from '../../utils';

import './styles.scss';

export const Clients = memo(
  function Clients({ title, description, clients, width }) {
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
          <ul className="slide-dots">{dots}</ul>
        </div>
      ),
    };
    const stopPropagation = e => width <= 767 && e.stopPropagation();

    clients.sort((a, b) => a.order - b.order);

    return (
      <article className="bg_clients">
        <Header />
        <main className="our_clients centering_content">
          <div className="title">
            <div className="wrapper">
              <h1>Our Clients</h1>
            </div>
          </div>
          <Swipe onSwipeMove={(d, e) => stopPropagation(e)}>
            <div className="clients_slider">
              <div className="slider">
                <Slider {...settings}>
                  {clients.map(({ icon }, i) => (
                    <div key={i} className="slide_item">
                      <img
                        src={icon}
                        alt="Client"
                        className="client_logo"
                      />
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
          </Swipe>

          <div className="text_content">
            <div className="wrapper">
              <div className="content">
                <h2>{title}</h2>
                <Swipe onSwipeMove={(d, e) => stopPropagation(e)}>
                  <p>{convertText(description)}</p>
                </Swipe>
              </div>
            </div>
          </div>
          <Signature />
        </main>
        <BasicFooter />
        <MobileFooter />
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
