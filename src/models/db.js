import bluebird from 'bluebird';
const mongoose = require( 'mongoose' ); 

/* eslint-disable no-console */

mongoose.Promise = bluebird;
mongoose.connect("mongodb://localhost/qanda", { useCreateIndex: true, useNewUrlParser: true }); 

mongoose.connection.on('connected', function () {  
  console.log('Mongoose default connection open.');
}); 

mongoose.connection.on('error',function (err) {  
  console.log('Mongoose default connection error: ' + err);
}); 

mongoose.connection.on('disconnected', function () {  
  console.log('Mongoose default connection disconnected'); 
});

process.on('SIGINT', function() {  
  mongoose.connection.close(function () { 
    console.log('Mongoose default connection disconnected through app termination'); 
    process.exit(0); 
  }); 
}); 

// add models here
require('./url');
require('./user');