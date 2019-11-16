export const SET_WINDOW_SIZES = 'SET_WINDOW_SIZES';

export const setWindowWidth = ({ width, height }) => ({
  type: SET_WINDOW_SIZES,
  payload: { width, height },
});
