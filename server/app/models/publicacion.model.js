module.exports = (sequelize, Sequelize) => {
    const Publicacion = sequelize.define("publicacion", {
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      imagen: {
        type: Sequelize.STRING
      },
      autor: {
        type: Sequelize.STRING
      },
      interacciones:{
        type: Sequelize.INTEGER
      },
      published: {
        type: Sequelize.BOOLEAN
      }
    });
  
    return Publicacion;
  };