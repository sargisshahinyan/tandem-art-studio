import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import rootReducer from '../reducers';

const store = createStore(
  rootReducer,
  undefined,
  applyMiddleware(thunkMiddleware),
);

export  function configureStore() {
  return store;
}

export default configureStore;
