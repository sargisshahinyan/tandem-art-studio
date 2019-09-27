import React from 'react';
import { Animated } from "react-animated-css";
import { connect } from 'react-redux';

import Header from '../Header';
import BasicFooter from '../BasicFooter';

import { convertText } from '../../utils';

import './styles.scss';

export function Team({ title, description, active }) {
  const members = [{
    name: 'Hayk Hovhannisyan',
    avatar: '/images/team/photo_1.png',
    position: 'Founder and CEO director of advertising',
  }, {
    name: 'Ani Asatryan',
    avatar: '/images/team/photo_2.png',
    position: 'Art manager',
  }, {
    name: 'Babken Hovhannisyan',
    avatar: '/images/team/photo_3.png',
    position: 'Founder and Product director',
  }, {
    name: 'Mishel Yeghiazaryan',
    avatar: '/images/team/photo_4.png',
    position: 'Software Engineer',
  }, {
    name: 'Hayk Arshakyan',
    avatar: '/images/team/photo_5.png',
    position: 'Architect Designer',
  }, {
    name: 'Jora Vardanyan',
    avatar: '/images/team/photo_6.png',
    position: 'Motion Graphics Developer',
  }, {
    name: 'Paruyr Kirakosyan',
    avatar: '/images/team/photo_7.png',
    position: 'Software Engineer',
  }, {
    name: 'Anna Ghazaryan',
    avatar: '/images/team/photo_8.png',
    position: 'Writing and content developer',
  }, {
    name: 'Artur Hovhannisyan',
    avatar: '/images/team/photo_9.png',
    position: 'Front-end developer',
  }];

  return (
    <article>
      <div className="bg_sim_styles bg_team" />
      <Header />
      <main className="our_team centering_content">
        <div className="title">
          <div className="wrapper">
            <h1>Our Team</h1>
          </div>
        </div>
        <div className="team_items items_similar_styles">
          <div className="wrapper">
            <div className="content">
              {members.map((member, i) => (
                <Animated key={i}  animationIn="bounceInRight" animationOut="fadeOut" animationInDelay={i * 100} isVisible={active}>
                  <div className="member_container">
                    <div className="item_img">
                      <img src={member.avatar} alt="Member" />
                    </div>
                    <div className="item_name">
                    <span>{member.name}</span>
                    </div>
                    <div className="item_description">
                      <p>{member.position}</p>
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
              <h3>{title}</h3>
              <p>{convertText(description)}</p>
            </div>
          </div>
        </div>
      </main>
      <BasicFooter />
    </article>
  );
}

function mapToStateProps({ pages }, { pageNumber }) {
  return {
    active: pages.activePage === pageNumber,
  };
}

export default connect(mapToStateProps)(Team);
