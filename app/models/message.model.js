module.exports = (sequelize, Sequelize) => {
    const Message = sequelize.define("messages", {
      id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true
      },
      userId: {
        type: Sequelize.UUID
      },
      otherId: {
          type: Sequelize.UUID
      },
      text: {
          type: Sequelize.TEXT
      }
    });
    return Message;
};
  