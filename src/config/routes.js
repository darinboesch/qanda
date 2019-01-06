import React from "react";
import {
  Route,
  IndexRoute,
  Router
} from "react-router";
import Auth from "../modules/Auth";
import UserApi from "../api/userApi";

import Index from "../components/Index";
import Main from "../components/Main";
import Favorites from "../components/Favorites";
import All from "../components/All";
import Home from "../components/Home";
import Login from "../components/common/LoginForm";
import Logout from "../components/Logout";
import Register from "../components/common/RegisterForm";

export default (store, history) => {
  function requireAuth(nextState, replace, callback) {
    const { user: { authenticated } } = store.getState();

    if (!authenticated) {
      // before we route them to the login screen, check the localStore
      // for a token
      const token = Auth.getToken();
      if (!token) {
        // Takes a Location object
        // https://github.com/mjackson/history/blob/master/docs/Location.md
        replace({
          pathname: "/login",
          state: { nextPathname: nextState.location.pathname }
        });
      }
    }

    callback();
  }

  let routes = (
    <Router history={history}>
      <Route path="/" component={Main}>
        <Route path="home" component={Home} onEnter={requireAuth} />
        <Route path="all" component={All} onEnter={requireAuth} />
        <Route path="favorites" component={Favorites} onEnter={requireAuth} />
        <Route path="login" component={Login} />
        <Route path="logout" component={Logout} />
        <Route path="register" component={Register} />
        <IndexRoute component={Index} />
      </Route>
    </Router>
  );

  if (module.hot) {
    let oldRoutes = module.hot.data && module.hot.data.routes;
    if (oldRoutes) {
      routes = oldRoutes;
    }
    module.hot.dispose(function(data){
      data.routes = routes;
    });
  }

  return routes;
};
