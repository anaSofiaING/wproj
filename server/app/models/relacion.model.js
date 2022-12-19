module.exports = (sequelize, Sequelize) => {
    const Relacion = sequelize.define("relacion", {
      userPrinc: {
        type: Sequelize.STRING
      },
      userSec: {
        type: Sequelize.STRING
      }
    });
  
    return Relacion;
  };