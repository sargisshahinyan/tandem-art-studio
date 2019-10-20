import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Header from '../../components/Header';
import MainPortfolio from '../../components/MainPortfolio';
import PortfolioItem from '../../components/PortfolioItem';

export function Portfolio({ match: { path } }) {
  return (
    <article>
      <Header />
      <div className="bg_sim_styles bg_index" />
      <Switch>
        <Route exact path={`${path}`} component={MainPortfolio} />
        <Route exact path={`${path}/:id`} component={PortfolioItem} />
      </Switch>
    </article>
  );
}

export default Portfolio;
