import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { loadPortfolios } from '../../actions/portfolios';

import './styles.scss';

export class MainPortfolio extends PureComponent {
  componentDidMount() {
    const { loadPortfolios, portfolios } = this.props;

    if (!portfolios.length) loadPortfolios();
  }

  render() {
    let {
      portfolios,
      match: { path },
    } = this.props;

    return (
      <div className="portfolio">
        {portfolios.map(portfolio => (
          <Link
            key={portfolio.id}
            to={`${path}/${portfolio.id}`}
            className="portfolio-item"
          >
            <img src={portfolio.presentable_picture} alt="Portfolio" />
          </Link>
        ))}
      </div>
    );
  }
}

function mapToStateProps({ pages, portfolios, common: { width } }) {
  const { data } = pages.pagesList.find(item => item.path === '/portfolio') || {};

  return {
    data,
    width,
    portfolios: portfolios.list,
  };
}

function mapToDispatchProps(dispatch) {
  return {
    loadPortfolios: () => dispatch(loadPortfolios()),
  };
}

export default connect(mapToStateProps, mapToDispatchProps)(MainPortfolio);
