import { SHOW_SUCCESS_VIEW, SET_CURRENT_USER } from '../actions/types';
import isEmpty from '../validation/is-empty';

const initialState = {
  isAuthenticated: false,
  user: {},
  successView: false
}

export default function(state = initialState, action) {
  switch(action.type) {
    case SHOW_SUCCESS_VIEW:
      return {
        ...state,
        successView: true
      }

    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      }

    default:
      return state;
  }
}