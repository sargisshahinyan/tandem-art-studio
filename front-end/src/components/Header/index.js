import React from 'react';

import './styles.scss';


export function Header() {
  return (
    <header>
      <div className="wrapper">
        <div className="header">
          <div className="logo">
            <a href="">
              <img src="/images/logo.svg" alt="Logo" />
            </a>
          </div>
          <div className="menu">
            <ul>
              <li>
                <a href="">
                  Portfolio
                </a>
              </li>
              <li>
                <a href="">
                  Services
                </a>
                <ul>
                  <li>
                    <a href="">
                      About us
                    </a>
                  </li>
                  <li>
                    <a href="">
                      Our team
                    </a>
                  </li>
                  <li>
                    <a href="">
                      Our services
                    </a>
                  </li>
                  <li>
                    <a href="">
                      Our clients
                    </a>
                  </li>
                  <li>
                    <a href="">
                      Contact us
                    </a>
                  </li>
                </ul>
              </li>
              <li>
                <a href="">
                  Contacts
                </a>
                <ul>
                  <li>
                    <a href="">
                      About us
                    </a>
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

export default Header;
