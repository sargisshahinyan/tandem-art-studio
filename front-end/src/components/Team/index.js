import React from 'react';
import { Animated } from 'react-animated-css';
import { connect } from 'react-redux';

import Header from '../Header';
import BasicFooter from '../BasicFooter';
import HiddenFooter from '../HiddenFooter';
import TeamSlider from './TeamSlider';
import Signature from '../Signature';

import { convertText } from '../../utils';

import './styles.scss';

export function Team({ title, description, active, width }) {
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

  const eventBinder = {
    onScroll: e => {e.stopPropagation()},
    onWheel: e => {e.stopPropagation()},
    onTouchStart:e => {e.preventDefault()},
    onTouchMove:e => {e.stopPropagation()},
  };

  return (
    <article className="bg_team">
      <Header active={active} />
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
                <Animated key={i} animationIn="fadeInRight" animationOut="fadeOut" animationInDelay={(i + 1) * 50} isVisible={active}>
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
          <TeamSlider members={members} />
        </div>
        <div className="text_content">
          <div className="wrapper">
            <div className="content">
              <h3>{title}</h3>
              <p {...eventBinder}>{convertText(description)}</p>
            </div>
          </div>
        </div>
        <Signature />
      </main>
      <BasicFooter />
      <HiddenFooter />
    </article>
  );
}

function mapStateToProps({ common: { width } }) {
  return {
    width,
  }
}

export default connect(mapStateToProps)(Team);

