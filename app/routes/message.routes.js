const { authJwt } = require("../middleware");
const controller = require("../controllers/message.controller");
 
module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get(
    "/api/messages/of/:id",
    controller.getMessagesFrom
  );

  app.post(
      "/api/messages/create/:id",
      [authJwt.verifyUserToken],
      controller.createMessage
  );

  app.delete(
    "/api/messages/:id",
    [authJwt.verifyUserToken],
    controller.deleteMessage
  );

};
