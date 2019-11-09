import React from 'react';

const TeamWorker = ({ name, position, avatar }) => (
  <div className="teamWorker">
    <img src={avatar} alt="" />
    <div className="workerName">{name}</div>
    <div className="workerPosition">{position}</div>
  </div>
);

export default TeamWorker;
