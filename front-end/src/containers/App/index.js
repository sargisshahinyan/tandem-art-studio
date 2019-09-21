import React from 'react';
import { Provider } from 'react-redux';

import createStore from '../../store';

import Routes from '../Routes';

import './styles.scss';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export function App(props) {
  return (
    <Provider store={createStore(props)}>
      <Routes />
    </Provider>
  );
}

export default App;
