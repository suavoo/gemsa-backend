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
      "/api/creategroup/:id",
      [authJwt.verifyUserToken],
      controller.createGroup
  );

  app.post(
    "/api/updategroup/",
    [authJwt.verifyToken],
    controller.updateGroup
  );

  app.post(
    "/api/entergroup/:id",
    [authJwt.verifyUserToken],
    controller.enterGroup
  );

  app.post(
    "/api/leavegroup/:id",
    [authJwt.verifyUserToken],
    controller.leaveGroup
  );

  app.delete(
      "/api/deletegroup/",
      [authJwt.verifyToken],
      controller.deleteGroup
  );

  app.get(
      "/api/groups",
      controller.getGroups
  );

  app.get(
    "/api/group/:id",
    controller.getOneGroup
  );

  app.get(
    "/api/getgroupusers/:id",
    controller.getGroupUsers
  );

  app.get(
    "/api/getusergroups/:id",
    controller.getUserGroups
  );
};
