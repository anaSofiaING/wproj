const db = require("../models");//aki nu5evp
const User = db.user;
const Op = db.Sequelize.Op;

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
    const id = req.params.id;
  
    User.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "usuario was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update usuario with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating usuario with id=" + id
        });
      });
};

exports.adminBoard = (req, res) => {
  // res.status(200).send("Admin Content.");
  User.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    });
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Doctor Content.");
};
