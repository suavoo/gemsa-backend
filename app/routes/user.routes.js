const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");
 
module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/guest", controller.allAccess); 

  app.get(
    "/api/user",
    [authJwt.verifyToken],
    controller.userBoard
  );

  app.get(
    "/api/users/:id",
    [authJwt.verifyUserToken],
    controller.userData
  );

  app.get(
    "/api/users/groups/:id",
    controller.getUserGroups
  );

  app.get(
    "/api/users/calls/:id",
    controller.getUserCalls
  );

  app.get(
    "/api/users/messages/:id",
    [authJwt.verifyUserToken],
    controller.getUserMessages
  );

  app.get(
    "/api/mod",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.moderatorBoard
  );

  app.get(
    "/api/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );
};
