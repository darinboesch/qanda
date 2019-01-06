import request from "request";
import async from "async";
import config from "../../config.dev";

class GoogleApi {
  static customSearch(companies, cb) {
    const errMsg = "Error: Request failed.";
    const asyncTasks = [];
    const { url, cx, key } = config.gcsApi;
    const response = { data: [] };

    return new Promise((resolve, reject) => {
      companies.forEach(name => {
        const query = `${url}?q=${name}&cx=${cx}&key=${key}&num=1`;
        asyncTasks.push(cb => {
          request(query, cb);
        });
      });

      async.parallel(asyncTasks, (err, results) => {
        if (err) {
          if (cb) { cb(err); }
          return reject(err);
        }

        results.forEach(item => {
          const { error, body } = item[0];

          // any errors at all, we fail the lot
          if (error) {
            if (cb) { cb(errMsg); }
            return reject(error);
          }

          const obj = JSON.parse(body);
          response.data.push({
            name: obj.queries.request[0].searchTerms.toLowerCase(),
            domain: obj.items ? obj.items[0].displayLink : '< Not Found >'
          });
        });

        if (cb) { cb(null, response); }
        resolve(response);
      });
    });

  }
}

export default GoogleApi;
