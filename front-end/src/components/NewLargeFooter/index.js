import React from 'react';
import { Animated } from "react-animated-css";
import { Link } from "react-router-dom";

import './style.scss';

const addresses = {
    armenian: [
        'Armenia Yerevan',
        'Arshakunyats Avenue, 53A/33',
        'Tel: +374 10 44 09 62',
        'Mob: +374 93 93 04 12',
    ],
    usa: [
        'USA, California, Denver',
        '2924 Marion St, Denver, CO 80205',
        'Tel: +120 160818771',
        'Mob: +374 93 93 04 12',
    ],
};

const NewLargeFooter = ({ active, goToPage }) => (
    <div className="newLargeFooterContainer">
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
                        <a href="/">
                            <img src="/images/icons/ic_mail.png" alt="mail-icon" />
                        </a>
                    </li>
                </ul>
            </div>
        </div>
        <div className="newLargeFooter">
            <div className="leftLargeFooter">
                <div className="topLargeFooter">
                    <div className="addressBox armenianAddress">
                        <div className="locationLogo">
                            <img src="/images/icons/location.svg" alt="location"/>
                        </div>
                        <div>{addresses.armenian.map(line => <div>{line}</div>)}</div>
                    </div>
                    <div className="addressBox americanAddress">
                        <div className="locationLogo">
                            <img src="/images/icons/location.svg" alt="location"/>
                        </div>
                        <div>{addresses.usa.map(line => <div>{line}</div>)}</div>
                    </div>
                    <div className="footerLogo">
                        <div>
                            <span className="otherColor">BE THE </span>
                            <span>GAME</span>
                        </div>
                        <div>CHANGER</div>
                    </div>
                    <div className="footerLinks">
                        <div className="link link_mail">
                            <div className="icon icon_mail"/>
                            <div className="text"><a
                                href="mailto:tandemartstudio@gmail.com">tandemartstudio@gmail.com</a></div>
                        </div>
                        <div className="link link_facebook">
                            <div className="icon icon_facebook"/>
                            <div className="text"><a
                                href="https://www.facebook.com/designstudioTandem">www.facebook.com/ @designstudioTandem</a>
                            </div>
                        </div>
                        <div className="link link_instagram">
                            <div className="icon icon_instagram"/>
                            <div className="text"><a
                                href="https://www.instagram.com/tandem_artstudio/">www.instagram.com/ tandem_artstudio</a>
                            </div>
                        </div>
                        <div className="link link_tel_whatsapp_viber">
                            <div className="icon icon_tel"/>
                            <div className="text"><a href="tel:+37493930412">(+374) 93 93 04 12</a></div>
                            <div className="icon icon_whatsapp"/>
                            <div className="icon icon_viber"/>
                        </div>
                    </div>
                </div>
                <div className="bottomLargeFooter">
                    <Animated
                        animationIn="fadeIn"
                        animationInDelay={300}
                        animationOut="fadeOut"
                        isVisible={!active}
                    >
                        <span>© 2019 Tandem Art Studio | All Rights Reserved.</span>
                    </Animated>
                </div>
            </div>
            <div className="rightLargeFooter">
                <div className="logo">
                    <Link to="/" onClick={() => goToPage(0)}>
                        <img src="/images/logo.svg" alt="Logo"/>
                    </Link>
                </div>
            </div>
        </div>
    </div>
);

export default NewLargeFooter;
