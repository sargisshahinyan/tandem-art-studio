import { SET_PAGES_INITIAL_DATA } from '../actions/pages';

export default (state = {}, { type, payload }) => {
  switch (type) {
    case SET_PAGES_INITIAL_DATA:
      return payload;
    default:
      return state;
  }
}
