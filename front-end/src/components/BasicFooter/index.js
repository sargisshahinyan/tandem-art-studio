import React from 'react';

import './styles.scss';

export function BasicFooter() {
  return (
    <footer className="basic_footer">
      <div className="wrapper">
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
      </div>
    </footer>
  );
}

export default BasicFooter;
