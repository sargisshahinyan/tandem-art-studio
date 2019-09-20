import React from 'react';

import Header from '../Header';
import BasicFooter from '../BasicFooter';
import Signature from '../Signature';

import './styles.scss';

export function About({ description }) {
	return (
		<article>
			<div className="bg_sim_styles bg_about" />
			<Header />
			<main className="about_content">
				<div className="title">
					<div className="wrapper">
						<h1>About Us</h1>
					</div>
				</div>
				<div className="text_content with_bg">
					<div className="wrapper">
						<div className="content">
							<p>{description}</p>
						</div>
					</div>
				</div>
				<Signature />
			</main>
			<BasicFooter />
		</article>
	);
}

export default About;
