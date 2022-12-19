module.exports = app => {
    const Relacion = require("../controllers/relacion.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Relacion
    router.post("/", Relacion.create);
  
    // Retrieve all Relacions
    router.get("/", Relacion.findAll);
  
    // Retrieve all published Relacions
    router.get("/published", Relacion.findAllPublished);
  
    // Retrieve a single Relacion with id
    router.get("/:id", Relacion.findOne);
  
    // Update a Relacion with id
    router.put("/:id", Relacion.update);
  
    // Delete a Relacion with id
    router.delete("/:id", Relacion.delete);
  
    // Delete all Relacions
    router.delete("/", Relacion.deleteAll);
  
    app.use('/api/relacion', router);
  };