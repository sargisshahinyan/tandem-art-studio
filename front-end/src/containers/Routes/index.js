import React, { Fragment, PureComponent } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

import { loadPagesData } from '../../actions/pages';

import Home from '../Home';
import Portfoio from '../Portfolio';

export class Routes extends PureComponent {
  componentDidMount() {
    const { loadPagesData, pagesList } = this.props;
    if (!pagesList.length) loadPagesData();
  }

  render() {
    const { pagesList } = this.props;

    if (!pagesList.length) return null;

    return (
      <Fragment>
        <Route exact path="/" component={Home} />
        <Route path="/portfolio" component={Portfoio} />
      </Fragment>
    );
  }
}

function mapToStateProps({ pages }) {
  return {
    pagesList: pages.pagesList,
  };
}

function mapToDispatchProps(dispatch) {
  return {
    loadPagesData: () => dispatch(loadPagesData()),
  };
}

export default connect(mapToStateProps, mapToDispatchProps)(Routes);
