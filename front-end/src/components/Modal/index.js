import React from 'react';

import './style.scss';

const Modal = ({ text = '', opened = false, setOpened, pageNumber }) => {
  return (
    <div
      className={`modal ${opened ? 'opened' : ''}`}
      style={{top: `calc(${(pageNumber - 1) * 100 + 50}vh - 100px)`}}
    >
      <div className="answerText">{text}</div>
      <div
        className="close"
        onClick={() => setOpened(false)}
      >
        Close
      </div>
    </div>
  );
};

export default Modal;
