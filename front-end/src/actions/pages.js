import PagesSvc from '../services/PagesSvc';

import { SWIPE_DURATION } from '../data/home';

export const SET_PAGES_DATA = 'SET_PAGES_DATA';
export const SET_GOTO_PAGE = 'SET_GOTO_PAGE';
export const SET_ACTIVE_PAGE = 'SET_ACTIVE_PAGE';
export const TOGGLE_SCROLLING_STATE = 'TOGGLE_SCROLLING_STATE';

let scrollTimer = 0;

export const setPagesData = data => ({
  type: SET_PAGES_DATA,
  payload: data,
});

export const setGoToPage = fn => ({
  type: SET_GOTO_PAGE,
  payload: fn,
});

export const setActivePage = number => ({
  type: SET_ACTIVE_PAGE,
  payload: number,
});

export const toggleScrollingState = () => (
  dispatch => {
    clearTimeout(scrollTimer);
    dispatch({
      type: TOGGLE_SCROLLING_STATE,
      payload: true,
    });

    scrollTimer = setTimeout(() => {
      dispatch({
        type: TOGGLE_SCROLLING_STATE,
        payload: false,
      });
    }, SWIPE_DURATION);
  }
);

export const loadPagesData = () => (
  async dispatch => {
    const pages = await PagesSvc.getPagesData();
    dispatch(setPagesData(pages));
  }
);
