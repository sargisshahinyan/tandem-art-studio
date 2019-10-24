import React from 'react';

import './style.scss'

const Service = ({ icon, name, description }) => (
  <div className="service">
    <div className="serviceHead">
      <div className="serviceIcon">
        <img src={icon} alt=""/>
      </div>
      <div className="serviceName">{name}</div>
    </div>
    <div className="serviceFooter">
      <ul className="serviceDescription">
        {description.map((desc, i) => <li key={i}>{desc}</li>)}
      </ul>
    </div>
  </div>
);

export default Service;
