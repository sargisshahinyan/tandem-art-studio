import React from 'react';
import { Link } from 'react-router-dom';
import { Animated } from 'react-animated-css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './style.scss';

const MobileFooter = ({ scrolling, width, fixed }) => (
  width <= 767 && (
    <Animated
      animationIn="fadeIn"
      animationInDelay={300}
      animationOut="fadeOut"
      isVisible={!scrolling}
    >
      <div
        id="hiddenFooter"
        style={{
          ...(fixed && {
            position: 'fixed',
          })
        }}
      >
        <div><Link to="/portfolio">Portfolio</Link></div>
        <div><Link to="/">Services</Link></div>
        <div><Link to="/contact">Contacts</Link></div>
      </div>
    </Animated>
  )
);

MobileFooter.propTypes = {
  fixed: PropTypes.bool,
};

MobileFooter.defaultProps = {
  fixed: false,
};

function mapToStateProps({ pages, common: { width } }) {
  return {
    scrolling: pages.scrolling,
    width,
  };
}

export default connect(mapToStateProps)(MobileFooter);
