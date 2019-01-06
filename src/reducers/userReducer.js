import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function userReducer(state = initialState.user, action) {
  switch (action.type) {
    case types.LOGIN_USER:
      return Object.assign({}, state, { isWaiting: true });

    case types.LOGIN_SUCCESS_USER:
      return Object.assign({}, state, { isWaiting: false, authenticated: true, email: action.data.email });
    
    case types.LOGIN_BAD_CREDS_USER:
      return Object.assign({}, state, { isWaiting: false, authenticated: false, email: action.data.email, loginMessage: "Bad credentials." });

    case types.LOGIN_ERROR_USER:
      return Object.assign({}, state, { isWaiting: false, authenticated: false });

    default:
      return state;
  }
}