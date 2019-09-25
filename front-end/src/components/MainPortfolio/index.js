import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { loadPortfolios } from '../../actions/portfolios';

import { coordinatesToGrid } from '../../utils';

import './styles.scss';

export class MainPortfolio extends PureComponent {
  componentDidMount() {
    const { loadPortfolios, portfolios } = this.props;

    if (!portfolios.length) loadPortfolios();
  }

  render() {
    let {
      data,
      portfolios,
      match: { path },
    } = this.props;

    const {
      rows_count,
      columns_count,
      row_height,
    } = data;

    const style = {
      gridTemplateRows: `repeat(${rows_count}, ${row_height})`,
      gridTemplateColumns: `repeat(${columns_count}, 1fr)`,
    };

    return (
      <div className="portfolio" style={style}>
        {portfolios.map(portfolio => (
          <Link
            key={portfolio.id}
            to={`${path}/${portfolio.id}`}
            className="portfolio-item"
            style={{
              gridColumn: coordinatesToGrid(portfolio.x_coords),
              gridRow: coordinatesToGrid(portfolio.y_coords),
            }}
          >
            <img src={portfolio.presentable_picture} alt="Portfolio" />
          </Link>
        ))}
      </div>
    );
  }
}

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

export default connect(mapToStateProps, mapToDispatchProps)(MainPortfolio);
