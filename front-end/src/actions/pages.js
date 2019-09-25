export const SET_PAGES_DATA = 'SET_PAGES_DATA';
export const SET_GOTO_PAGE = 'SET_GOTO_PAGE';

export const setPagesData = (payload) => ({
  type: SET_PAGES_DATA,
  payload,
});

export const setGoToPage = (payload) => ({
  type: SET_GOTO_PAGE,
  payload,
});
