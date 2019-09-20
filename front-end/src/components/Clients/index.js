import React from 'react';

import Header from '../Header';
import BasicFooter from '../BasicFooter';
import Signature from '../Signature';

import './styles.scss';

export function Clients() {
  return (
    <article>
      <div className="bg_sim_styles bg_clients" />
      <Header />
      <main className="our_clients">
        <div className="title">
          <div className="wrapper">
            <h1>Our Clients</h1>
          </div>
        </div>
        <div className="clients_slider">
          <div className="slider" />
        </div>
        <div className="text_content">
          <div className="wrapper">
            <div className="content">
              <h2>Our Clients are our priority</h2>
              <p>
                Innovation is born from collaboration
                and diverse perspectives.
                <br />
                We exist to serve organizations that
                are making a positive social impact.
                We bring teams of creative and technical
                talent together to help our clients
                achieve their mission. We work to ensure
                that every project reflects our client’s
                individual needs, vision, and unique
                identity combined with our marketing and
                creative guidance.Every project begins
                with understanding the goal. We guide you
                through each step of our process while
                meeting deadlines and challenges set
                forth to accomplish these goals.
                Ultimately your success is our success.
                We believe that great design and effective
                communication are key ingredients for
                <br />
                improving our lives and the world around us.
              </p>
            </div>
          </div>
        </div>
        <Signature />
      </main>
      <BasicFooter />
    </article>
  );
}

export default Clients;