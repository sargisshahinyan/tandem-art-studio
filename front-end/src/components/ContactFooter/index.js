import React from 'react';
import { connect } from 'react-redux';
import { Animated } from 'react-animated-css';
import { Link } from 'react-router-dom';

import './style.scss';

const addresses = {
  armenian: [
    'Armenia Yerevan',
    'Arshakunyats Avenue, 53A/33',
    'Tel: +374 10 44 09 62',
    'Mob: +374 93 93 04 12',
  ],
  usa: [
    'USA, California, Denver',
    '2924 Marion St, Denver, CO 80205',
    'Tel: +120 160818771',
    'Mob: +374 93 93 04 12',
  ],
};

const ContactFooter = ({ scrolling, goToPage }) => (
  <div className="contact-footer-container">
    <div className="footer_content">
      <div className="socialize">
        <ul>
          <li>
            <a
              href="https://www.behance.net/haykarturi5dcd"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/images/icons/ic_be.png" alt="be-icon" />
            </a>
          </li>
          <li>
            <a
              href="https://www.facebook.com/designstudioTandem/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/images/icons/ic_fb.png" alt="fb-icon" />
            </a>
          </li>
          <li>
            <a
              href="https://www.instagram.com/tandem_artstudio"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/images/icons/ic_in.png" alt="in-icon" />
            </a>
          </li>
          <li>
            <a href="/">
              <img src="/images/icons/ic_mail.png" alt="mail-icon" />
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div className="contact-footer">
      <div className="left-large-footer">
        <div className="top-large-footer">
          <div className="info-block address-box armenian-address">
            <div className="location-logo">
              <img src="/images/icons/location.svg" alt="location" />
            </div>
            <div>
              {addresses.armenian.map((line, i) => (
                <div key={i}>{line}</div>
              ))}
            </div>
          </div>
          <div className="info-block address-box american-address">
            <div className="location-logo">
              <img src="/images/icons/location.svg" alt="location" />
            </div>
            <div>
              {addresses.usa.map((line, i) => (
                <div key={i}>{line}</div>
              ))}
            </div>
          </div>
          <div className="info-block footer-logo">
            <div>
              <span className="other-color">BE THE </span>
              <span>GAME</span>
            </div>
            <div>CHANGER</div>
          </div>
          <div className="info-block footer-links">
            <div className="link link_mail">
              <div className="icon icon_mail" />
              <div className="text">
                <a href="mailto:tandemartstudio@gmail.com">tandemartstudio@gmail.com</a>
              </div>
            </div>
            <div className="link link_facebook">
              <div className="icon icon_facebook" />
              <div className="text">
                <a
                  href="https://www.facebook.com/designstudioTandem"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  www.facebook.com/@designstudioTandem
                </a>
              </div>
            </div>
            <div className="link link_instagram">
              <div className="icon icon_instagram" />
              <div className="text">
                <a
                  href="https://www.instagram.com/tandem_artstudio"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  www.instagram.com/tandem_artstudio
                </a>
              </div>
            </div>
            <div className="link link_tel_whatsapp_viber">
              <div className="icon icon_tel" />
              <div className="text">
                <a href="tel:+37493930412">(+374) 93 93 04 12</a>
              </div>
              <a className="icon icon_whatsapp" href="https://api.whatsapp.com/send?phone=+37493930412" />
              <a className="icon icon_viber" href="viber://chat?number=+37493930412" />
            </div>
          </div>
        </div>
        <div className="bottom-large-footer">
          <Animated
            animationIn="fadeIn"
            animationInDelay={300}
            animationOut="fadeOut"
            isVisible={!scrolling}
          >
            <span>&copy; 2019 Tandem Art Studio | All Rights Reserved.</span>
          </Animated>
        </div>
      </div>
      <div className="right-large-footer">
        <div className="logo">
          <Link to="/" onClick={() => goToPage(0)}>
            <img src="/images/logo.svg" alt="Logo" />
          </Link>
        </div>
      </div>
    </div>
  </div>
);

function mapToStateProps({ pages }) {
  return {
    scrolling: pages.scrolling,
  };
}

export default connect(mapToStateProps)(ContactFooter);
