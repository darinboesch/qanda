import { browserHistory } from "react-router";
import UserApi from '../api/userApi';
import * as types from './actionTypes';
import {ajaxCallError} from './ajaxStatusActions';
import Auth from "../modules/Auth";

function beginLogin(data) {
  return { type: types.LOGIN_USER, data };
}

function loginSuccess(data) {
  return { type: types.LOGIN_SUCCESS_USER, data };
}

function loginBadCreds(data) {
  return { type: types.LOGIN_BAD_CREDS_USER, data };
}

function loginError() {
  return { type: types.LOGIN_ERROR_USER };
}

export function deauthUser() {
  return function() {
    Auth.deauthenticateUser();
    browserHistory.push('/login');  // reloads the navbar (unauthenticated)
  };
}

export function login(data, successPath) {
  return function(dispatch) {
    dispatch(beginLogin());
    return UserApi.loginUser(data).then(res => {
      if (res.data.success) {
        Auth.authenticateUser(res.data.token);
        dispatch(loginSuccess(data));
        // use browserHistory singleton to control navigation. Will generate a 
        // state change for time-traveling as we are using the react-router-redux package
        browserHistory.push(successPath);
      }
      else {
        dispatch(loginError());
        let loginMessage = res.data.message;
        return loginMessage;
      }
    }).catch(error => {
      if (error.response.status === 401) {
        dispatch(loginBadCreds(data));
      }
      else {
        dispatch(loginError());
      }

      throw(error);
    });
  };
}

export function register(data, successPath) {
  return function(dispatch) {
    dispatch(beginLogin());
    return UserApi.registerUser(data).then(res => {
      if (res.data.success) {
        Auth.authenticateUser(res.data.token);
        dispatch(loginSuccess(data));
        // use browserHistory singleton to control navigation. Will generate a 
        // state change for time-traveling as we are using the react-router-redux package
        browserHistory.push(successPath);
      }
      else {
        dispatch(loginError());
        let loginMessage = res.data.message;
        return loginMessage;
      }
    }).catch(error => {
      if (error.response.status === 401) {
        dispatch(loginBadCreds(data));
      }
      else {
        dispatch(loginError());
      }

      throw(error);
    });
  };
}