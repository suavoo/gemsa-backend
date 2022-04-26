module.exports = (sequelize, Sequelize) => {
    const Group = sequelize.define("groups", {
      id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true
      },
      title: {
        type: Sequelize.STRING
      },
      location: {
          type: Sequelize.STRING
      },
      description: {
          type: Sequelize.TEXT
      },
      image: {
          type: Sequelize.STRING
      }
    });
    return Group;
};
  