import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import rootReducer from '../reducers';

import { getPagesInitialData } from '../data/home/initialData';
import { getPortfoliosInitialData } from '../data/portfolio/initialData';

import { setWindowWidth } from '../actions/common';

let store = null;

if (typeof window === 'object') {
  window.addEventListener('resize', () => {
    store.dispatch(setWindowWidth({
      width: window.innerWidth,
      height: window.innerHeight,
    }));
  });
}


export function configureStore(props) {
  store = createStore(
    rootReducer,
    {
      pages: getPagesInitialData(props.pages),
      portfolios: getPortfoliosInitialData(
        props.portfolios,
        props.selectedPortfolio,
      ),
    },
    applyMiddleware(thunkMiddleware),
  );

  if (typeof window === 'object') {
    store.dispatch(setWindowWidth({
      width: window.innerWidth,
      height: window.innerHeight,
    }));
  }

  return store;
}

export default configureStore;
