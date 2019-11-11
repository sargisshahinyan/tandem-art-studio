import React, { memo } from 'react';
import { connect } from 'react-redux';

import Header from '../Header';
import BasicFooter from '../BasicFooter';
import CustomCarousel from '../CustomCarousel';
import HiddenFooter from '../HiddenFooter';

import './styles.scss';

export const Home = memo(
  function Home({ slidePaths, width }) {
    return (
      <article>
        <div className="bg_sim_styles bg_index" />
        <div className="home_carousel">
          <CustomCarousel items={slidePaths} />
        </div>
        {width > 767 && <Header />}
        <main className="index_content">
          <div className="middle_bg" />
        </main>
        <BasicFooter />
        <HiddenFooter />
      </article>
    );
  }
);

function mapToStateProps({ common: { width } }) {
  return {
    width,
  };
}

export default connect(mapToStateProps)(Home);
