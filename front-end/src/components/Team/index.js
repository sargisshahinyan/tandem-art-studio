import React from 'react';
import Swipe from 'react-easy-swipe';
import { Animated } from 'react-animated-css';
import { connect } from 'react-redux';

import Header from '../Header';
import BasicFooter from '../BasicFooter';
import MobileFooter from '../MobileFooter';
import TeamSlider from './TeamSlider';
import Signature from '../Signature';

import { convertText } from '../../utils';

import './styles.scss';

export function Team({ title, description, members, active, width }) {
  const stopPropagation = e => width <= 767 && e.stopPropagation();

  return (
    <article className="bg_team">
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
          <Swipe onSwipeMove={(d, e) => stopPropagation(e)}>
            <TeamSlider members={members} />
          </Swipe>
        </div>
        <div className="text_content">
          <div className="wrapper">
            <div className="content">
              <h3>{title}</h3>
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

function mapStateToProps({ common: { width } }) {
  return {
    width,
  }
}

export default connect(mapStateToProps)(Team);
