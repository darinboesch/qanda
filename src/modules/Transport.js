import axios from 'axios';
import Auth from './Auth';

class Transport {
  constructor() {

    this.$http = axios.create();
  }
    
  getConfig() {
    return {
      headers: {
        'Authorization': "JWT " + Auth.getToken()
      }
    };
  }

  get(path) {
    return this.$http.get(path, this.getConfig());
  }

  post(path, data = {}) {
    return this.$http.post(path, data, this.getConfig());
  }
  
  patch(path, data = {}) {
    return this.$http.patch(path, data, this.getConfig());
  }

  delete(path) {
    return this.$http.delete(path, this.getConfig());
  }
}

let service = new Transport();
export default service;
