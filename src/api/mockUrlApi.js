import { ObjectID } from 'bson';
import delay from './delay';

// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.
const urls = [
  {
      "_id" : new ObjectID("59cada660e9799d24619bba0"),
      "name" : "boeing",
      "domain" : "www.boeing.com",
      "favorited" : true
  },
  {
      "_id" : new ObjectID("59e0a8c5d329710e75c5734c"),
      "name" : "intuit",
      "domain" : "www.intuit.com",
      "favorited" : false
  },
  {
      "_id" : new ObjectID("59e0f0726df8572b31726be0"),
      "name" : "ford",
      "domain" : "www.ford.com",
      "favorited" : false
  },
  {
      "_id" : new ObjectID("59e2c07f089587db6523d78d"),
      "name" : "Tiffany ",
      "domain" : "www.tiffany.com",
      "favorited" : true
  }
];

//This would be performed on the server in a real app. Just stubbing in.
const generateId = () => {
  return new ObjectID();
};

class UrlApi {
  static getAllUrls() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(Object.assign([], urls));
      }, delay);
    });
  }

  static saveUrl(url) {
    url = Object.assign({}, url); // to avoid manipulating object passed in.
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (url._id) {
          const existingUrlIndex = urls.findIndex(a => a._id == url._id);
          urls.splice(existingUrlIndex, 1, url);
        } else {
          //Just simulating creation here.
          //The server would generate ids for new urls in a real app.
          //Cloning so copy returned is passed by value rather than by reference.
          url._id = generateId();
          urls.push(url);
        }

        resolve(url);
      }, delay);
    });
  }

  static deleteUrl(urlId) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const indexOfUrlToDelete = urls.findIndex(url => {
          url._id == urlId;
        });
        urls.splice(indexOfUrlToDelete, 1);
        resolve();
      }, delay);
    });
  }
}

export default UrlApi;
