const config = require("../config/db.config.js");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  { 
    host: config.HOST,
    port: config.PORT,
    dialect: config.dialect,
    operatorsAliases: 0,
    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.group = require("../models/group.model.js")(sequelize, Sequelize);
db.user_groups = require("../models/user_groups.model.js")(sequelize, Sequelize);
db.call = require("../models/call.model.js")(sequelize, Sequelize);
db.issue = require("../models/issue.model.js")(sequelize, Sequelize);
db.skill = require("../models/skill.model.js")(sequelize, Sequelize);
db.comment = require("./comment.model.js")(sequelize, Sequelize);

// Users & Roles

db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});

db.user.belongsToMany(db.role, {
    through: "user_roles",
    foreignKey: "userId",
    otherKey: "roleId"
});
  
db.ROLES = ["user", "admin", "moderator"];

// Calls & Users

db.user.belongsToMany(db.call, {
    through: "user_calls",
    foreignKey: "userId",
    otherKey: "callId"
});
  
db.call.belongsToMany(db.user, {
    through: "user_calls",
    foreignKey: "callId",
    otherKey: "userId"
});

// Calls & Groups

db.group.belongsToMany(db.call, {
    through: "group_calls",
    foreignKey: "groupId",
    otherKey: "callId"
});
  
db.call.belongsToMany(db.group, {
    through: "group_calls",
    foreignKey: "callId",
    otherKey: "groupId"
});

// Users & Groups

db.user.belongsToMany(db.group, {
    through: db.user_groups
});

db.group.belongsToMany(db.user, {
    through: db.user_groups
});

// Users & Issues

db.issue.belongsToMany(db.user, {
    through: "user_issues",
    foreignKey: "issueId",
    otherKey: "userId"
});
  
db.user.belongsToMany(db.issue, {
    through: "user_issues",
    foreignKey: "userId",
    otherKey: "issueId"
});

// Groups & Issues

db.issue.belongsToMany(db.group, {
    through: "group_issues",
    foreignKey: "issueId",
    otherKey: "groupId"
});
  
db.group.belongsToMany(db.issue, {
    through: "group_issues",
    foreignKey: "groupId",
    otherKey: "issueId"
});

// Calls & Issues

db.issue.belongsToMany(db.call, {
    through: "call_issues",
    foreignKey: "issueId",
    otherKey: "callId"
});
  
db.call.belongsToMany(db.issue, {
    through: "call_issues",
    foreignKey: "callId",
    otherKey: "issueId"
});

// Users & Skills

db.skill.belongsToMany(db.user, {
    through: "user_skills",
    foreignKey: "skillId",
    otherKey: "userId"
});
  
db.user.belongsToMany(db.skill, {
    through: "user_skills",
    foreignKey: "userId",
    otherKey: "skillId"
});

// Calls & Skills

db.skill.belongsToMany(db.call, {
    through: "call_skills",
    foreignKey: "skillId",
    otherKey: "callId"
});
  
db.call.belongsToMany(db.skill, {
    through: "call_skills",
    foreignKey: "callId",
    otherKey: "skillId"
});

module.exports = db;
  