import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import rootReducer from '../reducers';

export function configureStore(props) {
  return createStore(
    rootReducer,
    {
      pages: props.pages || {},
    },
    applyMiddleware(thunkMiddleware),
  );
}

export default configureStore;