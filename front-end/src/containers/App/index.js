import React from 'react';
import { Provider } from 'react-redux';

import createStore from '../../store';

import Routes from '../Routes';

import './styles.scss';

export function App(props) {
  return (
    <Provider store={createStore(props)}>
      <Routes />
    </Provider>
  );
}

export default App;
