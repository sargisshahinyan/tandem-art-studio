import React, { memo } from 'react';
import { connect } from 'react-redux';
import { Animated } from 'react-animated-css';
import { Link } from 'react-router-dom';

import './styles.scss';

export const BasicFooter = memo(
  function BasicFooter({ goToPage, active, width }) {
    function goToPageWrapper(e) {
      e.preventDefault();

      const pageIndex = window.location.pathname === '/' ? 6 : 2;
      goToPage(pageIndex);
    }

    return (
      <footer className={"basic_footer " + (width <= 767 ? 'mobileBasicFooter' : '')}>
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
                    <Link to="/" onClick={goToPageWrapper}>
                      <img src="/images/icons/ic_mail.png" alt="mail-icon" />
                    </Link>
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

function mapToStateProps({ pages, common: { width } }) {
  return {
    goToPage: pages.goToPage,
    width,
  };
}

export default connect(mapToStateProps)(BasicFooter);
