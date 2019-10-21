import React from 'react';
import { Animated } from 'react-animated-css';

import BasicFooter from '../BasicFooter';
import Header from '../Header';

import { convertText } from '../../utils';

import './styles.scss';

export function Services({ description, active }) {
  const services = [{
    icon: '/images/services/strategy_planning.svg',
    name: 'Strategy Planning',
    description: [
      'Analytics & Research',
      'Business Strategy',
      'Information Architecture',
      'Naming & Tagline'
    ]
  }, {
    icon: '/images/services/brand_identities.svg',
    name: 'Brand Identities',
    description: [
      'Identity Design',
      'Logo Creation',
      'Art Direction', 'Art Direction',
      'Photography']
  }, {
    icon: '/images/services/digital_design.svg',
    name: 'Digital Design',
    description: [
      'Web, Mobile & App Design',
      'UI & UX Design',
      'Responsive Design',
      'Content Strategy'
    ]
  }, {
    icon: '/images/services/graphic_design.svg',
    name: 'Graphic Design',
    description: [
      'Multimedia Design',
      'Print Design',
      'Packaging Design',
      'Design'
    ]
  }, {
    icon: '/images/services/reklami_ikonka.svg',
    name: 'Advertising',
    description: [
      'Campaign Creation',
      'Concept Creation',
      'Copywriting',
      'Art Direction'
    ]
  }, {
    icon: '/images/services/illustration.svg',
    name: 'Illustration',
    description: [
      'Advertising',
      'Editorial',
      'Publishing',
      'Print'
    ]
  }, {
    icon: '/images/services/development.svg',
    name: 'Development',
    description: [
      'Frontend Development',
      'Backend Development',
      'Quality Assurance',
      'Maintenance'
    ]
  }];

  return (
    <article>
      <div className="bg_sim_styles bg_services" />
      <Header active={active} />
      <main className="our_services centering_content">
        <div className="title">
          <div className="wrapper">
            <h1>Our Services</h1>
          </div>
        </div>
        <div className="service_items items_similar_styles">
          <div className="wrapper">
            <div className="content">
              {services.map((service, i) => (
                <Animated key={i} animationIn="fadeIn" animationOut="fadeOut" animationInDelay={500 + i * 100} isVisible={active}>
                  <div className="service_item">
                    <div className="item_img">
                      <img src={service.icon} alt="Service icon" />
                    </div>
                    <div className="item_name">
                      <span>
                        {service.name}
                      </span>
                    </div>
                    <div className="item_description">
                      <ul>
                        {service.description.map((el, i) => (
                          <li key={i}>
                            {el}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Animated>
              ))}
            </div>
          </div>
        </div>
        <div className="text_content">
          <div className="wrapper">
            <div className="content">
              <p>{convertText(description)}</p>
            </div>
          </div>
        </div>
      </main>
      <BasicFooter />
    </article>
  );
}

export default Services;
