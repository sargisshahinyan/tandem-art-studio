import React, { useState, useEffect, memo } from 'react';
import { connect } from 'react-redux';

import PageScrollerWrapper from '../../components/PageScrollerWrapper';

import { PAGES } from '../../data/home';

const mobilePages = PAGES.filter(({ id }) => id !== 3);

export const Home = memo(({ width }) => {
  const [pages, setPages] = useState(width > 767 ? PAGES : mobilePages);

  useEffect(() => {
    const pages = width > 767 ? PAGES : mobilePages;
    setPages(pages);
  }, [width]);

  return <PageScrollerWrapper pages={pages} />;
});

function mapToStateProps({ common: { width } }) {
  return { width };
}

export default connect(mapToStateProps)(Home);
