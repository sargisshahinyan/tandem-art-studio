import React, { PureComponent, createRef } from 'react';
import { connect } from 'react-redux';
import ReactPageScroller from 'react-page-scroller';

import { PAGES, SWIPE_DURATION } from '../../data/home';

import { setGoToPage, setActivePage, toggleScrollingState } from '../../actions/pages';

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
    const { pageOnChange } = this.props;
    const pages = PAGES.map(page => ({
      ...page,
      data: this.props.pages.find(({ id }) => page.id === id).data,
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
    pages: pages.pagesList,
  };
}

function mapToDispatchProps(dispatch) {
  return {
    setGoToPage: fn => dispatch(setGoToPage(fn)),
    setActivePage: num => dispatch(setActivePage(num)),
    toggleScrollingState: () => dispatch(toggleScrollingState()),
  };
}

function mergeProps(stateProps, { setActivePage, toggleScrollingState, ...otherDispatch }) {
  return {
    ...stateProps,
    ...otherDispatch,
    pageOnChange: num => {
      setActivePage(num);
      toggleScrollingState();
    },
  };
}

export default connect(mapToStateProps, mapToDispatchProps, mergeProps)(Home);
