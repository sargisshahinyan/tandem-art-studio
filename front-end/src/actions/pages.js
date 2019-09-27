import PagesSvc from '../services/PagesSvc';

export const SET_PAGES_DATA = 'SET_PAGES_DATA';
export const SET_GOTO_PAGE = 'SET_GOTO_PAGE';
export const SET_ACTIVE_PAGE = 'SET_ACTIVE_PAGE';

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

export const loadPagesData = () => (
  async dispatch => {
    const pages = await PagesSvc.getPagesData();
    dispatch(setPagesData(pages));
  }
);
