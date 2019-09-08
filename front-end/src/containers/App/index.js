import React from 'react';
import { Provider } from 'react-redux';

import createStore from '../../store';

import Routes from '../Routes';

export function App(props) {
  return (
    <Provider store={createStore(props)}>
      <Routes {...props} />
    </Provider>
  );
}

export default App;
