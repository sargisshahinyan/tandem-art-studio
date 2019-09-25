import React, { memo } from 'react';

import './styles.scss';

export const BasicFooter = memo(
  function BasicFooter() {
    return (
      <footer className="basic_footer">
        <div className="wrapper">
          <div className="footer_content">
            <div className="socialize">
              <ul>
                <li>
                  <a href="">
                    <img src="/images/icons/ic_be.svg" alt="be-icon" />
                  </a>
                </li>
                <li>
                  <a href="">
                    <img src="/images/icons/ic_fb.svg" alt="fb-icon" />
                  </a>
                </li>
                <li>
                  <a href="">
                    <img src="/images/icons/ic_in.svg" alt="in-icon" />
                  </a>
                </li>
                <li>
                  <a href="">
                    <img src="/images/icons/ic_mail.svg" alt="mail-icon" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    );
  }
);

export default BasicFooter;
