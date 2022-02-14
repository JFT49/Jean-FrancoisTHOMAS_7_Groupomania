const auth = require('../middleware/auth');                 //middleware de verification du token user
const multer = require('../middleware/multer-config');

const post = require("../controllers/post.controller.js");

var router = require("express").Router();

router.post("/", auth, multer, post.create);
router.get("/", auth, post.findAll);
router.get("/:postid", auth, post.findOne);
//router.delete("/delete", auth, post.delete);

module.exports = router;