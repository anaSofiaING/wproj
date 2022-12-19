const db = require("../models");
const calificacion = db.calificacion;
const Op = db.Sequelize.Op;

// Create and Save a new Tutorial
exports.create = (req, res) => {
    // Validate request
    if (!req.body.title) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    // Create a Tutorial
    const calif = {
      title: req.body.title,
      comentario: req.body.comentario,
      username: req.body.username,
      puntuacion: req.body.puntuacion
    };
  
    // Save Tutorial in the database
    calificacion.create(calif)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the calificacion."
        });
      });
  };

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
    calificacion.findAll()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving calificaciones."
        });
      });
  };

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    calificacion.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find calificacion with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving calificacion with id=" + id
        });
      });
  };

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
  
    calificacion.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "calificacion was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update calificacion with id=${id}. Maybe calificacion was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating calificacion with id=" + id
        });
      });
  };
// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    calificacion.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "calificacion was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete calificacion with id=${id}. Maybe calificacion was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete calif with id=" + id
        });
      });
  };

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
    calificacion.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} calif were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all calif."
        });
      });
  };
// Find all published Tutorials
exports.findAllPublished = (req, res) => {
    calificacion.findAll({ where: { published: true } })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
      });
  };