import { SET_PORTFOLIO_LIST, SET_PORTFOLIO } from '../actions/portfolios';

import { getPortfoliosInitialData } from '../data/portfolio/initialData';

const initialState = getPortfoliosInitialData();

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_PORTFOLIO_LIST:
      return {
        ...state,
        list: payload,
      };
    case SET_PORTFOLIO:
      return {
        ...state,
        selected: payload,
      };
    default:
      return state;
  }
}

