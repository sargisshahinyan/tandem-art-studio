import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import { coordinatesToGrid } from '../../utils';

import { loadPortfolio } from '../../actions/portfolios';

import './styles.scss';

export class PortfolioItem extends PureComponent {
  componentDidMount() {
    const { loadPortfolio, portfolio } = this.props;

    if (!portfolio) loadPortfolio();
  }

  render() {
    const { portfolio } = this.props;

    if (!portfolio) return null;

    return null;
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
