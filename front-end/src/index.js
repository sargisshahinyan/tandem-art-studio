import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './containers/App';

const props = '__INITIAL__DATA__' in window && window.__INITIAL__DATA__ instanceof Object ? window.__INITIAL__DATA__ : {};
delete window.__INITIAL__DATA__;

let initialPropElement = document.getElementById('props');
initialPropElement.parentNode.removeChild(initialPropElement);
initialPropElement = null;

ReactDOM.hydrate(
  <Router>
    <App {...props} />
  </Router>,
  document.getElementById('root'),
);
