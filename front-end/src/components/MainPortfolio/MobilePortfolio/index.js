import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import MobileFooter from '../../MobileFooter';

import { loadPortfolios } from '../../../actions/portfolios';

import './styles.scss';

export const MobilePortfolio = (props) => {
  const {
    portfolios,
    loadPortfolios,
    match: { path },
  } = props;

  useEffect(() => {
    if (!portfolios.length) loadPortfolios();
  }, []);

  return (
    <div className="portfolios-wrapper-mobile">
      {portfolios.map((portfolio) => (
        <Link
          className="portfolio-item"
          to={`${path}/${portfolio.id}`}
          style={{
            backgroundImage: `url('${portfolio.presentable_picture}')`,
          }}
          key={portfolio.id}
        >
          <div className="title">
            {portfolio.title}
          </div>
        </Link>
      ))}
      <MobileFooter fixed />
    </div>
  );
};

function mapToStateProps({ pages, portfolios }) {
  const { data } = pages.pagesList.find(item => item.path === '/portfolio') || {};

  return {
    data,
    portfolios: portfolios.list,
  };
}

function mapToDispatchProps(dispatch) {
  return {
    loadPortfolios: () => dispatch(loadPortfolios()),
  };
}

export default connect(mapToStateProps, mapToDispatchProps)(MobilePortfolio);

