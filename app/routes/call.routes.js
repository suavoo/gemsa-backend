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

  app.get(
      "/api/calls",
      controller.getCalls
  );

  app.get(
    "/api/call/:id",
    controller.getOneCall
  );

  app.get(
    "/api/callsof/:id",
    controller.getCallsOf
  );

  app.post(
      "/api/createcall/:id",
      [authJwt.verifyToken],
      controller.createCall
  );

  app.post(
    "/api/updatecall/:id",
    [authJwt.verifyToken],
    controller.updateCall
  );

  app.post(
    "/api/deletecall/:id",
    [authJwt.verifyToken],
    controller.deleteCall
  );

};
