import { SET_PAGES_DATA, SET_GOTO_PAGE } from '../actions/pages';

const initialState = {
  pagesList: [],
  scrolling: false,
  goToPage: () => {},
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_PAGES_DATA:
      return {
        ...state,
        pagesList: payload,
      };
    case SET_GOTO_PAGE:
      return {
        ...state,
        goToPage: payload,
      };
    default:
      return state;
  }
}
