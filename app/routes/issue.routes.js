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
 
  // Request array of all issue objects
  app.get(
      "/api/issues",
      controller.getIssues
  );

  // Request specific issue object identified via ID in req.params
  app.get(
    "/api/issues/:id",
    controller.getOneIssue
  );

  // Request array of issue objects of specific user, group or call, identified via ID in req.params
  app.get(
    "/api/issues/of/:id",
    controller.getIssuesOf
  );

  // Create new issue when logged in and user ID is provided via req.params and valid token via req.headers
  // when Call or Group ID is provided via optional req.body.target, issue will be added to Call or Group respectively, 
  // if omitted, it will be added to user
  app.post(
      "/api/issues/:id",
      [authJwt.verifyUserToken],
      controller.createIssue
  );

  // Add existing issue when logged in and user ID is provided via req.params and valid token via req.headers
  // when Call or Group ID is provided via optional req.body.target, issue will be added to Call or Group respectively, 
  // if omitted, it will be added to user
  app.post(
    "/api/issues/add/:id",
    [authJwt.verifyUserToken],
    controller.addIssue
  );

  // Remove issue when logged in and user ID is provided via req.params and valid token via req.headers
  // when Call or Group ID is provided via optional req.body.target, issue will be removed from Call or Group respectively, 
  // if omitted, it will be removed from user
  app.post(
    "/api/issues/remove/:id",
    [authJwt.verifyUserToken],
    controller.removeIssue
  );

};
