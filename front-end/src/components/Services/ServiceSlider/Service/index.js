import React from 'react';

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
      <ul className="serviceDescription">
        {description.split('\n').map((desc, i) => <li key={i}>{desc}</li>)}
      </ul>
    </div>
  </div>
);

export default Service;
