import React from 'react';
import { Link } from 'react-router-dom';
import { Animated } from 'react-animated-css';
import {connect} from 'react-redux';

import './style.scss';

const HiddenFooter = ({ scrolling }) => (
  <Animated
    animationIn="fadeIn"
    animationInDelay={300}
    animationOut="fadeOut"
    isVisible={!scrolling}
  >
    <div id="hiddenFooter">

      <div><Link to="/portfolio">Portfolio</Link></div>
      <div><Link to="/">Services</Link></div>
      <div><Link to="/contact">Contacts</Link></div>
    </div>
  </Animated>
);

function mapToStateProps({ pages }) {
  return {
    scrolling: pages.scrolling,
  };
}

export default connect(mapToStateProps)(HiddenFooter);
