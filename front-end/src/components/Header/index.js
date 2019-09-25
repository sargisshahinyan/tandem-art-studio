import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import './styles.scss';

export function Header({ goToPage }) {
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

  return (
    <header>
      <div className="wrapper">
        <div className="header">
          <div className="logo">
            <Link to="/" onClick={() => goToPage(0)}>
              <img src="/images/logo.svg" alt="Logo" />
            </Link>
          </div>
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
                      <Link to="/" onClick={() => goToPage(i + 1)}>
                        {content}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
              <li>
                <Link to="/">
                  Contacts
                </Link>
                <ul>
                  <li>
                    <Link to="/">
                      About us
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}

function mapToStateProps({ pages }) {
  return {
    goToPage: pages.goToPage,
  };
}

export default connect(mapToStateProps)(Header);
