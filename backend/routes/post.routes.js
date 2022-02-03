const auth = require('../middleware/auth');                 //middleware de verification du token user

module.exports = router => {
    const post = require("../controllers/post.controller.js");
  
    var router = require("express").Router();
  
    router.post("/",auth, post.create);
    router.get("/",auth, post.findAll);
    router.get("/:id",auth, post.findOne);

  };