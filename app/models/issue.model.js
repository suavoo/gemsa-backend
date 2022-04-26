module.exports = (sequelize, Sequelize) => {
    const Issue = sequelize.define("issues", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING
      }
    });
    return Issue;
};