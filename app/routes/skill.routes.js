const { authJwt } = require("../middleware");
const controller = require("../controllers/skill.controller");
 
module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // Request array of all skill objects
  app.get(
      "/api/skills",
      controller.getSkills
  ); 
 
  // Request one specific skill object identified via ID in req.params
  app.get(
    "/api/skills/:id",
    controller.getOneSkill
  );

  // Request array of skill objects of specific user or call, identified via ID in req.params
  app.get(
    "/api/skills/of/:id",
    controller.getSkillsOf
  );

  // Create new skill when logged in and user ID is provided via req.params and valid token via req.headers
  // when Call ID is provided via optional req.body.target, skill will be added to Call, if omitted, it will
  // be added to user
  app.post(
      "/api/skills/:id",
      [authJwt.verifyUserToken],
      controller.createSkill
  );

  // Add existing skill when logged in and user ID is provided via req.params and valid token via req.headers
  // when Call ID is provided via optional req.body.target, skill will be added to Call, if omitted, it will
  // be added to user
  app.post(
    "/api/skills/add/:id",
    [authJwt.verifyUserToken],
    controller.addSkill
  );

  // Remove skill when logged in and user ID is provided via req.params and valid token via req.headers
  // when Call ID is provided via optional req.body.target, skill will be removed from Call, if omitted, it will
  // be removed from user
  app.post(
    "/api/skills/remove/:id",
    [authJwt.verifyUserToken],
    controller.removeSkill
  );

};
