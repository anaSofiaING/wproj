module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    username: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    latitud: {
      type: Sequelize.FLOAT
    },
    longitud: {
      type: Sequelize.FLOAT
    },
    foto: {
      type: Sequelize.STRING
    },
    facebook: {
      type: Sequelize.STRING
    },
    twitter: {
      type: Sequelize.STRING
    },
    instagram: {
      type: Sequelize.STRING
    },
  });

  return User;
};
