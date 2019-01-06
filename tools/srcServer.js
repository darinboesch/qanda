import express from 'express';
import webpack from 'webpack';
import bodyParser from 'body-parser';
import path from 'path';
import config from '../webpack.config.dev';
import opn from 'opn';
import passport from 'passport';

/* eslint-disable no-console */

const port = process.env.PORT || 3000;
const app = express();
const compiler = webpack(config);
require('../src/models/db');

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(passport.initialize());
const localSignupStrategy = require('../src/passport/local-signup');
const localLoginStrategy = require('../src/passport/local-login');
passport.use('local-signup', localSignupStrategy);
passport.use('local-login', localLoginStrategy);

const authCheckMiddleware = require('../src/middleware/auth-check');
app.use('/api', authCheckMiddleware);

require("../src/routes/auth")(app);
require("../src/routes/apiRoutes")(app);
require("../src/routes/htmlRoutes")(app);

app.listen(port, function(err) {
  if (err) {
    console.log(err);
  } else {
    opn(`http://localhost:${port}`);
  }
});
