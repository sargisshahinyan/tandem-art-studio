import React, { memo } from 'react';
import { Animated } from 'react-animated-css';
import { Link } from 'react-router-dom';

import AddressLine from '../AddressLine';

import './styles.scss';

export const LargeFooter = memo(
  function LargeFooter({ goToPage, active, noPadding, address }) {
    const padding = noPadding ? 'noPadding' : '';
    return (
      <footer className="large_footer">
        <div className={"wrapper " + padding}>
          <div className="top_side">
            <Animated
              animationIn="fadeIn"
              animationInDelay={300}
              animationOut="fadeOut"
              isVisible={!active}
            >
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
                <div className="right_side">
                  {address && <AddressLine />}
                </div>
              </div>
            </Animated>
          </div>
          <div className="middle_side">
            <Animated
              animationIn="fadeIn"
              animationInDelay={300}
              animationOut="fadeOut"
              isVisible={!active}
            >
              <div className="content_with_background">
                <div className="images_and_links">
                  <div className="images">
                    <div className="img">
                      <img src="/images/footer_pic_1.png" alt="pic"/>
                    </div>
                    <div className="img">
                      <img src="/images/footer_pic_2.png" alt="pic"/>
                    </div>
                    <div className="img">
                      <img src="/images/footer_pic_3.png" alt="pic"/>
                    </div>
                    <div className="img">
                      <img src="/images/footer_pic_4.png" alt="pic"/>
                    </div>
                    <div className="img">
                      <img src="/images/footer_pic_5.png" alt="pic"/>
                    </div>
                    <div className="img">
                      <img src="/images/footer_pic_6.png" alt="pic"/>
                    </div>
                    <div className="img">
                      <img src="/images/footer_pic_7.png" alt="pic"/>
                    </div>
                  </div>
                  <div className="links">
                    <div className="link link_mail">
                      <div className="icon icon_mail"/>
                      <div className="text"><a href="mailto:tandemartstudio@gmail.com">tandemartstudio@gmail.com</a></div>
                    </div>
                    <div className="link link_facebook">
                      <div className="icon icon_facebook"/>
                      <div className="text"><a href="https://www.facebook.com/designstudioTandem">www.facebook.com/@designstudioTandem</a></div>
                    </div>
                    <div className="link link_instagram">
                      <div className="icon icon_instagram" />
                      <div className="text"><a href="https://www.instagram.com/tandem_artstudio/">www.instagram.com/tandem_artstudio</a></div>
                    </div>
                    <div className="link link_tel_whatsapp_viber">
                      <div className="icon icon_tel"/>
                      <div className="text"><a href="tel:+37493930412">(+374) 93 93 04 12</a></div>
                      <div className="icon icon_whatsapp"/>
                      <div className="icon icon_viber"/>
                    </div>
                  </div>
                </div>
                <div className="logo_content">
                  <div className="logo">
                    <Link to="/" onClick={() => goToPage(0)}>
                      <img src="/images/logo.svg" alt="Logo" />
                    </Link>
                  </div>
                </div>
              </div>
            </Animated>
          </div>
          <div className="bottom_side">
            <Animated
              animationIn="fadeIn"
              animationInDelay={300}
              animationOut="fadeOut"
              isVisible={!active}
            >
              <span>© 2019 Tandem Art Studio | All Rights Reserved.</span>
            </Animated>
          </div>
        </div>
      </footer>
    );
  }
);

LargeFooter.defaultProps = {
  address: false,
};

export default LargeFooter;
