module.exports = (sequelize, Sequelize) => {
    const Skill = sequelize.define("skills", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING
      }
    });
    return Skill; 
};