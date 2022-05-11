const { authJwt } = require("../middleware");
const controller = require("../controllers/issue.controller");
 
module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get(
      "/api/issues",
      controller.getIssues
  );

  app.get(
    "/api/issues/:id",
    controller.getOneIssue
  );

  app.get(
    "/api/issues/of/:id",
    controller.getIssuesOf
  );

  app.post(
      "/api/issues/create/:id",
      [authJwt.verifyToken],
      controller.createIssue
  );

  app.post(
    "/api/issues/add/:id",
    [authJwt.verifyToken],
    controller.addIssue
  );

  app.post(
    "/api/issues/remove/:id",
    [authJwt.verifyToken],
    controller.removeIssue
  );

};
