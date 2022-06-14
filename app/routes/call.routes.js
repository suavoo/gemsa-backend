const { authJwt } = require("../middleware");
const controller = require("../controllers/call.controller");
 
module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept" 
    );
    next(); 
  });

  // Request an array of all call objects
  app.get(
      "/api/calls",
      controller.getCalls 
  );

  // Request one specific call object identified via ID in req.params
  app.get(
    "/api/calls/:id",
    controller.getOneCall
  );

  // Create call when user is logged in, identified via User ID in req.params and with valid token provided via req.headers
  app.post(
      "/api/calls/:id",
      [authJwt.verifyUserToken],
      controller.createCall
  );

  // Update call when user is logged in and created the call, identified via User ID in req.params and 
  // with valid token provided via req.headers
  app.put(
    "/api/calls/:id",
    [authJwt.verifyUserToken],
    controller.updateCall
  );

  // Delete call when user is logged in and created the call, identified via User ID in req.params and 
  // with valid token provided via req.headers
  app.delete(
    "/api/calls/:id",
    [authJwt.verifyUserToken],
    controller.deleteCall
  );

  // Request array of message objects posted to specific call identified via ID in req.params
  app.get(
    "/api/calls/messages/:id",
    controller.getCallMessages
  );

};
