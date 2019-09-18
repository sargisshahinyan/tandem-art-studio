import React from 'react';

import './styles.scss';
import Header from '../Header';
import BasicFooter from '../BasicFooter';

export function About() {
	return (
		<article>
			<div className="bg_sim_styles bg_about" />
			<Header />
			<main className="about_content">
				<div className="title">
					<div className="wrapper">
						<h1>
							About Us
						</h1>
					</div>
				</div>
				<div className="text_content with_bg">
					<div className="wrapper">
						<div className="content">
							<p>
								Tandem Studio was founded by a group of
								enthusiasts working together to convey to all
								our theories and approaches to graphics and the
								human world any understanding of color, form,
								material and aesthetics in general.
								We tried to create a new domain in Armenian reality,
								which would allow us to get an open platform for
								all those who want to study, improve or work with us.
								Taking this ideology to heart, we began to look
								for practical solutions, and by 2017
								TANDEM ART STUDIO was launched.
								Tandem Art Studio is a graphic design firm. We turn insights,
								strategies, and great design into creative solutions
								that consumers engage with. Our process focuses on
								visually defining your message to connect your
								customer to your product or service.
								Our working team was formed quickly,
								uniting over the years with clear and
								recognizable ideas about the future and the future.
								Our team grows by attracting people with new ideas
								and professional qualities, we are always ready for
								cooperation and open to any format.
								Our experience in a wide variety of design
								disciplines means your image will be consistent
								and professionally produced across all media types.
								So whether it’s a website, package, promotion,
								ad or trade show booth, they will all work together
								to help build a memorable and cohesive brand experience.
								We"re passionate about design and enjoy being part of a
								process that sees the relationship between our
								clients and their customers strengthened
							</p>
						</div>
					</div>
				</div>
				<div className="signature">
					<div className="wrapper">
						<div className="img">
							<img src="images/signature.svg" />
						</div>
					</div>
				</div>

			</main>
			<BasicFooter />

		</article>
	);
}

export default About;
