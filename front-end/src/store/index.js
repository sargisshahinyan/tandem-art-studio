import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import rootReducer from '../reducers';

export function configureStore(props) {
  return createStore(
    rootReducer,
    {
      pages: {
        pagesList: props.pages || [],
        scrolling: false,
        goToPage: () => {},
      },
      portfolios: {
        list: props.portfolios || [],
      },
    },
    applyMiddleware(thunkMiddleware),
  );
}

export default configureStore;
