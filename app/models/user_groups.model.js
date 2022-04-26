const User = require("./user.model");
const Group = require("./group.model");

module.exports = (sequelize, Sequelize) => {
    const UserGroups = sequelize.define("user_groups", {
      userId: {
        type: Sequelize.UUID,
        references: {
            model: User,
            key: 'id'
        }
      },
      groupId: {
        type: Sequelize.UUID,
        references: {
            model: Group,
            key: 'id'
        }
      }
    });
    return UserGroups;
};