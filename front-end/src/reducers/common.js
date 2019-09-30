import { SET_WINDOW_WIDTH } from '../actions/common';

const initialState = {
  width: 1920,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_WINDOW_WIDTH:
      return {
        ...state,
        width: payload,
      };
    default:
      return state;
  }
}
