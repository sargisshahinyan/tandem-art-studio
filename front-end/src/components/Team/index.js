import React from 'react';

import Header from '../Header';
import BasicFooter from '../BasicFooter';

import './styles.scss';

export function Team({ title, description }) {
	return (
		<article>
			<div className="bg_sim_styles bg_team" />
			<Header />
			<main className="our_team centering_content">
				<div className="title">
					<div className="wrapper">
						<h1>Our Team</h1>
					</div>
				</div>
				<div className="team_items items_similar_styles">
					<div className="wrapper">
						<div className="content">
							<div>
								<div className="item_img">
									<img src="/images/team/photo_1.svg" alt="Member" />
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
									<img src="/images/team/photo_2.svg" alt="Member" />
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
									<img src="/images/team/photo_3.svg" alt="Member" />
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
									<img src="/images/team/photo_4.svg" alt="Member" />
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
									<img src="/images/team/photo_5.svg" alt="Member" />
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
									<img src="/images/team/photo_6.svg" alt="Member" />
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
									<img src="/images/team/photo_7.svg" alt="Member" />
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
									<img src="/images/team/photo_8.svg" alt="Member" />
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
									<img src="/images/team/photo_9.svg" alt="Member" />
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
							<h3>{title}</h3>
							<p>{description}</p>
						</div>
					</div>
				</div>
			</main>
			<BasicFooter />
		</article>
	);
}

export default Team;
