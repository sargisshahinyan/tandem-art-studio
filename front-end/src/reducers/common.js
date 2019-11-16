import { SET_WINDOW_SIZES } from '../actions/common';

const initialState = {
  width: 1920,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_WINDOW_SIZES:
      return {
        ...state,
        width: payload.width,
        height: payload.height,
      };
    default:
      return state;
  }
}
