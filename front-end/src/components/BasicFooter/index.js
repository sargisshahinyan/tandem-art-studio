import React, { memo } from 'react';
import { Animated } from 'react-animated-css';

import './styles.scss';

export const BasicFooter = memo(
  function BasicFooter({ goToPage, active }) {
    return (
      <footer className="basic_footer">
        <div className="wrapper">
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
                    <a href="">
                      <img src="/images/icons/ic_be.png" alt="be-icon" />
                    </a>
                  </li>
                  <li>
                    <a href="">
                      <img src="/images/icons/ic_fb.png" alt="fb-icon" />
                    </a>
                  </li>
                  <li>
                    <a href="">
                      <img src="/images/icons/ic_in.png" alt="in-icon" />
                    </a>
                  </li>
                  <li>
                    <a href="">
                      <img src="/images/icons/ic_mail.png" alt="mail-icon" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </Animated>
        </div>
      </footer>
    );
  }
);

export default BasicFooter;
