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
    "/api/skill/:id",
    controller.getOneSkill
  );

  app.get(
    "/api/skillsof/:id",
    controller.getSkillsOf
  );

  app.post(
      "/api/createskill/:id",
      [authJwt.verifyToken],
      controller.createSkill
  );

  app.post(
    "/api/addskill/:id",
    [authJwt.verifyToken],
    controller.addSkill
  );

  app.post(
    "/api/removeskill/:id",
    [authJwt.verifyToken],
    controller.removeSkill
  );

};
