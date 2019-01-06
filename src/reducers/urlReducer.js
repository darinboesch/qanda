import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function urlReducer(state = initialState.urls, action) {
  switch (action.type) {
    // case types.CREATE_URL:
    //   return [
    //     ...state,
    //     Object.assign({}, action.url)
    //   ];

    case types.LOAD_URLS_SUCCESS:
      return action.urls;

    case types.CREATE_URL_SUCCESS:
      return [
        ...state,
        Object.assign({}, action.url)
      ];

    case types.UPDATE_URL_SUCCESS:
      return state.map(url => {
        return url._id === action.url._id ? Object.assign({}, action.url) : url;
      });

    case types.UPDATE_URL_FAIL:
      // todo: something here
      return state;

    case types.DELETE_URL_SUCCESS:
      return [
        ...state.filter(url => url._id !== action.url._id)
      ];

    default:
      return state;
  }
}