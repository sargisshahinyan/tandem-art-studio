import React from 'react';
import { Link } from 'react-router-dom';

import './style.scss';

const HiddenFooter = () => (
  <div id="hiddenFooter">
    <div><Link to="/portfolio">Portfolio</Link></div>
    <div><Link to="/">Services</Link></div>
    <div><Link to="/contact">Contacts</Link></div>
  </div>
);

export default HiddenFooter;
