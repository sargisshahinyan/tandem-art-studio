import React from 'react';

import Header from '../Header';

import './styles.scss';
import BasicFooter from '../BasicFooter';
import CustomCarousel from '../CustomCarousel';

export function Home({ slidePaths }) {
	return (
		<article>
			<div className="bg_sim_styles bg_index" />
			<Header />
			<main className="index_content">
				<div className="middle_bg" />
				<div className="home_carousel">
          <CustomCarousel
            items={slidePaths}
          />
				</div>
			</main>
			<BasicFooter />
		</article>
	);
}

export default Home;
