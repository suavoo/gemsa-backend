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

  app.get(
      "/api/skills",
      controller.getSkills
  );
 
  app.get(
    "/api/skills/:id",
    controller.getOneSkill
  );

  app.get(
    "/api/skills/of/:id",
    controller.getSkillsOf
  );

  app.post(
      "/api/skills/:id",
      [authJwt.verifyUserToken],
      controller.createSkill
  );

  app.post(
    "/api/skills/add/:id",
    [authJwt.verifyUserToken],
    controller.addSkill
  );

  app.post(
    "/api/skills/remove/:id",
    [authJwt.verifyUserToken],
    controller.removeSkill
  );

};
