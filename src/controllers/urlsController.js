const mongoose = require("mongoose");
const Url = mongoose.model("Url");
import async from "async";

function companyWorker(companies, urls) {
  return new Promise((resolve, reject) => {
    urls.forEach(url => {
      // remove company so it's not called for the gcs api        
      for (let i=companies.length-1; i>=0; i--) {
        if (companies[i].toLowerCase() === url.name.toLowerCase()) {
          companies.splice(i, 1);
        }
      } 
    });

    // add the companies to mongo that were not returned
    const asyncTasks = [];
    companies.forEach(c => {
      const newItem = new Url({
        name: c.toLowerCase()
      });

      asyncTasks.push(cb => {
        newItem.save(cb);
      });
    });

    async.parallel(asyncTasks, (err, results) => {
      results.forEach(item => {
        urls.push(item[0]);
      });
      resolve(urls);
    });
  });
}

module.exports = {
  index: function(req, res) {
    if (req.query) {
      const pCompanies = req.query['companies'];

      if (pCompanies) {
        let companies = [];
        if (typeof pCompanies === 'string') {
          if (pCompanies.indexOf(',') > 0) {
            companies = pCompanies.split(',');
          }
          else {
            companies = [ pCompanies ];
          }
        }
        else if (Array.isArray(pCompanies)) {
          companies = pCompanies;
        }

        // add to mongo if not found
        Url.find({ name: { $in: companies.map(o => o.toLowerCase()) }})
          .then(function(doc) {
            return companyWorker(companies, doc)
              .then(urls => {
                res.json(urls);
              });
          }).catch(function(err) {
            res.json(err);
          });
      }
      else {
        const query = req.query['id'] ? { _id: req.query['id'] } : {};

        Url.find(query)
          .then(function(doc) {
            res.json(doc);
          }).catch(function(err) {
            res.json(err);
          });
      }
    }
  },

  create: function(req, res) {
    Url.create(req.body).then(function(doc) {
      res.json(doc);
    }).catch(function(err) {
      res.json(err);
    });
  },

  update: function(req, res) {
    Url.update({
      _id: req.params.id
    },
      req.body
    ).then(function(doc) {
      res.json(doc);
    }).catch(function(err) {
      res.json(err);
    });
  },

  destroy: function(req, res) {
    Url.remove({
      _id: req.params.id
    }).then(function(doc) {
      res.json(doc);
    }).catch(function(err) {
      res.json(err);
    });
  }
};
