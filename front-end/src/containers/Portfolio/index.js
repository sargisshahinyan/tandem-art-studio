import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import Header from '../../components/Header';
import MainPortfolio from '../../components/MainPortfolio';
import PortfolioItem from '../../components/PortfolioItem';
import HiddenFooter from '../../components/HiddenFooter';

export function Portfolio({ width, match: { path } }) {
  return (
    <article style={{ overflow: 'hidden' }}>
      {width > 767 && <Header />}
      <div className="bg_sim_styles bg_index" style={{ position: 'fixed' }} />
      <Switch>
        <Route exact path={`${path}`} component={MainPortfolio} />
        <Route exact path={`${path}/:id`} component={PortfolioItem} />
      </Switch>
      <HiddenFooter />
    </article>
  );
}

function mapToStateProps({ common: { width } }) {
  return { width };
}

export default connect(mapToStateProps)(Portfolio);
