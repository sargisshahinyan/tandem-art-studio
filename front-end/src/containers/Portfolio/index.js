import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import Header from '../../components/Header';
import MainPortfolio from '../../components/MainPortfolio';
import PortfolioItem from '../../components/PortfolioItem';
import MobileFooter from '../../components/MobileFooter';

export function Portfolio({ width, match: { path } }) {
  return (
    <div style={{ overflow: 'hidden' }}>
      {width > 767 && <Header />}
      <Switch>
        <Route exact path={`${path}`} component={MainPortfolio} />
        <Route exact path={`${path}/:id`} component={PortfolioItem} />
      </Switch>
      <MobileFooter />
    </div>
  );
}

function mapToStateProps({ common: { width } }) {
  return { width };
}

export default connect(mapToStateProps)(Portfolio);
