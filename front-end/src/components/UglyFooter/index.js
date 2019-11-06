import React from 'react';

import './style.scss';

function UglyFooter() {
  return (
    <footer>
      <div id="addresses">
        <div className="address">Armenia Yerevan</div>
        <div className="address">Arshakunyats Avenue, 53A/33</div>
      </div>
      <div id="phones">
        <div className="phone">Tel: +374 10 44 09 62</div>
        <div className="phone">Mob: +374 93 93 04 12</div>
      </div>
      <div id="gameChanger">
        <div id="game">BE THE GAME</div>
        <div id="changer">CHANGER</div>
      </div>
      <ul id="social">
        <li>
          <a
            href="https://www.behance.net/haykarturi5dcd"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/images/icons/ic_be.png" alt="be-icon"/>
          </a>
        </li>
        <li>
          <a
            href="https://www.facebook.com/designstudioTandem/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/images/icons/ic_fb.png" alt="fb-icon"/>
          </a>
        </li>
        <li>
          <a
            href="https://www.instagram.com/tandem_artstudio"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/images/icons/ic_in.png" alt="in-icon"/>
          </a>
        </li>
        <li>
          <a href="/">
            <img src="/images/icons/ic_mail.png" alt="mail-icon"/>
          </a>
        </li>
      </ul>
    </footer>
  )
}

export default UglyFooter;
