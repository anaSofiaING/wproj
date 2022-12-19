
module.exports = (sequelize, Sequelize) => {
    const calificacion = sequelize.define("calificacion", {
      title: {
        type: Sequelize.STRING
      },
      comentario: {
        type: Sequelize.STRING
      },
      username: {
        type: Sequelize.STRING
      },
      puntuacion: {
        type: Sequelize.INTEGER
      }
    });
  
    return calificacion;
  };