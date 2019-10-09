import React, { memo } from 'react';
import { Animated } from 'react-animated-css';

import Header from '../Header';
import LargeFooter from '../LargeFooter';

import './styles.scss';

export const Contacts = memo(
  function Contacts({ goToPage, scrolling, active }) {
    return (
      <article>
        <div className="bg_sim_styles bg_contact_us" />
        <Header active={active} />
        <main className="contact_us centering_content">
          <div className="title">
            <div className="wrapper">
              <h1>Contact with us</h1>
            </div>
          </div>
          <div className="form_content">
            <div className="wrapper">
              <div className="content">
                <div className="inputs">
                  <Animated
                    animationIn="fadeInLeft"
                    animationInDelay={300}
                    animationOut="fadeOut"
                    isVisible={active}
                  >
                    <div className="input_items">
                      <div>
                        <input placeholder="Name:" type="text" />
                      </div>
                      <div>
                        <input placeholder="Surname:" type="text" />
                      </div>
                      <div>
                        <input placeholder="Email:" type="text" />
                      </div>
                      <div>
                        <input placeholder="Phone:" type="text" />
                      </div>
                    </div>
                  </Animated>
                </div>
                <div className="message">
                  <Animated
                    animationIn="fadeInRight"
                    animationInDelay={300}
                    animationOut="fadeOut"
                    isVisible={active}
                  >
                    <div className="message_items">
                      <div className="message_content">
                        <textarea placeholder="Message:" />
                      </div>
                      <div className="send_button_position">
                        <button type="submit">Send</button>
                      </div>
                    </div>
                  </Animated>
                </div>
              </div>
            </div>
          </div>
        </main>
        <LargeFooter/>
      </article>
    );
  }
);

export default Contacts;
