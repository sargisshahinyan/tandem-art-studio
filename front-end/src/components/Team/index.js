import React from 'react';

import Header from '../Header';
import BasicFooter from '../BasicFooter';

import './styles.scss';

export function Team() {
	return (
		<article>
			<div className="bg_sim_styles bg_team" />
			<Header />
			<main className="our_team">
				<div className="title">
					<div className="wrapper">
						<h1>
							Our Team
						</h1>
					</div>
				</div>
				<div className="team_items items_similar_styles">
					<div className="wrapper">
						<div className="content">
							<div>
								<div className="item_img">
									<img src="images/team/photo_1.svg" />
								</div>
								<div className="item_name">
									<span>
										Hayk Hovhannisyan
									</span>
								</div>
								<div className="item_description">
									<p>
										Founder and CEO Director of advertising
									</p>
								</div>
							</div>
							<div>
								<div className="item_img">
									<img src="images/team/photo_2.svg" />
								</div>
								<div className="item_name">
									<span>
										Ani Asatryan
									</span>
								</div>
								<div className="item_description">
									<p>
										Art manager
									</p>
								</div>
							</div>
							<div>
								<div className="item_img">
									<img src="images/team/photo_3.svg" />
								</div>
								<div className="item_name">
									<span>
										Babken Hovhannisyan
									</span>
								</div>
								<div className="item_description">
									<p>
										Founder and Product director
									</p>
								</div>
							</div>
							<div>
								<div className="item_img">
									<img src="images/team/photo_4.svg" />
								</div>
								<div className="item_name">
									<span>
										Mishel Yeghiazaryan
									</span>
								</div>
								<div className="item_description">
									<p>
										Software Engineer
									</p>
								</div>
							</div>
							<div>
								<div className="item_img">
									<img src="images/team/photo_5.svg" />
								</div>
								<div className="item_name">
									<span>
										Hayk Arshakyan
									</span>
								</div>
								<div className="item_description">
									<p>
										Architect Designer
									</p>
								</div>
							</div>
							<div>
								<div className="item_img">
									<img src="images/team/photo_6.svg" />
								</div>
								<div className="item_name">
									<span>
										Jora Vardanyan
									</span>
								</div>
								<div className="item_description">
									<p>
										Motion Graphics Developer
									</p>
								</div>
							</div>
							<div>
								<div className="item_img">
									<img src="images/team/photo_7.svg" />
								</div>
								<div className="item_name">
									<span>
										Paruyr Kirakosyan
									</span>
								</div>
								<div className="item_description">
									<p>
										Software Engineer
									</p>
								</div>
							</div>
							<div>
								<div className="item_img">
									<img src="images/team/photo_8.svg" />
								</div>
								<div className="item_name">
									<span>
										Anna Ghazaryan
									</span>
								</div>
								<div className="item_description">
									<p>
										Writing and content developer
									</p>
								</div>
							</div>
							<div>
								<div className="item_img">
									<img src="images/team/photo_9.svg" />
								</div>
								<div className="item_name">
									<span>
										Artur Hovhannisyan
									</span>
								</div>
								<div className="item_description">
									<p>
										Front-end developer
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="text_content">
					<div className="wrapper">
						<div className="content">
							<h3>
								DESIGN. IT’S IN OUR BLOOD... IT’S EVERYTHING.
							</h3>
							<p>
								Design is different here. We come
								to work each day inspired by the
								future and eager to be a part of it.
								When people use our designs, we want
								them to wonder how they ever lived
								without them. We try hard to simplify
								and improve our customers’ lives.
								Our design team is a mix of experience
								and drive, engineering and art. This
								young, talented team rejuvenates our
								product every year. They never settle
								for anything less than unique collections
								of the highest quality. Tandem Art studio
								team of industrial and graphic designers
								collaborate with your firm to create
								uniquely engaging experiences. First,
								we get to know you and how you want to
								interact with your customers. Then we
								use that knowledge to help co-create
								brands that will resonate in a crowded
								marketplace and tailor innovative product
								solutions that work for your development,
								marketing and business operations.
							</p>
						</div>
					</div>
				</div>
			</main>
			<BasicFooter />
		</article>
	);
}

export default Team;
