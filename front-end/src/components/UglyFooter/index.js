import React from 'react';

import './style.scss';

function UglyFooter() {
  return (
    <div id="uglyFooter">
      <div id="addresses">
        <div className="addressLogo">
          <img src="/images/icons/location.svg" alt=""/>
        </div>
        <div>
          <div className="address">Armenia Yerevan</div>
          <div className="address">Arshakunyats Avenue, 53A/33</div>
        </div>
      </div>
      <div id="phones">
        <div className="phone"><img src="/images/icons/old-typical-phone.svg" alt="" /><span>Tel: +374 10 44 09 62</span></div>
        <div className="phone"><img src="/images/icons/telephone-symbol-button.svg" alt="" /><span>Mob: +374 93 93 04 12</span></div>
      </div>
      <div id="gameChanger">
        <div id="game"><span>BE THE</span> GAME</div>
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
    </div>
  )
}

export default UglyFooter;
