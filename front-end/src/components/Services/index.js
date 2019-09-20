import React from 'react';

import BasicFooter from '../BasicFooter';
import Header from '../Header';

import './styles.scss';

export function Services() {
	return (
		<article>
			<div className="bg_sim_styles bg_services" />
			<Header />
			<main className="our_services">
				<div className="title">
					<div className="wrapper">
						<h1>Our Services</h1>
					</div>
				</div>
				<div className="service_items items_similar_styles">
					<div className="wrapper">
						<div className="content">
							<div>
								<div className="item_img">
									<img src="/images/services/strategy_planning.svg" alt="Service icon" />
								</div>
								<div className="item_name">
									<span>
										Strategy Planning
									</span>
								</div>
								<div className="item_description">
									<ul>
										<li>
											Analytics & Research
										</li>
										<li>
											Business Strategy
										</li>
										<li>
											Information Architecture
										</li>
										<li>
											Naming & Tagline
										</li>
									</ul>
								</div>
							</div>
							<div>
								<div className="item_img">
									<img src="/images/services/brand_identities.svg" alt="Service icon" />
								</div>
								<div className="item_name">
									<span>
										Brand Identities
									</span>
								</div>
								<div className="item_description">
									<ul>
										<li>
											Identity Design
										</li>
										<li>
											Logo Creation
										</li>
										<li>
											Art Direction
										</li>
										<li>
											Photography
										</li>
									</ul>
								</div>
							</div>
							<div>
								<div className="item_img">
									<img src="/images/services/digital_design.svg" alt="Service icon" />
								</div>
								<div className="item_name">
									<span>
										Digital Design
									</span>
								</div>
								<div className="item_description">
									<ul>
										<li>
											Web, Mobile & App Design
										</li>
										<li>
											UI & UX Design
										</li>
										<li>
											Responsive Design
										</li>
										<li>
											Content Strategy
										</li>
									</ul>
								</div>
							</div>
							<div>
								<div className="item_img">
									<img src="/images/services/graphic_design.svg" alt="Service icon" />
								</div>
								<div className="item_name">
									<span>
										Graphic Design
									</span>
								</div>
								<div className="item_description">
									<ul>
										<li>
											Multimedia Design
										</li>
										<li>
											Print Design
										</li>
										<li>
											Packaging Design
										</li>
										<li>
											Design
										</li>
									</ul>
								</div>
							</div>
							<div>
								<div className="item_img">
									<img src="/images/services/advertising.svg" alt="Service icon" />
								</div>
								<div className="item_name">
									<span>
										Advertising
									</span>
								</div>
								<div className="item_description">
									<ul>
										<li>
											Campaign Creation
										</li>
										<li>
											Concept Creation
										</li>
										<li>
											Copywriting
										</li>
										<li>
											Art Direction
										</li>
									</ul>
								</div>
							</div>
							<div>
								<div className="item_img">
									<img src="/images/services/illustration.svg" alt="Service icon" />
								</div>
								<div className="item_name">
									<span>
										Illustration
									</span>
								</div>
								<div className="item_description">
									<ul>
										<li>
											Advertising
										</li>
										<li>
											Editorial
										</li>
										<li>
											Publishing
										</li>
										<li>
											Print
										</li>
									</ul>
								</div>
							</div>
							<div>
								<div className="item_img">
									<img src="/images/services/development.svg" alt="Service icon" />
								</div>
								<div className="item_name">
									<span>
										Development
										Development
										Development
									</span>
								</div>
								<div className="item_description">
									<ul>
										<li>
											Frontend Development
										</li>
										<li>
											Backend Development
										</li>
										<li>
											Quality Assurance
										</li>
										<li>
											Maintenance
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="text_content">
					<div className="wrapper">
						<div className="content">
							<p>
								We"re game changers, inspired by our clients’
								businesses and our community. We believe in standing up
								for what we believe. So our work always stands
								out because it always stands for something.
								<br />
								Everything we do is driven by this principle to
								create more powerful, memorable connections
								between your brand and your customers and fans.
							</p>
						</div>
					</div>
				</div>
			</main>
			<BasicFooter />
		</article>
	);
}

export default Services;
