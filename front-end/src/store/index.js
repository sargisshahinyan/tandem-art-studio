import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import rootReducer from '../reducers';
import {getPagesInitialData} from '../data/home/initialData';

export function configureStore(props) {
  return createStore(
    rootReducer,
    {
      pages: getPagesInitialData(props.pages),
      portfolios: {
        list: props.portfolios || [],
      },
    },
    applyMiddleware(thunkMiddleware),
  );
}

export default configureStore;
