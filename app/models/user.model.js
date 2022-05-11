module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      username: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      }, 
      location: {
          type: Sequelize.STRING
      },
      bio: {
          type: Sequelize.TEXT
      },
      avatar: {
          type: Sequelize.STRING
      }
    });
    return User;
};
  
