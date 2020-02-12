import React from 'react';
import { connect } from 'react-redux';

import DesktopPortfolio from './DesktopPortfolio';
import MobilePortfolio from './MobilePortfolio';

export const MainPortfolio = ({ width, ...props }) => (
  width > 550 ? (
    <DesktopPortfolio {...props} />
  ) : (
    <MobilePortfolio {...props} />
  )
);

function mapToStateProps({ common: { width } }) {
  return {
    width,
  };
}

export default connect(mapToStateProps)(MainPortfolio);
