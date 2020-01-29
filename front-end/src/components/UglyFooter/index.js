import React from 'react';

import './style.scss';

function UglyFooter() {
  return (
    <div id="uglyFooter">
      <div id="addresses">
        <div id="armenian">
          <div className="address">Armenia Yerevan</div>
          <div className="address">Arshakunyats Avenue, 53A/33</div>
          <div>Tel: +374 10 44 09 62</div>
          <div>Mob: +374 93 93 04 12</div>
        </div>
        <div id="usa">
          <div>USA, California, Denver</div>
          <div>2924 Marion St, Denver, CO 80205</div>
          <div>Tel: +120 160818771</div>
          <div>Mob: +374 93 93 04 12</div>
        </div>
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
