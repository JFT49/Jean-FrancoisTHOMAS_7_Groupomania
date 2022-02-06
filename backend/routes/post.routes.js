// const auth = require('../middleware/auth');                 //middleware de verification du token user

const post = require("../controllers/post.controller.js");

var router = require("express").Router();

router.post("/", post.create);
router.get("/", post.findAll);
router.get("/:id", post.findOne);

module.exports = router;