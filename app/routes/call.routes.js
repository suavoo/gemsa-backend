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
    "/api/calls/:id",
    controller.getOneCall
  );

  app.get(
    "/api/calls/of/:id",
    controller.getCallsOf
  );

  app.post(
      "/api/calls/:id",
      [authJwt.verifyToken],
      controller.createCall
  );

  app.put(
    "/api/calls/:id",
    [authJwt.verifyToken],
    controller.updateCall
  );

  app.delete(
    "/api/calls/:id",
    [authJwt.verifyToken],
    controller.deleteCall
  );

};
