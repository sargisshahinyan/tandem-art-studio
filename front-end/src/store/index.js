import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import rootReducer from '../reducers';

import { getPagesInitialData } from '../data/home/initialData';

import { setWindowWidth } from '../actions/common';

let store = null;

if (typeof window === 'object') {
  window.addEventListener('resize', () => {
    store.dispatch(setWindowWidth(window.innerWidth));
  });
}


export function configureStore(props) {
  store = createStore(
    rootReducer,
    {
      pages: getPagesInitialData(props.pages),
      portfolios: {
        list: props.portfolios || [],
      },
    },
    applyMiddleware(thunkMiddleware),
  );

  if (typeof window === 'object') store.dispatch(setWindowWidth(window.innerWidth));

  return store;
}

export default configureStore;
