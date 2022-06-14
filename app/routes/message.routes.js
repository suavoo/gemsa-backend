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

  // Create message when logged in, identified by user ID in req.params and valid token is provided
  app.post(
      "/api/messages/:id",
      [authJwt.verifyUserToken], 
      controller.createMessage
  );

  // Delete message when logged in and user has created the message, identified by user ID in req.params and valid token is provided
  app.delete(
    "/api/messages/:id",
    [authJwt.verifyUserToken],
    controller.deleteMessage
  );

};
