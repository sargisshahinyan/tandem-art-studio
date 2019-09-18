import React from 'react';

import Header from '../Header';

import './styles.scss';
import BasicFooter from '../BasicFooter';

export function Home() {
	return (
		<article>
			<div className="bg_sim_styles bg_index" />
			<Header />
			<main className="index_content">
				<div className="middle_bg" />
			</main>
			<BasicFooter />
		</article>
	);
}

export default Home;
