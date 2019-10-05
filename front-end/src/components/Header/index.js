import React, { memo } from 'react';
import { connect } from 'react-redux';
import { Animated } from 'react-animated-css';
import { Link } from 'react-router-dom';

import './styles.scss';

export const Header = memo(
  function Header({ goToPage, scrolling }) {
    const servicesTabs = [
      {
        content: 'About us',
      },
      {
        content: 'Our team',
      },
      {
        content: 'Our services',
      },
      {
        content: 'Our clients',
      },
      {
        content: 'Contact us',
      },
    ];
    const contactTabs = [
      {
        content: 'About us',
      }
    ];
    return (
      <header>
        <div className="wrapper">
          <div className="header">
            <Animated
              animationIn="fadeIn"
              animationInDelay={300}
              animationOut="fadeOut"
              isVisible={!scrolling}
            >
              <div className="logo">
                <Link to="/" onClick={() => goToPage(0)}>
                  <img src="/images/logo.svg" alt="Logo" />
                </Link>
              </div>
            </Animated>
            <Animated
              animationIn="fadeIn"
              animationInDelay={300}
              animationOut="fadeOut"
              isVisible={!scrolling}
            >
              <div className="menu">
                <ul>
                  <li>
                    <Link to="/portfolio">
                      Portfolio
                    </Link>
                  </li>
                  <li>
                    <Link to="/">
                      Services
                    </Link>
                    <ul>
                      {servicesTabs.map(({ content }, i) => (
                        <li key={i}>
                          <Animated animationIn="fadeInRight" animationInDelay={(i + 1) * 100}>
                            <Link to="/" onClick={() => goToPage(i + 1)}>
                              {content}
                            </Link>
                          </Animated>
                        </li>
                      ))}
                    </ul>
                  </li>
                  <li>
                    <Link to="/">
                      Contacts
                    </Link>
                    <ul>
                      {contactTabs.map(({ content }, i) => (
                        <li key={i}>
                          <Animated animationIn="fadeInRight" animationInDelay={(i + 1) * 100}>
                            <Link to="/">
                              About us
                            </Link>
                          </Animated>
                        </li>
                      ))}
                    </ul>
                  </li>
                </ul>
              </div>
            </Animated>
          </div>
        </div>
      </header>
    );
  }
);

function mapToStateProps({ pages }) {
  return {
    goToPage: pages.goToPage,
    scrolling: pages.scrolling,
  };
}

export default connect(mapToStateProps)(Header);
