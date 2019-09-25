import React, { PureComponent, createRef } from 'react';
import { connect } from 'react-redux';
import ReactPageScroller from 'react-page-scroller';

import { PAGES } from '../../data/home';

import { setGoToPage } from '../../actions/pages';

export class Home extends PureComponent {
  constructor(props) {
    super(props);
    this.reactPageScroller = createRef();
  }

  async componentDidMount() {
    const { setGoToPage } = this.props;
    setGoToPage(this.reactPageScroller.current.goToPage);
  }

  render() {
    const pages = PAGES.map(page => ({
      ...page,
      data: this.props.pages.find(({ id }) => page.id === id).data,
    }));

    return (
      <ReactPageScroller ref={this.reactPageScroller}>
        {pages.map(({ id, data, component: Component }) => (
          <Component key={id} {...data} />
        ))}
      </ReactPageScroller>
    );
  }
}

function mapToStateProps({ pages }) {
  return {
    pages: pages.pagesList,
  };
}

function mapToDispatchProps(dispatch) {
  return {
    setGoToPage: fn => dispatch(setGoToPage(fn))
  };
}

export default connect(mapToStateProps, mapToDispatchProps)(Home);
