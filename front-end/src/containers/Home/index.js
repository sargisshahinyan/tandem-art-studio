import React, { PureComponent, createRef } from 'react';
import { connect } from 'react-redux';
import ReactPageScroller from 'react-page-scroller';

import { PAGES } from '../../data/home';

import { setPagesData, setGoToPage } from '../../actions/pages';

import PagesSvc from '../../services/PagesSvc';

export class Home extends PureComponent {
  constructor(props) {
    super(props);

    const { pages } = props;
    this.pageDataExists = Boolean(Object.keys(pages).length);
    this.reactPageScroller = createRef();

    this.state = {
      pages: this.pageDataExists ? this.getPagesData(pages) : [],
      loading: !this.pageDataExists,
    };
  }

  async componentDidMount() {
    const { setGoToPage } = this.props;

    if (this.reactPageScroller.current) setGoToPage(this.reactPageScroller.current.goToPage);

    if (this.pageDataExists) return;
    const { setPagesData } = this.props;

    const pages = await PagesSvc.getPagesData();
    setPagesData(pages);

    this.setState({
      pages: this.getPagesData(pages),
      loading: false,
    });
  }

  getPagesData(pages) {
    return PAGES.map(page => ({
      ...page,
      data: pages.find(({ id }) => page.id === id).data,
    }));
  }

  render() {
    const { pages, loading } = this.state;

    return (
      <ReactPageScroller
        ref={this.reactPageScroller}
      >
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
    setPagesData: data => dispatch(setPagesData(data)),
    setGoToPage: fn => dispatch(setGoToPage(fn))
  };
}

export default connect(mapToStateProps, mapToDispatchProps)(Home);
