import axios from "axios";
// import Auth from "../modules/Auth";
import Transport from "../modules/Transport";

class UrlApi {
  static getAllUrls() {
    return Transport.get("/api/urls");
  }

  static updateUrls(urls, cb) {
    const asyncTasks = [];
    const response = {
      success: false
    };

    return new Promise((resolve, reject) => {
      urls.forEach(u => {
        asyncTasks.push(Transport.patch(`/api/urls/${u._id}`, u));
      });

      return Promise.all(asyncTasks)
        .then(response => {
          response.success = true;
          if (cb) {
            cb(null, response);
          }
          resolve(response);
        })
        .catch(err => {
          if (cb) {
            cb(err);
          }
          return reject(err);
        });
    });
  }

  static deleteUrl(id) {
    return Transport.delete(`/api/urls/${id}`);
  }

  static favoriteUrl(url) {
    const {
      _id,
      favorited
    } = url;
    return Transport.patch(`/api/urls/${_id}`, {
      favorited
    });
  }

  static getUrlsForCompanies(companies) {
    let qs = '';
    for (let i = 0; i < companies.length; i++) {
      let pre = i === 0 ? '?' : '&';
      let encCompany = encodeURIComponent(companies[i]);
      qs += `${pre}companies[]=${encCompany}`;
    }

    return Transport.get("/api/urls" + qs);
  }
}

export default UrlApi;
