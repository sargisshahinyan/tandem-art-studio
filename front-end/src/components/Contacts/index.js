import React, { memo } from 'react';

import Header from '../Header';
import BasicFooter from '../BasicFooter';

import './styles.scss';

export const Contacts = memo(
  function Contacts() {
    return (
      <article>
        <div className="bg_sim_styles bg_contact_us" />
        <Header />
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
                <div className="message">
                  <div className="message_content">
                    <textarea placeholder="Message:" />
                  </div>
                  <div className="send_button_position">
                    <button type="submit">Send</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <BasicFooter/>
      </article>
    );
  }
);

export default Contacts;
