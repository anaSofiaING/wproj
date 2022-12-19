module.exports = app => {
    const publicacion = require("../controllers/publicacion.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", publicacion.create);
  
    // Retrieve all Tutorials
    router.get("/", publicacion.findAll);
  
    // Retrieve all published Tutorials
    router.get("/published", publicacion.findAllPublished);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", publicacion.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", publicacion.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", publicacion.delete);
  
    // Delete all Tutorials
    router.delete("/", publicacion.deleteAll);
  
    app.use('/api/publicacion', router);
  };