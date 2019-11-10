import React from 'react';

import { convertText } from '../../../../utils';

import './style.scss';

const Service = ({ icon, title, description }) => (
  <div className="service">
    <div className="serviceHead">
      <div className="serviceIcon">
        <img src={icon} alt=""/>
      </div>
      <div className="serviceName">{title}</div>
    </div>
    <div className="serviceFooter">
      {convertText(description)}
    </div>
  </div>
);

export default Service;
