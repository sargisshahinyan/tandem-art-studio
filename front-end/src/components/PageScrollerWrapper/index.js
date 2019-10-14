import React, { PureComponent, createRef } from 'react';
import { connect } from 'react-redux';
import ReactPageScroller from 'react-page-scroller';

import { SWIPE_DURATION } from '../../data/home';

import { setGoToPage, setActivePage, toggleScrollingState } from '../../actions/pages';

export class PageScrollerWrapper extends PureComponent {
  constructor(props) {
    super(props);
    this.reactPageScroller = createRef();
  }

  async componentDidMount() {
    const { setGoToPage } = this.props;
    setGoToPage(this.reactPageScroller.current.goToPage);
  }

  render() {
    const { pageOnChange, pagesList } = this.props;
    let { pages } = this.props;
    pages = pages.map(page => ({
      ...page,
      data: pagesList.find(({ id }) => page.id === id).data,
    }));

    return (
      <ReactPageScroller
        ref={this.reactPageScroller}
        pageOnChange={pageOnChange}
        animationTimer={SWIPE_DURATION}
      >
        {pages.map(({ id, data, component: Component }, i) => (
          <Component
            key={id}
            pageNumber={i + 1}
            {...data}
          />
        ))}
      </ReactPageScroller>
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
    setGoToPage: fn => dispatch(setGoToPage(fn)),
    setActivePage: num => dispatch(setActivePage(num)),
    toggleScrollingState: () => dispatch(toggleScrollingState()),
  };
}

function mergeProps(stateProps, { setActivePage, toggleScrollingState, ...otherDispatch }, ownProps) {
  return {
    ...stateProps,
    ...otherDispatch,
    ...ownProps,
    pageOnChange: num => {
      setActivePage(num);
      toggleScrollingState();
    },
  };
}

export default connect(mapToStateProps, mapToDispatchProps, mergeProps)(PageScrollerWrapper);
