import { getPagesInitialData } from '../data/home/initialData';

import {
  SET_PAGES_DATA,
  SET_GOTO_PAGE,
  SET_ACTIVE_PAGE,
  TOGGLE_SCROLLING_STATE,
} from '../actions/pages';

const initialState = getPagesInitialData();

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
    case SET_ACTIVE_PAGE:
      return {
        ...state,
        activePage: payload,
      };
    case TOGGLE_SCROLLING_STATE:
      return {
        ...state,
        scrolling: payload,
      };
    default:
      return state;
  }
}
