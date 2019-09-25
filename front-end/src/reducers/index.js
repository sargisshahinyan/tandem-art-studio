import { combineReducers } from 'redux';

import pages from './pages';
import portfolios from './portfolios';

export default combineReducers({
  pages,
  portfolios,
});
