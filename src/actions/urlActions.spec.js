import expect from 'expect';
import * as urlActions from './urlActions';
import * as types from './actionTypes';

import thunk from 'redux-thunk';
import nock from 'nock';
import configureMockStore from 'redux-mock-store';
import { ObjectID } from 'bson';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

const testUrl = {
  "_id" : new ObjectID("59e0a8c5d329710e75c5734c"),
  "name" : "intuit",
  "domain" : "www.intuit.com",
  "favorited" : false
};

// Test a sync action
describe('Url Actions', () => {
  describe('createUrlSuccess', () => {
    it('should create a CREATE_URL_SUCCESS action', () => {
      //arrange
      const expectedAction = {
        type: types.CREATE_URL_SUCCESS,
        url: testUrl
      };

      //act
      const action = urlActions.createUrlSuccess(testUrl);

      //assert
      expect(action).toEqual(expectedAction);
    });
  });

  // describe('Async Url Load Action', () => {
  //   afterEach(() => {
  //     nock.cleanAll();
  //   });

  //   it('should create BEGIN_AJAX_CALL and LOAD_URLS_SUCCESS when loading urls', (done) => {
  //     // Here's an example call to nock.
  //     // nock('http://example.com/')
  //     //   .get('/urls')
  //     //   .reply(200, { body: { url: [{ ... }});

  //     const expectedActions = [
  //       {type: types.BEGIN_AJAX_CALL},
  //       {type: types.LOAD_URLS_SUCCESS, body: {urls: [testUrl]} }
  //     ];

  //     const store = mockStore({urls: []}, expectedActions, done);
  //     store.dispatch(urlActions.loadUrls()).then(() => {
  //       const actions = store.getActions();
  //       expect(actions[0].type).toEqual(types.BEGIN_AJAX_CALL);
  //       expect(actions[1].type).toEqual(types.LOAD_URLS_SUCCESS);
  //       done();
  //     });
  //   });
  // });
});
