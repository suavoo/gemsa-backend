const { authJwt } = require("../middleware");
const controller = require("../controllers/comment.controller");
 
module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next(); 
  });

  // Create comment when logged in, identified by user ID in req.params and valid token is provided
  app.post(
      "/api/comments/:id",
      [authJwt.verifyUserToken], 
      controller.createComment
  );

  // Delete comment when logged in and user has created the comment, identified by user ID in req.params and valid token is provided
  app.delete(
    "/api/comments/:id",
    [authJwt.verifyUserToken],
    controller.deleteComment
  );

};
