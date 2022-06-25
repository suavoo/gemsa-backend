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

  // A logged in user, identified via ID in req.params and providing his/her valid JSON Web Token via req.headers
  // can create a new group
  app.post(
      "/api/groups/:id",
      [authJwt.verifyUserToken],
      controller.createGroup
  );

  // A logged in user, identified via ID in req.params and providing his/her valid JSON Web Token via req.headers
  // can create update his/her own group
  app.put(
    "/api/groups/:id",
    [authJwt.verifyUserToken],
    controller.updateGroup
  );

  // A logged in user, identified via ID in req.params and providing his/her valid JSON Web Token via req.headers
  // can enter a group
  app.post(
    "/api/groups/enter/:id",
    [authJwt.verifyUserToken],
    controller.enterGroup
  );

  // A logged in user, identified via ID in req.params and providing his/her valid JSON Web Token via req.headers
  // can leave a group
  app.post(
    "/api/groups/leave/:id",
    [authJwt.verifyUserToken],
    controller.leaveGroup
  );

  // Requests an array of all group objects
  app.get(
      "/api/groups",
      controller.getGroups
  );

  // Requests specific group object identified by ID in req.params
  app.get(
    "/api/groups/:id",
    controller.getOneGroup
  );

  // Requests an array of user objects of all members of a group identified by ID in req.params
  app.get(
    "/api/groups/users/:id",
    controller.getGroupUsers
  );

  // Requests an array of call objects associated with a group identified by ID in req.params
  app.get(
    "/api/groups/calls/:id",
    controller.getGroupCalls
  );

  // Requests an array of comment objects posted in a group identified by ID in req.params
  app.get(
    "/api/groups/comments/:id",
    controller.getGroupComments
  );
};
