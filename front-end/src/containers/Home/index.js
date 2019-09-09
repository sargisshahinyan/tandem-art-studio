import React, { PureComponent, createRef } from 'react';
import { connect } from 'react-redux';
import ReactPageScroller from 'react-page-scroller';

import { PAGES } from '../../data/home';

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
    if (this.pageDataExists) return;

    const pages = await PagesSvc.getPagesData();

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

    if (loading) return null;

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
    pages,
  };
}

export default connect(mapToStateProps)(Home);
