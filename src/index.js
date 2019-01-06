/*eslint-disable import/default */
import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import {Provider} from 'react-redux';
import configureStore from './store/configureStore';
import { Router, browserHistory } from 'react-router';
import createRoutes from './config/routes';
import {loadUrls} from './actions/urlActions';
import 'bootstrap/dist/js/bootstrap.min.js';

const store = configureStore();
store.dispatch(loadUrls());

const routes = createRoutes(store, browserHistory);

render(
  <Provider store={store}>
    {routes}
  </Provider>,
  document.getElementById('app')
);
