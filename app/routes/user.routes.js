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

  // Request information about specific user identified via id in req.params
  app.get(
    "/api/users/:id",
    controller.userData
  );

  // Request array of groups a specific user belongs to identified via id in req.params
  app.get(
    "/api/users/groups/:id",
    controller.getUserGroups
  );

  // Request array of calls a specific user has emitted identified via id in req.params
  app.get(
    "/api/users/calls/:id",
    controller.getUserCalls
  );

  // Request array of messages of a specific user identified via id in req.params. This information 
  // can only be requested by the user himself while logged in so the correct and valid JSON web token is 
  // required in req.headers
  app.get(
    "/api/users/messages/:id",
    [authJwt.verifyUserToken],
    controller.getUserMessages
  );

  // Request content reserved for logged in moderators, valid JSON web token is required in req.headers
  app.get(
    "/api/users/mod",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.moderatorBoard
  );

  // Request content reserved for logged in admins, valid JSON web token is required in req.headers
  app.get(
    "/api/users/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );
};
