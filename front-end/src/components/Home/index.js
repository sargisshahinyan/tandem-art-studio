import React, { memo } from 'react';

import Header from '../Header';
import BasicFooter from '../BasicFooter';
import CustomCarousel from '../CustomCarousel';

import './styles.scss';

export const Home = memo(
  function Home({ slidePaths }) {
    return (
      <article>
        <div className="bg_sim_styles bg_index" />
        <div className="home_carousel">
          <CustomCarousel items={slidePaths} />
        </div>
        <Header />
        <main className="index_content">
          <div className="middle_bg" />
        </main>
        <BasicFooter />
      </article>
    );
  }
);

export default Home;
