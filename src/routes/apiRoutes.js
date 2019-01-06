const urlsController = require("../controllers/urlsController");

module.exports = function(app) {
  app.get("/api/urls/:id?", urlsController.index);
  app.post("/api/urls", urlsController.create);
  app.patch("/api/urls/:id", urlsController.update);
  app.delete("/api/urls/:id", urlsController.destroy);
};
