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
    "/api/issue/:id",
    controller.getOneIssue
  );

  app.get(
    "/api/issuesof/:id",
    controller.getIssuesOf
  );

  app.post(
      "/api/createissue/:id",
      [authJwt.verifyToken],
      controller.createIssue
  );

  app.post(
    "/api/addissue/:id",
    [authJwt.verifyToken],
    controller.addIssue
  );

  app.post(
    "/api/removeissue/:id",
    [authJwt.verifyToken],
    controller.removeIssue
  );

};
