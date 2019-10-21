import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import { coordinatesToGrid, convertText } from '../../utils';

import { loadPortfolio } from '../../actions/portfolios';

import './styles.scss';

export class PortfolioItem extends PureComponent {
  componentDidMount() {
    const { loadPortfolio, portfolio } = this.props;

    if (!portfolio) loadPortfolio();
  }

  render() {
    const { portfolio, width } = this.props;

    if (!portfolio) return null;

    const style = {
      gridTemplateRows: `repeat(${portfolio.rows_count}, ${portfolio.row_height})`,
      gridTemplateColumns: `repeat(${portfolio.columns_count}, 1fr)`,
    };

    return (
      <main className="portfolio-single">
        <img
          className="main-picture"
          src={portfolio.main_picture}
          alt="Main picture"
        />
        <h1 className="title">
          {portfolio.title}
        </h1>
        <p className="description">
          {convertText(portfolio.description)}
        </p>
        <div className="portfolio" style={style}>
          {portfolio.images.map(image => {
            const { x_coords, y_coords } = image.coords.find(({ starts_from }) => starts_from < width);

            return (
              <div
                key={image.id}
                className="portfolio-item"
                style={{
                  gridColumn: coordinatesToGrid(x_coords),
                  gridRow: coordinatesToGrid(y_coords),
                }}
              >
                <img src={image.src} alt="Portfolio" />
              </div>
            );
          })}
        </div>
      </main>
    );
  }
}

function mapToStateProps({ portfolios: { selected }, common: { width } }) {
  return {
    width,
    portfolio: selected,
  };
}

function mapToDispatchProps(dispatch) {
  return {
    loadPortfolio: id => dispatch(loadPortfolio(id)),
  };
}

function mergeProps(stateProps, dispatchProps, ownProps) {
  const {
    match: {
      params: { id },
    },
  } = ownProps;

  return {
    ...stateProps,
    loadPortfolio: () => dispatchProps.loadPortfolio(id),
  };
}

export default connect(mapToStateProps, mapToDispatchProps, mergeProps)(PortfolioItem);
