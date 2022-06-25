module.exports = (sequelize, Sequelize) => {
    const Comment = sequelize.define("comments", {
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
    return Comment;
};
  