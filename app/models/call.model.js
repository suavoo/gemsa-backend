module.exports = (sequelize, Sequelize) => {
    const Call = sequelize.define("calls", {
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
      time: {
          type: Sequelize.DATE
      },
      contactinfo: {
          type: Sequelize.STRING
      },
      description: {
          type: Sequelize.TEXT
      },
      group: {
        type: Sequelize.UUID
      },
      image: {
          type: Sequelize.STRING
      }
    });
    return Call;
};
  