import { combineReducers } from 'redux';

import pages from './pages';
import portfolios from './portfolios';
import common from './common';

export default combineReducers({
  pages,
  portfolios,
  common,
});
