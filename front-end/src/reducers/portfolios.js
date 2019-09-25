import { SET_PORTFOLIO_LIST } from '../actions/portfolios';

const initialState = {
  list: [],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_PORTFOLIO_LIST:
      return {
        ...state,
        list: payload,
      };
    default:
      return state;
  }
}

