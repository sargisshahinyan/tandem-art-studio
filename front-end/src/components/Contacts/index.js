import React, { memo } from 'react';
import { Animated } from 'react-animated-css';

import Header from '../Header';
import LargeFooter from '../LargeFooter';
import HiddenFooter from '../HiddenFooter';
import BasicFooter from '../BasicFooter';
import Signature from '../Signature';

import './styles.scss';


export const Contacts = memo(
  function Contacts({ goToPage, scrolling, active }) {
    return (
      <article className="bg_contact_us">
        <Header active={active} />
        <main className="contact_us centering_content">
          <div className="title">
            <div className="wrapper">
              <h1>Contact with us</h1>
            </div>
          </div>
          <div className="form_content">
            <div className="wrapper">
                <div className="inputs">
                  <Animated
                    animationIn="fadeInLeft"
                    animationInDelay={300}
                    animationOut="fadeOut"
                    isVisible={active}
                  >
                    <input placeholder="Name:" type="text" />
                    <input placeholder="Surname:" type="text" />
                    <input placeholder="Email:" type="text" />
                    <input placeholder="Phone:" type="text" />
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
            <Animated
              animationIn="fadeIn"
              animationInDelay={300}
              animationOut="fadeOut"
              isVisible={active}
            >
              <Signature />
            </Animated>
          </div>

        </main>
        <Animated
          animationIn="fadeIn"
          animationInDelay={300}
          animationOut="fadeOut"
          isVisible={active}
        >
          <LargeFooter noPadding={true} />
        </Animated>
        <Animated
          animationIn="fadeIn"
          animationInDelay={300}
          animationOut="fadeOut"
          isVisible={active}
        >
          <BasicFooter />
        </Animated>
          <HiddenFooter />
      </article>
    );
  }
);

export default Contacts;
