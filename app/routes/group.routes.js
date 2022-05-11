const { authJwt } = require("../middleware");
const controller = require("../controllers/group.controller");
  
module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
      "/api/groups/:id",
      [authJwt.verifyUserToken],
      controller.createGroup
  );

  app.put(
    "/api/group/:id",
    [authJwt.verifyToken],
    controller.updateGroup
  );

  app.post(
    "/api/groups/enter/:id",
    [authJwt.verifyUserToken],
    controller.enterGroup
  );

  app.post(
    "/api/groups/leave/:id",
    [authJwt.verifyUserToken],
    controller.leaveGroup
  );

  app.delete(
      "/api/groups/:id",
      [authJwt.verifyToken],
      controller.deleteGroup
  );

  app.get(
      "/api/groups",
      controller.getGroups
  );

  app.get(
    "/api/groups/:id",
    controller.getOneGroup
  );

  app.get(
    "/api/groups/users/:id",
    controller.getGroupUsers
  );

  app.get(
    "/api/users/groups/:id",
    controller.getUserGroups
  );
};
