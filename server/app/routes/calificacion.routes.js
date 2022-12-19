module.exports = app => {
    const calificacion = require("../controllers/calificacion.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", calificacion.create);
  
    // Retrieve all Tutorials
    router.get("/", calificacion.findAll);
  
    // Retrieve all published Tutorials
    router.get("/published", calificacion.findAllPublished);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", calificacion.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", calificacion.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", calificacion.delete);
  
    // Delete all Tutorials
    router.delete("/", calificacion.deleteAll);
  
    app.use('/api/calificacion', router);
  };