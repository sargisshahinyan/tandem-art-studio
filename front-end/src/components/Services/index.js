import React, { useState, useEffect } from 'react';
import { Animated } from 'react-animated-css';
import { connect } from 'react-redux';

import BasicFooter from '../BasicFooter';
import HiddenFooter from '../HiddenFooter';
import Header from '../Header';
import ServiceSlider from './ServiceSlider';

import { convertText } from '../../utils';

import './styles.scss';

export function Services({ services, description, active, width }) {
  const [selected, setSelected] = useState(1);
  const closed = width <= 1023;
  const [global, setGlobal] = useState(false);

  useEffect(() => {
    if (width > 1023) setGlobal(false);
  }, [width]);

  return (
    <article className="bg_services">
      <Header active={active} />
      <main className="our_services centering_content">
        <div className="title">
          <div className="wrapper">
            <h1>Our Services</h1>
          </div>
        </div>
        <ServiceSlider
          services={services}
          selected={selected}
          global={global}
        />
        <div className={"service_items items_similar_styles " + (global ? 'globalClosed' : '')}>
          <div className="wrapper">
            <div className="content">
              {services.map((service, i) => (
                <Animated
                  key={i}
                  animationIn="fadeIn"
                  animationOut="fadeOut"
                  animationInDelay={500 + i * 100}
                  isVisible={active}
                >
                  <div className="service_item" onClick={() => {
                    if (width <= 1023) {
                      setGlobal(true);
                      setSelected(i)
                    }
                  }}>
                    <div className="item_img">
                      <img src={service.icon} alt="Service icon" />
                    </div>
                    <div className="item_name">
                      <span>
                        {service.title}
                      </span>
                    </div>
                    <div className={"item_description " + (closed ? 'closed' : '') }>
                      {convertText(service.description)}
                    </div>
                  </div>
                </Animated>
              ))}
            </div>
          </div>
        </div>
        <div className={"text_content " + (global ? 'closed' : '')}>
          <div className="wrapper">
            <div className="content">
              <p>{convertText(description)}</p>
            </div>
          </div>
        </div>
      </main>
      <BasicFooter />
      <HiddenFooter />
    </article>
  );
}

const mapToStateProps = ({ common: { width } }) => ({
  width,
});

export default connect(mapToStateProps)(Services);

